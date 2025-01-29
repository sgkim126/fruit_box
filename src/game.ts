import {draw_menu} from "./menu";
import "../styles/game.css";

export function draw_game(main: HTMLDivElement, bottom: HTMLDivElement) {
    const game = document.createElement("div");
    game.id = "game";

    const left = document.createElement("div");
    const right = document.createElement("div");
    right.id = "hud";
    const score = document.createElement("div");
    score.id = "score"
    const timer = document.createElement("div");
    score.innerText = "0";
    timer.id = "timer"
    const bar = document.createElement("div");
    const inner_bar = document.createElement("div");
    inner_bar.addEventListener("animationend", () => {
        alert(`game end: ${score.innerText}`);
    });
    bar.appendChild(inner_bar);
    timer.appendChild(bar);
    right.append(score, timer);

    const box = document.createElement("div");
    box.id = "box";
    game.append(left, box, right);

    const apples: HTMLDivElement[] = [];
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div");
        for (let j = 0 ; j < 17; j += 1) {
            const apple = document.createElement("div");
            apple.className = "apple";
            const value = Math.ceil(Math.random() * 9); // 1 ~ 9;
            apple.innerText = `${value}`;
            row.appendChild(apple);
            apples.push(apple);
        }
        box.appendChild(row);
    }
    const selection_box = document.createElement("div");
    selection_box.id = "selection_box";
    game.appendChild(selection_box);
    let start_point: {x: number; y: number} | null = null;
    game.addEventListener("mousedown", e => {
        e.preventDefault();
        selection_box.style.display = "";
        start_point = {
            x: e.clientX,
            y: e.clientY,
        }
    });
    game.addEventListener("mousemove", e => {
        e.preventDefault();
        if (!start_point) {
            selection_box.style.display = "none";
            return;
        }
        selection_box.style.display = "";
        const width = Math.abs(e.clientX - start_point.x);
        const height = Math.abs(e.clientY - start_point.y);
        selection_box.style.width = `${width}px`;
        selection_box.style.height = `${height}px`;

        const left = e.clientX < start_point.x ? e.clientX : start_point.x;
        const top = e.clientY < start_point.y ? e.clientY : start_point.y;
        selection_box.style.left = `${left}px`;
        selection_box.style.top = `${top}px`;

        apples.forEach(apple => {
            if (isSelectedApple(apple, {left, top, right: left + width, bottom: top + height})) {
                apple.classList.add("selected");
            } else {
                apple.classList.remove("selected");
            }
        });
    });
    game.addEventListener("mouseup", e => {
        e.preventDefault();
        try {
            const selected_apples = apples.filter(apple => apple.classList.contains("selected"));

            const selected_value = selected_apples.reduce((acc, apple) => {
                return acc + (parseInt(apple.innerText, 10) || 0)
            }, 0);
            if (selected_value !== 10) {
                apples.forEach(apple => {
                    apple.classList.remove("selected");
                });
                return;
            }
            score.innerText = `${parseInt(score.innerText, 10) + selected_apples.length}`;

            selected_apples.forEach(apple => {
                apple.innerHTML = "&nbsp;";
                apple.classList.remove("selected");
                apple.classList.add("removed");
            });
        } finally {
            start_point = null;
            selection_box.style.display = "none";
        }
    });

    main.innerHTML = "";
    main.append(game);

    const reset = document.createElement("button");
    reset.innerText = "reset";
    reset.addEventListener("click", e => {
        e.preventDefault();
        draw_menu(main, bottom);
    })
    bottom.innerHTML = "";
    bottom.appendChild(reset);
}

function isSelectedApple(apple: HTMLDivElement, selected: {left: number; right: number; top: number; bottom: number}): boolean {
    const rect = apple.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2;
    if (!(selected.left <= x && x <= selected.right)) {
        return false;
    }
    const y = (rect.top + rect.bottom) / 2;
    return selected.top <= y && y <= selected.bottom;
}

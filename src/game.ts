import {draw_menu} from "./menu";
import "../styles/game.css";
import "../styles/modal.css";

export type GameOptions = {
    intersectionThreshold?: number;
};
export function draw_game(main: HTMLDivElement, controller: HTMLDivElement, option: GameOptions) {
    let is_game_running = true;
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
    bar.appendChild(inner_bar);
    timer.appendChild(bar);
    right.append(score, timer);

    const box = document.createElement("div");
    box.id = "box";
    game.append(left, box, right);

    const modal = document.createElement("div");
    modal.id = "modal";
    const final_score = document.createElement("div");
    modal.appendChild(final_score);

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
    selection_box.id = "selection-box";

    inner_bar.addEventListener("animationend", () => {
        is_game_running = false;
        selection_box.style.display = "none";
        apples.forEach(apple => {
            apple.classList.remove("selected");
        });
        modal.classList.add("active");
        final_score.innerText = score.innerText;
    });

    game.append(selection_box, modal);
    let start_point: {x: number; y: number} | null = null;
    game.addEventListener("mousedown", e => {
        e.preventDefault();
        if (!is_game_running) {
            return;
        }
        start_point = {
            x: e.clientX,
            y: e.clientY,
        }
    });
    game.addEventListener("mousemove", e => {
        e.preventDefault();
        if (!is_game_running || !start_point) {
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
            if (isSelectedApple(apple, {left, top, right: left + width, bottom: top + height}, option.intersectionThreshold)) {
                apple.classList.add("selected");
            } else {
                apple.classList.remove("selected");
            }
        });
    });

    const bite_effect = document.querySelector("#bite-effect") as HTMLAudioElement;
    game.addEventListener("mouseup", e => {
        e.preventDefault();
        try {
            if (!is_game_running) {
                return;
            }
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
            bite_effect.play();
        } finally {
            start_point = null;
            selection_box.style.display = "none";
        }
    });

    main.innerHTML = "";
    main.append(game);

    draw_bottom(main, controller);
}

function isSelectedApple(apple: HTMLDivElement, selected: {left: number; right: number; top: number; bottom: number}, threshold: number | undefined): boolean {
    const appleRect = apple.getBoundingClientRect();
    return isCenterIncluded(appleRect, selected) || (!!threshold && isIntersectionAboveThreshold(appleRect, selected, threshold));
}

function isCenterIncluded(rect: DOMRect, selected: {left: number; right: number; top: number; bottom: number}): boolean {
    const x = (rect.left + rect.right) / 2;
    if (!(selected.left <= x && x <= selected.right)) {
        return false;
    }
    const y = (rect.top + rect.bottom) / 2;
    return selected.top <= y && y <= selected.bottom;
}

function isIntersectionAboveThreshold(rect: DOMRect, selected: {left: number; right: number; top: number; bottom: number}, threshold: number): boolean {
    const intersectionArea = getIntersectionArea(rect, selected);
    const appleArea = (rect.right - rect.left) * (rect.bottom - rect.top);
    return (intersectionArea / appleArea) > threshold;
}

function getIntersectionArea(rect1: {top: number; bottom: number; left: number; right: number}, rect2: {top: number; bottom: number; left: number; right: number}) {
    const top = Math.max(rect1.top, rect2.top);
    const bottom = Math.min(rect1.bottom, rect2.bottom);
    const left = Math.max(rect1.left, rect2.left);
    const right = Math.min(rect1.right, rect2.right);
    const width = right - left;
    const height = bottom - top;
    if (width <= 0 || height <= 0) {
        return 0;
    }
    return width * height;
}

function draw_bottom(main: HTMLDivElement, bottom: HTMLDivElement) {
    const reset = document.createElement("button");
    reset.innerText = "reset";
    reset.addEventListener("click", e => {
        e.preventDefault();
        draw_menu(main, bottom);
    })

    bottom.innerHTML = "";
    bottom.appendChild(reset);
}

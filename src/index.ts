function draw_menu(main: HTMLDivElement) {
    const menu = document.createElement("div");
    menu.id = "menu";

    const start = document.createElement("button");
    start.innerText = "Start";
    start.addEventListener("click", e => {
        e.preventDefault();
        draw_game(main);
    });

    menu.appendChild(start);

    main.innerHTML = "";
    main.appendChild(menu);
}

function draw_game(main: HTMLDivElement) {
    const game = document.createElement("div");
    game.id = "game";

    const box = document.createElement("div");
    box.id = "box";
    game.appendChild(box);

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
            // TODO: select apples
            apples.forEach(apple => {
                apple.classList.remove("selected");
            });
        } finally {
            start_point = null;
            selection_box.style.display = "none";
        }
    });

    main.innerHTML = "";
    main.append(game);
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

window.addEventListener("load", () => {
    const main = document.querySelector("#main")! as HTMLDivElement;
    draw_menu(main);
});

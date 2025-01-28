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
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div");
        for (let j = 0 ; j < 17; j += 1) {
            const apple = document.createElement("div");
            apple.className = "apple";
            const value = Math.ceil(Math.random() * 9); // 1 ~ 9;
            apple.innerText = `${value}`;
            row.appendChild(apple);
        }
        game.appendChild(row);
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
        selection_box.style.width = `${Math.abs(e.clientX - start_point.x)}px`;
        selection_box.style.height = `${Math.abs(e.clientY - start_point.y)}px`;
        if (e.clientX < start_point.x) {
            selection_box.style.left = `${e.clientX}px`;
        } else {
            selection_box.style.left = `${start_point.x}px`;
        }
        if (e.clientY < start_point.y) {
            selection_box.style.top = `${e.clientY}px`;
        } else {
            selection_box.style.top = `${start_point.y}px`;
        }
        // TODO: highlight selected apples
    });
    game.addEventListener("mouseup", e => {
        e.preventDefault();
        try {
            // TODO: reset apple highlights
            // TODO: select apples
        } finally {
            start_point = null;
            selection_box.style.display = "none";
        }
    });

    main.innerHTML = "";
    main.append(game);
}

window.addEventListener("load", () => {
    const main = document.querySelector("#main")! as HTMLDivElement;
    draw_menu(main);
});

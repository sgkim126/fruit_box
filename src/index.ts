function draw_menu(game: HTMLDivElement) {
    const menu = document.createElement("div");
    menu.id = "menu";

    const start = document.createElement("button");
    start.innerText = "Start";
    start.addEventListener("click", e => {
        e.preventDefault();
        draw_box(game);
    });

    menu.appendChild(start);

    game.innerHTML = "";
    game.appendChild(menu);
}

function draw_box(game: HTMLDivElement) {
    const box = document.createElement("div");
    box.id = "box";
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0 ; j < 17; j += 1) {
            const apple = document.createElement("div");
            apple.className = "apple";
            const value = Math.ceil(Math.random() * 9); // 1 ~ 9;
            apple.innerText = `${value}`;
            row.appendChild(apple);
        }
        box.appendChild(row);
    }
    game.innerHTML = "";
    game.appendChild(box);
}

window.addEventListener("load", () => {
    const game = document.querySelector("#game")! as HTMLDivElement;
    draw_menu(game);
});

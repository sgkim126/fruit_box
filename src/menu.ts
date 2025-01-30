import {draw_game} from "./game";
import "../styles/menu.css";

export function draw_menu(main: HTMLDivElement, controller: HTMLDivElement) {
    const menu = document.createElement("div");
    menu.id = "menu";

    const start = document.createElement("button");
    start.innerText = "Start";
    start.addEventListener("click", e => {
        e.preventDefault();
        draw_game(main, controller);
    });

    menu.appendChild(start);

    main.innerHTML = "";
    main.appendChild(menu);

    controller.innerHTML = "";
}

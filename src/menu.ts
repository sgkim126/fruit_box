import {draw_game} from "./game";
import "../styles/menu.css";

export function draw_menu(main: HTMLDivElement, controller: HTMLDivElement) {
    const menu = document.createElement("div");
    menu.id = "menu";

    const start1 = document.createElement("button");
    start1.innerText = "Start";
    start1.addEventListener("click", e => {
        e.preventDefault();
        const muted = document.querySelector("#volume-button") as HTMLInputElement;
        if (!muted.checked) {
            const bgm = document.querySelector("#bgm") as HTMLAudioElement;
            bgm.play();
        }
        draw_game(main, controller, {});
    });

    const start2 = document.createElement("button");
    start2.innerText = "Start (flexible selection)";
    start2.addEventListener("click", e => {
        e.preventDefault();
        const muted = document.querySelector("#volume-button") as HTMLInputElement;
        if (!muted.checked) {
            const bgm = document.querySelector("#bgm") as HTMLAudioElement;
            bgm.play();
        }
        draw_game(main, controller, {
            intersectionThreshold: 0.1
        });
    });

    menu.append(start1, start2);

    main.innerHTML = "";
    main.appendChild(menu);

    controller.innerHTML = "";
}

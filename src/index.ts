import {draw_menu} from "./menu";
import "../styles/layout.css";

window.addEventListener("load", () => {
    const main = document.querySelector("#main")! as HTMLDivElement;
    const controller = document.querySelector("#controller")! as HTMLDivElement;
    draw_menu(main, controller);
});

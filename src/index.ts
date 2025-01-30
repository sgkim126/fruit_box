import {draw_menu} from "./menu";
import "../styles/layout.css";
import {set_volume_control} from "./volume";

window.addEventListener("load", () => {
    const main = document.querySelector("#main")! as HTMLDivElement;
    const controller = document.querySelector("#controller")! as HTMLDivElement;
    draw_menu(main, controller);

    const sounds = Array.from(document.querySelectorAll("audio"));
    const volume_button = document.querySelector("#volume-button")! as HTMLInputElement;
    const volume_slider = document.querySelector("#volume-slider")! as HTMLInputElement;
    set_volume_control(sounds, volume_button, volume_slider);
});

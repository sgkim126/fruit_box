import {draw_menu} from "./menu";
import "../styles/layout.css";

window.addEventListener("load", () => {
    const main = document.querySelector("#main")! as HTMLDivElement;
    const controller = document.querySelector("#controller")! as HTMLDivElement;
    draw_menu(main, controller);

    const bite_effect = document.querySelector("#bite-effect")! as HTMLAudioElement;
    const mute = document.querySelector("#mute")! as HTMLInputElement;
    mute.addEventListener("change", e => {
        const target = e.target as HTMLInputElement;
        bite_effect.muted = target.checked;
    });
});

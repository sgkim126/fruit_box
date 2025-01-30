export function set_volume_control(bite_effect: HTMLAudioElement, volume_button: HTMLInputElement, volume_slider: HTMLInputElement) {
    let previous_volume = volume_button.checked ? 0 : parseInt(volume_slider.value, 10);
    volume_button.addEventListener("change", e => {
        const target = e.target as HTMLInputElement;
        const volume = target.checked ? 0 : previous_volume;
        on_volume_update(volume, bite_effect, volume_button, volume_slider);
    });
    volume_slider.addEventListener("change", e => {
        const volume = parseInt((e.target as HTMLInputElement).value, 10);
        previous_volume = volume;
        on_volume_update(volume, bite_effect, volume_button, volume_slider);
    });
}

function on_volume_update(volume: number, bite_effect: HTMLAudioElement, volume_button: HTMLInputElement, volume_slider: HTMLInputElement) {
    bite_effect.volume = volume / 100;
    volume_slider.value = `${volume}`;
    if (volume === 0) {
        bite_effect.muted = true;
        volume_button.checked = true;
    } else {
        bite_effect.muted = false;
        volume_button.checked = false;
    }
}

function draw_box() {
    const box = document.querySelector("#box")!;
    for (let i = 0; i < 10; i += 1) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0 ; j < 17; j += 1) {
            const apple = document.createElement("div");
            apple.className = "apple";
            row.appendChild(apple);
        }
        box.appendChild(row);
    }
}

window.addEventListener("load", () => {
    draw_box();
});

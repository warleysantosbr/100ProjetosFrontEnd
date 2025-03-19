let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeigth = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

/* ✅ Criar grade corretamente */
gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;

    for (let i = 0; i < gridHeigth.value; i++) {
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 1;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            /* ✅ Agora só pinta se o mouse estiver pressionado */
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                col.style.backgroundColor = erase ? "transparent" : colorButton.value;
            });

            col.addEventListener(events[deviceType].move, (e) => {
                if (!draw) return; // ✅ Evita pintar sem clicar

                let x = deviceType === "mouse" ? e.clientX : e.touches[0].clientX;
                let y = deviceType === "mouse" ? e.clientY : e.touches[0].clientY;

                let elementId = document.elementFromPoint(x, y);
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

/* ✅ Corrigida a lógica para evitar pintura aleatória */
function checker(element) {
    if (!element || !element.classList.contains("gridCol")) return;

    if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
    } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
    }
}

/* Limpar grade */
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

/* Mudar para modo apagar */
eraseBtn.addEventListener("click", () => {
    erase = true;
});

/* Mudar para modo pintar */
paintBtn.addEventListener("click", () => {
    erase = false;
});

/* Atualizar valores dos sliders */
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeigth.addEventListener("input", () => {
    heightValue.innerHTML = gridHeigth.value < 9 ? `0${gridHeigth.value}` : gridHeigth.value;
});

window.onload = () => {
    gridHeigth.value = 1;
    gridWidth.value = 1;
};

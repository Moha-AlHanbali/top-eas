"use strict";

const boardContainer = document.getElementsByClassName("board-container")[0];
let gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container")
boardContainer.appendChild(gridContainer)

const watchGridContainer = () => {
    gridContainer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('grid-square')) {
            e.target.style.backgroundColor = currentColor;
        }
    });

    gridContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('grid-square') && e.buttons === 1) {
            e.target.style.backgroundColor = currentColor;
        }
    });
}

const generateDefaultGrid = () => {
    for (let i = 0; i < 16 * 16; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square", `square-${i}`);
        gridContainer.appendChild(gridSquare);
    }
}

generateDefaultGrid();
watchGridContainer();

const regenerateGridContainer = () => {
    gridContainer.remove()
    gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    boardContainer.appendChild(gridContainer);
}

const gridResizeForm = document.getElementsByClassName("grid-size-form")[0];
gridResizeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let gridSquares = e.target.gridSquares.value;
    if (!gridSquares) {
        alert("Please enter grid dimensions");
        return;
    }
    e.target.gridSquares.value = null;

    regenerateGridContainer();
    watchGridContainer();

    for (let i = 0; i < gridSquares * gridSquares; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square", `square-${i}`);
        gridSquare.style.flex = `1 1 ${100 / gridSquares}%`;
        gridSquare.addEventListener('click', (e) => {
            e.target.style.backgroundColor = currentColor;
        })
        gridContainer.appendChild(gridSquare);
    }
})

let currentColor = "#000000"

const colorPicker = document.getElementsByClassName("color-picker")[0];
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
})

const colorPickerContainer = document.getElementsByClassName("color-picker-container")[0];
const colorSlotsContainer = document.createElement("div");
colorSlotsContainer.classList.add("color-slots-container");
colorPickerContainer.appendChild(colorSlotsContainer);

for (let i = 0; i < 8; i++) {
    const colorSlotSquare = document.createElement('div');
    const colorSlotClear = document.createElement('div');

    colorSlotSquare.classList.add("color-slot", `slot-${i}`);
    colorSlotClear.classList.add("color-slot-clear", `slot-clear-${i}`);

    colorSlotsContainer.appendChild(colorSlotSquare);
    colorSlotSquare.appendChild(colorSlotClear);

    colorSlotSquare.addEventListener('click', (e) => {
        if (!e.target.style.backgroundColor || e.target.style.backgroundColor === "rgb(255, 255, 255)") {
            e.target.style.backgroundColor = currentColor;
        } else {
            currentColor = e.target.style.backgroundColor;
            const inputString = currentColor;
            const rgbValues = extractRGBFromString(inputString);
            colorPicker.value = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
        }
    })

    colorSlotClear.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentSlot = document.getElementsByClassName(`slot-${i}`)[0]
        parentSlot.style.backgroundColor = "#ffffff";
        currentColor = "#ffffff";
        colorPicker.value = "#ffffff";
    })

}


function extractRGBFromString(inputString) {
    const rgbRegex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    const match = inputString.match(rgbRegex);

    if (match) {
        const [_, r, g, b] = match;
        return [parseInt(r), parseInt(g), parseInt(b)];
    } else {
        return null;
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const resetButton = document.getElementsByClassName("reset-button")[0];
resetButton.addEventListener('click', (e) => {
    regenerateGridContainer();
    generateDefaultGrid();
    watchGridContainer();
});
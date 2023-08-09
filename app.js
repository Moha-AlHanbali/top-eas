"use strict";

const boardContainer = document.getElementsByClassName("board-container")[0];

let gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container")
boardContainer.appendChild(gridContainer)


for (let i = 0; i < 16 * 16; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add("grid-square", `square-${i}`);
    gridSquare.addEventListener('click', (e) => {
        console.log(e.target)
        e.target.style.backgroundColor = currentColor;
    })
    gridContainer.appendChild(gridSquare);
}

const gridResizeForm = document.getElementsByClassName("grid-size-form")[0];
gridResizeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const gridX = e.target.gridX.value;
    const gridY = e.target.gridY.value;

    if (!gridX || !gridY) {
        alert("Please enter both grid dimensions");
        return;
    }

    gridContainer.remove()
    gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    boardContainer.appendChild(gridContainer);

    for (let i = 0; i < gridX * gridY; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add("grid-square", `square-${i}`);
        gridSquare.style.flex = `1 1 ${100 / gridX}%`;
        gridSquare.addEventListener('click', (e) => {
            console.log(e.target)
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
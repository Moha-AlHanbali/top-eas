"use strict";

const gridContainer = document.getElementsByClassName("grid-container")[0];

const gridArray = [];

for (let i = 0; i < 16 * 16; i++){
    const gridSquare = document.createElement('div');
    gridSquare.classList.add("grid-square", `square-${i}`);
    gridArray.push(gridSquare);
    gridContainer.appendChild(gridSquare);
}
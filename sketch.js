'use strict';

let hiddenBoard; 
let board;       
const LENGTH = 20;
const MASK_COLOR = '#ffffff';
const seeds = ['#000000', '#c4bfbf', '#ffb8e5', '#c0ffb8', "#ff61c5", "#008539", "#fffb80"];
const pixelArt = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,5,5,0,5,5,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,5,3,3,5,3,3,3,5,5,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,5,3,3,3,3,3,3,3,3,5,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,5,3,3,3,7,7,3,3,3,5,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,0,0,1,1,2,0,0,0,0,0,1,5,3,3,7,7,7,7,3,5,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,1,2,0,2,0,0,0,0,0,5,3,3,3,7,7,7,7,3,3,5,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,5,3,3,3,3,7,7,3,3,3,5,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,5,3,3,3,3,3,3,3,3,3,5,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,5,5,5,3,3,3,3,5,5,0,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,6,4,5,3,3,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,6,4,2,5,5,0,0,0,0,0,0,0,0,0],
  [1,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,3,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,0,0,0,0,1,3,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,6,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,6,4,6,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,6,4,6,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
  

];
let revealedCount = 0;
let totalCells = 0;
let finished = false;

function setup() {
  createCanvas(pixelArt[0].length * LENGTH, pixelArt.length * LENGTH);
  hiddenBoard = createQuadrille(pixelArt[0].length, pixelArt.length);
  board = createQuadrille(pixelArt[0].length, pixelArt.length);

  // Llenamos el tablero oculto con los colores reales
  for (let row = 0; row < pixelArt.length; row++) {
    for (let col = 0; col < pixelArt[row].length; col++) {
      const idx = pixelArt[row][col];
      if (idx > 0) {
        hiddenBoard.fill(row, col, color(seeds[(idx - 1) % seeds.length]));
        board.fill(row, col, color(MASK_COLOR)); // tapamos esa celda
        totalCells++;
      }
    }
  }
}

function draw() {
  background('#fff5f5');
  drawQuadrille(board, { cellLength: LENGTH, outline: '#ffcce2', outlineWeight: 2 });
  hover();

  if (finished) {
    push();
    fill(0, 150);
    rect(0, 0, width, height);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Haberte conocido fue la mejor coincidencia . Te amo siempre, Cris ฅ^•ﻌ•^ฅ.', width / 2, height / 2);
    pop();
  }
}

function hover() {
  if (finished) return;
  const row = board.mouseRow;
  const col = board.mouseCol;
  if (board.isValid(row, col)) {
    push();
    noFill();
    stroke('#d1495b');
    strokeWeight(3);
    square(col * LENGTH, row * LENGTH, LENGTH);
    pop();
  }
}

function mousePressed() {
  if (finished) return;
  const row = board.mouseRow;
  const col = board.mouseCol;

  // Solo revela si esa celda pertenece al dibujo y aún está tapada
  if (hiddenBoard.isFilled(row, col) && board.read(row, col) !== undefined) {
    const stillMasked = board.isColor(row, col); // sigue siendo el MASK_COLOR
    const secretColor = hiddenBoard.read(row, col);
    board.fill(row, col, secretColor);
    revealedCount++;
    if (revealedCount >= totalCells) {
      finished = true;
    }
  }
}
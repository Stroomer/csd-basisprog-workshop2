let pixels = [];
let pixelSize = 10;
let pixelColors = ['grey', 'yellow', 'black', 'lightgrey'];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  render(happy);
}

function render(array) {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[0].length; x++) {
      fill(pixelColors[array[y][x]]);
      rect(20 + x * pixelSize, 50 + y * pixelSize, pixelSize, pixelSize);
    }
  }
}

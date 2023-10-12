let pixels = [];
let pixelSize = 10;
let pixelColors = ['grey', 'yellow', 'black', 'lightgrey'];

let paused = false;
let pauseTime;
let endTime;
const timerDuration = 20 * 60 * 1000;

const buttons = [];

function setup() {
  createCanvas(800, 600);

  endTime = new Date();
  endTime.setTime(endTime.getTime() + timerDuration);

  const startX = 300;
  const startY = 100;

  buttons[0] = createButton('+5 sec');
  buttons[0].position(startX, startY);
  buttons[0].style('background-color', 'cyan');
  buttons[0].mousePressed(() => {
    console.log('Add 5 seconds!');
    endTime.setTime(endTime.getTime() + 5000);
  });

  buttons[1] = createButton('+10 sec');
  buttons[1].position(startX, startY + 30);
  buttons[1].style('background-color', 'cyan');
  buttons[1].mousePressed(() => {
    console.log('Add 10 seconds!');
    endTime.setTime(endTime.getTime() + 10000);
  });

  buttons[2] = createButton('pause');
  buttons[2].position(startX, startY + 60);
  buttons[2].style('background-color', 'cyan');
  buttons[2].mousePressed(() => {
    if (paused) {
      console.log('Timer is paused already!');
      return;
    }
    console.log('Pause timer!');
    pauseTime = new Date();
    paused = true;
  });

  buttons[3] = createButton('start');
  buttons[3].position(startX, startY + 90);
  buttons[3].style('background-color', 'cyan');
  buttons[3].mousePressed(() => {
    if (!paused) {
      console.log("Cannot start timer that wasn't paused...");
      return;
    }
    const pausedTime = new Date().getTime() - pauseTime.getTime();
    console.log(`Start timer, it was paused for ${pausedTime} milliseconds...`);
    endTime.setTime(endTime.getTime() + pausedTime);
    paused = false;
  });
}

function draw() {
  background(220);

  const currentTime = new Date();

  if (currentTime >= endTime) {
    console.log('Timer ended!');
    render(dead);
  } else {
    let remainingTime, minutes, seconds;
    if (paused) {
      remainingTime = endTime - pauseTime;
    } else {
      remainingTime = endTime - currentTime;
    }
    minutes = Math.floor(remainingTime / (60 * 1000));
    seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    textSize(24);
    text(`Time remaining: ${nf(minutes, 2)}:${nf(seconds, 2)}`, 10, 30);

    render(happy);
  }
}

function render(array) {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[0].length; x++) {
      fill(pixelColors[array[y][x]]);
      rect(20 + x * pixelSize, 50 + y * pixelSize, pixelSize, pixelSize);
    }
  }
}

let spacing, numLines = 9;
let complete = false;
let seconds = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  spacing = height / (numLines + 1);
  shuffle(Brand.names);
  for (var i = 0; i < Brand.names.length; i++) {
    new Brand(-i * (width / 6) + width/2, height / 2, Brand.names[i]);
  }
}

function draw() {
  background('#C45422');

  stroke(255);
  for (let i = 0; i < numLines; i++) {
    strokeWeight(i % 2 == 0 ? 1 : .5);
    if (i === floor(numLines / 2)) strokeWeight(3);
    line(0, spacing * (i + 1), width, spacing * (i + 1));
  }

  Brand.drawAll();

  textSize(48);
  fill(255);
  text(max(0, seconds - floor(millis() / 1000)), width - 60, spacing / 2);
}

function finished() {
  complete = true;
  let data = [];
  Brand.instances.forEach(b => {
    data.push({item: b.item, rating: b.rating});
  });
  let predicts = predict(data);
  //user.assignTraits(predicts);
  console.log(predicts);
}

function keyReleased() {
  if (key == ' ') finished();
}

function mouseReleased() {
  if (Brand.active) {

    let lineIdx = floor(map(mouseY, 1, height - 1, 0, numLines));
    lineIdx = constrain(lineIdx, 0, numLines - 1); // ints from 0 to 8

    // ratings go from .8 to -.8
    Brand.active.rating = map(lineIdx, 0, numLines - 1, 8, -8) / 10;
    Brand.active.y = (lineIdx + 1) / (numLines + 1) * height;
    Brand.active = false;
  }
}

function mousePressed() {
  Brand.active = false;
  Brand.instances.forEach(b => {
    if (b.contains(mouseX, mouseY)) {
      Brand.active = b;
    }
  });
}

function mouseDragged() {
  if (Brand.active) {
    Brand.active.y += mouseY - pmouseY;
  }
}

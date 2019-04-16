let spacing, numLines = 5,
  seconds = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  spacing = height / (numLines + 1);
  shuffle(Brand.names);
  for (var i = 0; i < Brand.names.length; i++) {
    new Brand(-i * (width / 6) + 100, height / 2, Brand.names[i]);
  }
}

function draw() {
  background('#C45422');

  stroke(255);
  for (let i = 0; i < numLines; i++) {
    strokeWeight(i === floor(numLines / 2) ? 3 : 1);
    line(0, spacing * (i + 1), width, spacing * (i + 1));
  }

  Brand.drawAll();

  textSize(48);
  fill(255);
  text(max(0, seconds - floor(millis() / 1000)), width - 60, spacing/2);
}

function mouseReleased() {
  if (!Brand.active) return;
  let pos = constrain(floor((mouseY / height) * numLines), 0, numLines - 1);
  Brand.active.y = (pos + 1) / (numLines + 1) * height;
  Brand.active.rating = -(pos - floor(numLines / 2));
  Brand.active = false;
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
  if (!Brand.active) return;
  Brand.active.y += mouseY - pmouseY;
}

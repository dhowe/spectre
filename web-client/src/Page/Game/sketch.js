/*
A quick/dirty mockup of what the 'Personality Test' might look like, primarily
for testing the scoring algorithms. This will need to be recoded in React/DOM
and then styled appropriately.
 */

let done, user, spacing;
let numLines = 9;
let seconds = 25;

function setup() {

  createCanvas(windowWidth, windowHeight);
  shuffle(Brand.names);

  spacing = height / (numLines + 1);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < Brand.names.length; i++) {
    new Brand(-i * (width / 6) + width / 2, height / 2, Brand.names[i]);
  }
  user = window.user;
}

function draw() {
  background('#C45422');

  stroke(255);
  for (let i = 0; i < numLines; i++) {
    strokeWeight(i % 2 == 0 ? 1 : .5);
    if (i === floor(numLines / 2)) strokeWeight(3);
    line(0, spacing * (i + 1), width, spacing * (i + 1));
  }

  !done && Brand.updateAll();
  Brand.drawAll();

  let timer = seconds - floor(millis() / 1000);
  if (timer < 0 && !done) {
    finished();
  }

  textSize(48);
  fill(255);
  text(max(0, timer), width - 60, spacing / 2);
  textSize(18);
  text('drag items then hit spacebar to compute scores', width/2, height-40);
}

function finished() {
  done = true;
  checkData();
  let data = Brand.instances.map(b => ({ item: b.item, rating: b.rating }));
  user.predictFromBrands(data).forEach(p => user.traits[p.trait] = p.score);
  displayAsHtml(user);
}

function displayAsHtml(user) {
  let otr = '<tr><td>';
  let ctd = '</td><td>';
  let ctr = '</td></tr>'

  let rows = user.oceanTraits().length;
  let desc = '</td><td rowspan=' + rows +
    ' id="desc">' + user.generateDescription();
  let html = user.oceanTraits().reduce((acc, t, i) => {
    return acc + otr + t + ctd + user.traits[t] + (i ? '' : desc) + ctr;
  }, '');

  document.getElementById("content").style.display = 'inline-block';
  document.getElementById("tdata").innerHTML = html;
}

function keyReleased() {
  if (key == ' ') finished();
}

function randomizeData() {
  Brand.instances.forEach(b => {
    let idx = floor(random(0, numLines));
    b.rating = map(idx, 0, numLines - 1, -8, 8) / 10;
    b.y = (idx + 1) / (numLines + 1) * height;
  });
}

function checkData() {
  let nodata = true;
  Brand.instances.forEach(b => {
    if (b.rating !== 0) nodata = false;
  });
  if (nodata) randomizeData();
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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let done, user, spacing, numLines = 9;
let seconds = 20;

function setup() {

  createCanvas(windowWidth, windowHeight);
  spacing = height / (numLines + 1);
  textAlign(CENTER, CENTER);
  shuffle(Brand.names);

  for (var i = 0; i < Brand.names.length; i++) {
    new Brand(-i * (width / 6) + width / 2, height / 2, Brand.names[i]);
  }

  user = User.Create({ name: "Jane", gender: "female" });
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
}

function finished() {
  done = true;
  checkData();
  let data = Brand.instances.map(b => ({ item: b.item, rating: b.rating }));
  predict(data).forEach(p => user.traits[p.trait] = p.score);
  displayAsHtml(user);
}

function displayAsHtml(user) {
  let otr = '<tr><td>';
  let ctd = '</td><td>';
  let ctr = '</td></tr>'

  let rows = user.traitNames().length;
  let desc = '</td><td rowspan=' + rows +
    ' width=50%>' + user.generateDescription();
  let html = user.traitNames().reduce((acc, t, i) => {
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
    var idx = floor(random(0, numLines));
    b.rating = map(idx, 0, numLines - 1, -8, 8) / 10;
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

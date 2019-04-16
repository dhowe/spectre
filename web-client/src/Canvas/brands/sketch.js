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

/**
 * Perform scoring for a completed brand personality test
 * @param  {Object} data An object mapping brand-names to user ratings (-.8 to .8)
 * @param {string} data.name The name of the brand, e.g. 'adidas'
 * @param {number} data.rating The user rating of the brand, from -.8 to .8
 * @returns  {Object} An object describing personality predictions (see below)
 */
function doScoring(data) {
  console.log(data);
  let predictionMap = {
    "BIG5_Agreeableness": {
      "trait": "BIG5_Agreeableness",
      "value": 0.1038
    },
    "Female": {
      "trait": "Female",
      "value": 0.01624352159138691
    },
    "Age": {
      "trait": "Age",
      "value": 73.6907513498421
    },
    "BIG5_Conscientiousness": {
      "trait": "BIG5_Conscientiousness",
      "value": 0.32880000000000004
    },
    "BIG5_Extraversion": {
      "trait": "BIG5_Extraversion",
      "value": 0.1229
    },
    "BIG5_Openness": {
      "trait": "BIG5_Openness",
      "value": 0.6246
    },
    "BIG5_Neuroticism": {
      "trait": "BIG5_Neuroticism",
      "value": 0.9465
    }
  };
  return predictionMap;
}

function finished() {
  complete = true;
  let data = {};
  Brand.instances.forEach(b => {
    data[b.name] = b.rating;
  });
  let predicts = doScoring(data);
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

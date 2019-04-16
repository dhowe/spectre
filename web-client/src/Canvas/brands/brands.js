class Brand {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.rating = 0;
    Brand.instances.push(this);
  }
  draw() {
    this.update();
    if (this.x > -Brand.radius) this.render();
  }
  update() {
    this.x += Brand.speed;
  }
  render() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, Brand.radius);
  
    stroke(255)
    strokeWeight(3);
    line(this.x, this.y, this.x, height / 2);

    noStroke();
    fill('#C45422');
    text(this.name, this.x, this.y);
    textSize(24);
  }
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) <= Brand.radius;
  }
  active(mx, my) {
    return dist(mx, my, this.x, this.y) <= Brand.radius;
  }
}

Brand.speed = 1;
Brand.radius = 100;
Brand.instances = [];
Brand.active = false;
Brand.names = ['H & M', 'Zara', 'Puma', 'Nike', 'Armani', 'Adidas'];
Brand.drawAll = function () { Brand.instances.forEach(b => b.draw()) };

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

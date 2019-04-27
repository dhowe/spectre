export default class Brand {
  constructor(x, y, item) {
    this.x = x;
    this.y = y;
    this.item = item;
    this.rating = 0;
    Brand.instances.push(this);
  }
  draw() {
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
    textSize(24);
    text(this.item, this.x, this.y);
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

Brand.names = ['cocacola', 'disney', 'converse', 'playstation', 'xbox', 'red bull', 'hello kitty', 'pepsi', 'h&m', 'ben & jerrys', 'old spice', 'burberry', 'adidas', 'marvel', 'nike', 'zara', 'vans', 'starbucks', 'topshop', 'lacoste', 'gap', 'sony', 'new look', 'calvin klein', 'rayban', 'next', 'swarovski', 'tommy hilfiger', 'asos', 'marks and spencer', 'vivienne westwood', 'chanel', 'nintendo64', 'lego'];
Brand.drawAll = function () { Brand.instances.forEach(b => b.draw()) };
Brand.updateAll = function () { Brand.instances.forEach(b => b.update()) };

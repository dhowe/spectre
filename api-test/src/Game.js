import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import P5Wrapper from 'react-p5-wrapper';
import './Game.css';

// NOTE: requires sym-link from ../../shared/user.js
import User from './user.js';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: '#F5FAFA',
    color: 'black'
  },
  content: {
    margin: "64px 0",
  }
};

function sketch(p) {

  let done, user, spacing;
  let numLines = 9;
  let seconds = 25;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(p.CENTER, p.CENTER);
    shuffle(Brand.names);
    spacing = p.height / (numLines + 1);
    for (let i = 0; i < Brand.names.length; i++) {
      new Brand(-i * (p.width / 6) + p.width / 2, p.height / 2, Brand.names[i]);
    }
    user = new User({ name: "Jane", gender: "female" });
  };

  p.draw = function () {

    p.background('#C45422');
    p.stroke(255);

    for (let i = 0; i < numLines; i++) {
      p.strokeWeight(i % 2 === 0 ? 1 : .5);
      if (i === Math.floor(numLines / 2)) p.strokeWeight(3);
      p.line(0, spacing * (i + 1), p.width, spacing * (i + 1));
    }

    if (!done) Brand.updateAll();
    Brand.drawAll(p);

    let timer = seconds - Math.floor(p.millis() / 1000);
    if (timer < 0 && !done) finished();

    p.textSize(48);
    p.fill(255);
    p.text(Math.max(0, timer), p.width - 60, spacing / 2);
    p.textSize(18);
    p.text('drag items then hit spacebar to compute scores', p.width/2, p.height-40);
  };

  p.keyReleased = function () {
    if (p.key === ' ') finished();
  };

  p.mouseReleased = function () {
    if (Brand.active) {

      let lineIdx = Math.floor(p.map(p.mouseY, 1, p.height - 1, 0, numLines));
      lineIdx = p.constrain(lineIdx, 0, numLines - 1); // ints from 0 to 8

      // ratings go from .8 to -.8
      Brand.active.rating = p.map(lineIdx, 0, numLines - 1, 8, -8) / 10;
      Brand.active.y = (lineIdx + 1) / (numLines + 1) * p.height;
      Brand.active = false;
    }
  }

  p.mousePressed = function () {
    Brand.active = false;
    Brand.instances.forEach(b => {
      if (b.contains(p, p.mouseX, p.mouseY)) {
        Brand.active = b;
      }
    });
  }

  p.mouseDragged = function () {
    if (Brand.active) {
      Brand.active.y += p.mouseY - p.pmouseY;
    }
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

    let rows = user.traitNames().length;
    let desc = '</td><td rowspan=' + rows +
      ' id="desc">' + user.generateDescription();
    let html = user.traitNames().reduce((acc, t, i) => {
      return acc + otr + t + ctd + user.traits[t] + (i ? '' : desc) + ctr;
    }, '');

    document.getElementById("content").style.display = 'inline-block';
    document.getElementById("tdata").innerHTML = html;
  }

  function randomizeData() {
    Brand.instances.forEach(b => {
      let idx = Math.floor(Math.random(0, numLines));
      b.rating = p.map(idx, 0, numLines - 1, -8, 8) / 10;
      b.y = (idx + 1) / (numLines + 1) * p.height;
    });
  }

  function checkData() {
    let nodata = true;
    Brand.instances.forEach(b => {
      if (b.rating !== 0) nodata = false;
    });
    if (nodata) randomizeData();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
};

class Brand {
  constructor(x, y, item) {
    this.x = x;
    this.y = y;
    this.item = item;
    this.rating = 0;
    Brand.instances.push(this);
  }
  draw(p) {
    if (this.x > -Brand.radius) this.render(p);
  }
  update() {
    this.x += Brand.speed;
  }
  render(p) {
    p.noStroke();
    p.fill(255);
    p.ellipse(this.x, this.y, Brand.radius);

    p.stroke(255)
    p.strokeWeight(3);
    p.line(this.x, this.y, this.x, p.height / 2);

    p.noStroke();
    p.fill('#C45422');
    p.textSize(24);
    p.text(this.item, this.x, this.y);
  }
  contains(p, mx, my) {
    return p.dist(mx, my, this.x, this.y) <= Brand.radius;
  }
}

Brand.speed = 1;
Brand.radius = 100;
Brand.instances = [];
Brand.active = false;

Brand.names = ['cocacola', 'disney', 'converse', 'playstation', 'xbox', 'red bull', 'hello kitty', 'pepsi', 'h&m', 'ben & jerrys', 'old spice', 'burberry', 'adidas', 'marvel', 'nike', 'zara', 'vans', 'starbucks', 'topshop', 'lacoste', 'gap', 'sony', 'new look', 'calvin klein', 'rayban', 'next', 'swarovski', 'tommy hilfiger', 'asos', 'marks and spencer', 'vivienne westwood', 'chanel', 'nintendo64', 'lego'];
Brand.drawAll = function (p) { Brand.instances.forEach(b => b.draw(p)) };
Brand.updateAll = function () { Brand.instances.forEach(b => b.update()) };

function Game(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <P5Wrapper sketch={sketch} />
                <div id="content">
                  <table>
                    <tbody>
                    <tr>
                      <th>Trait</th>
                      <th>Score</th>
                      <th>Description</th>
                    </tr>
                    </tbody>
                    <tbody id="tdata"></tbody>
                  </table>
                </div>
            </div >
        </div >
    );
}

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Game);

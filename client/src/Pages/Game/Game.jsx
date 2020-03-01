import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import P5Wrapper from 'react-p5-wrapper';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import './Game.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {

  // configurable parameters
  allowedTimeMs: 35000,
  sketchStrokeWeight: 2,
  sketchStrokeMinWeight: .2,

  // can grab css from sass
  sketchBg: '#FFFFFF',
  sketchText: '#929392',
  sketchStroke: '#E0E0E0',
  sketchStrokeSel: '#21c0fc',
};

/*
 * OCEAN Game sketch (temporarily) in p5js/canvas
 *
 * Ratings go from -.8 to .8 for each brand
 * Hit the space-bar or let the timer run out
 *   to compute the personality score (if nothing
 *   is moved, brand ratings are randomized)
 */
let percent, totalDist, colors = {}, logos = {};

function sketch(p) {

  let numLines = 9;
  let brandSize, showFps = false, padding = 5;
  let love, hate, done, start, fps, linesY = [];
  let loveArrow, hateArrow, instruct, instructions = true;

  p.preload = () => {
    instruct = p.loadImage('/imgs/game_instruct.png');
    loveArrow = p.loadImage('/imgs/love_arrow.svg');
    hateArrow = p.loadImage('/imgs/hate_arrow.svg');
    love = p.loadImage('/imgs/love.svg');
    hate = p.loadImage('/imgs/hate.svg');
    Brand.names.forEach((name) => {
      const img = name.replace(/ /g, '_') + '.svg';
      logos[name] = p.loadImage(UserSession.imageDir + img);
    });
  }

  p.setup = () => {
    p.createCanvas(1920, 784); // 1080, 900 for portrait

    colors.sketchBg = p.color(styles.sketchBg);
    colors.sketchText = p.color(styles.sketchText);
    colors.sketchStroke = p.color(styles.sketchStroke);
    colors.sketchStrokeSel = p.color(styles.sketchStrokeSel);

    p.textAlign(p.CENTER, p.CENTER);
    p.imageMode(p.CENTER);
    brandSize = p.height / 8;

    UserSession.shuffle(Brand.names);

    let lineGap = ((p.height-padding*2) / numLines) -3;
    let lineOffset = p.ceil(brandSize/2) + padding + 6;
    for (let i = 0; i < numLines; i++) {
      linesY.push((lineGap * i) + lineOffset);
    }

    Brand.instances = [];
    for (let i = 0; i < Brand.names.length; i++) {
      let bx = -i * (p.width / 6) + p.width / 3;
      Brand.instances.push(new Brand
        (p, bx, linesY[(numLines-1)/2], brandSize, Brand.names[i]));
        //(p, bx+1000, linesY[i%2===1?0:numLines-1], brandSize, Brand.names[i]));
    }
    totalDist = p.width - Brand.instances[Brand.instances.length - 1].x;
    start = p.millis();
  };

  p.draw = () => {

    p.background(colors.sketchBg);
// p.stroke(0);
// p.strokeWeight(1);
// p.rect(0,0,p.width, p.height);

    p.stroke(colors.sketchStroke);

    for (let i = 0; i < linesY.length; i++) {
      p.strokeWeight( i % 2 === 0 ? .5 : 0);
      p.stroke(colors.sketchStrokeSel);
      let ypos = linesY[i];
//p.text(i+':'+ypos, 200, ypos); // line nums
      p.line(0, ypos, p.width, ypos);
    }
//if (p.frameCount === 2) console.log(linesY);

    drawInfo(p, love, hate , loveArrow, hateArrow);

    if (instructions) {
      p.image(instruct, p.width / 2, p.height / 2);
      return;
    }

    if (!done) Brand.updateAll();
    Brand.drawAll();

    if (styles.allowedTimeMs) {
      percent = elapsed() / styles.allowedTimeMs;
      let timer = Math.floor(((styles.allowedTimeMs -
        (styles.allowedTimeMs * percent)) / 1000));

      if (timer < 0 && !done) finished();

      p.fill(colors.sketchText);
      p.noStroke();
      p.textSize(40);
      p.text(Math.max(0, timer), p.width - 60, 20);
      if (p.frameCount % 10 === 1) fps = Math.round(p.frameRate());
      if (showFps) p.text('fps: ' + fps, 70, 20); // tmp
    }
  };

  p.keyReleased = () => { if (p.key === 'f') showFps = !showFps; };
  p.mouseReleased = () => { mReleased(); };
  p.touchEnded = () => { mReleased(); }
  p.touchStarted = () => { mPressed(); }
  p.mousePressed = () => { mPressed(); };
  p.touchMoved = () => { mDragged(); };
  p.mouseDragged = () => { mDragged(); };

  function mDragged() {
    if (Brand.active) Brand.active.y += p.mouseY - p.pmouseY;
  }

  function mPressed() {
    Brand.active = false;
    if (typeof Brand.instances !== 'undefined') {
      Brand.instances.forEach(b => {
        if (b.contains(p.mouseX, p.mouseY)) Brand.active = b;
      });
    }
    else {
      console.error('[ERROR] No brand instances');
    }
  }

  function mReleased() {
    if (instructions) {
      instructions = false;
      start = p.millis();
      return;
    }
    if (Brand.active) {
      let lineIdx = -1;
      let closestLine = 10000;
      for (var i = 0; i < linesY.length; i++) {
        if (p.abs(linesY[i] - p.mouseY) < closestLine) {
          closestLine = p.abs(linesY[i] - p.mouseY);
          lineIdx = i;
        }
      }
      Brand.active.rating = p.map(lineIdx, 0, numLines-1, 8, -8) / 10; // -8 to 8
//console.log('ON: '+lineIdx, Brand.active.rating);
      Brand.active.snapTo(linesY[lineIdx]);
      Brand.active = false;
    }
  }

  function elapsed() {
    return p.millis() - start;
  }

  function finished() {
    done = true;
    checkData();
    game.onCompletion(Brand.instances.map(b =>
      ({ item: b.item, rating: b.rating })));
  }

  function randomizeData() {
    Brand.instances.forEach(b => {
      let idx = Math.floor(p.random(0, numLines));
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

  function drawInfo(p,love, hate, loveArrow, hateArrow) {
    p.textSize(40);
    p.noStroke();
    p.image(love, p.width / 2, 69);
    p.image(loveArrow, p.width / 2 - 1, 253);
    p.image(hate, p.width / 2, p.height - 64);
    p.image(hateArrow, p.width / 2 - 1, p.height - 248);
  }
};

class Brand {
  constructor(p, x, y, sz, item) {
    this.p = p;
    this.ix = x;
    this.x = x;
    this.y = y;
    this.sy = y;
    this.ty = y;
    this.t = 1;
    this.sz = sz;
    this.rating = 0;
    this.item = item;
    this.logo = logos[item];
  }
  draw() {
    if (this.x > -this.sz) this.render();
  }
  update() {
    this.x = this.ix + (percent * totalDist);
    if (this.sy !== this.ty) {
      let ft = this.bounceOut(this.t);
      this.y = this.p.map(ft, 0, 1, this.sy, this.ty);
      this.t += 0.05; // 20 frames of snap
      if (this.t > 1) {
        this.sy = this.ty;
      }
    }
  }
  snapTo(my) { // easing
    this.sy = this.y;
    this.ty = my;
    this.t = 0;
  }
  render() {
    let p = this.p;
    p.fill(colors.sketchBg);
    p.stroke(this === Brand.active ? colors.sketchStrokeSel : colors.sketchStroke);
    p.strokeWeight(this === Brand.active ? styles.sketchStrokeWeight : styles.sketchStrokeWeight); // same
    p.ellipse(this.x, this.y, this.sz);
    p.image(this.logo, this.x, this.y, this.sz * .8, this.sz * .8);
    if (false) {
      p.noStroke();
      p.fill(colors.sketchText);
      p.textSize(this.sz / 4);
      p.textAlign(p.CENTER, p.TOP);
      p.text(this.item, this.x, this.y + this.sz / 2 + 2);
    }
    p.textAlign(p.CENTER, p.CENTER);
  }
  textHeight() {
    return this.p.textAscent() + this.p.textDescent();
  }
  contains(mx, my) {
    return this.p.dist(mx, my, this.x, this.y) <= this.sz;
  }
  bounceOut(_x) { // from penner
    if (_x < 4 / 11.0) {
      return ((121 * _x * _x) / 16.0);
    } else if (_x < 8 / 11.0) {
      return ((363 / 40.0 * _x * _x) - (99 / 10.0 * _x) + 17 / 5.0);
    } else if (_x < 9 / 10.0) {
      return ((4356 / 361.0 * _x * _x) - (35442 / 1805.0 * _x) + 16061 / 1805.0);
    } else {
      return ((54 / 5.0 * _x * _x) - (513 / 25.0 * _x) + 268 / 25.0);
    }
  }
}

Brand.active = false;
Brand.sheffield = ['disney', 'converse', 'xbox', 'red bull', 'hello kitty', 'h&m', 'ben & jerrys', 'old spice', 'adidas', 'marvel', 'nike', 'vans', 'starbucks', 'lacoste', 'sony', 'new look', 'asos', 'chanel'];
Brand.names = ['cocacola', 'disney', 'converse', 'xbox', 'vans', 'red bull', 'hello kitty', 'ben & jerrys', 'old spice', 'adidas', 'marvel', 'nike', 'starbucks', 'lacoste', 'gap', 'sony', 'calvin klein', 'swarovski', 'chanel', 'lego'];
Brand.drawAll = () => { Brand.instances.forEach(b => b.draw()) };
Brand.updateAll = () => { Brand.instances.forEach(b => b.update()) };
Brand.all = ['cocacola', 'disney', 'converse', 'playstation', 'xbox', 'red bull', 'hello kitty', 'pepsi', 'h&m', 'ben & jerrys', 'old spice', 'burberry', 'adidas', 'marvel', 'nike', 'vans', 'starbucks', 'topshop', 'lacoste', 'gap', 'sony', 'new look', 'calvin klein', 'next', 'swarovski', 'tommy hilfiger', 'asos', 'marks and spencer', 'vivienne westwood', 'chanel', 'nintendo64', 'lego'];

///////////////////// End p5.js sketch ////////////////////////////

let user, game;

class Game extends React.Component {
  constructor(props) {
    super(props, "/thank-you");
    game = this; // handle for p5js
  }

  async componentDidMount() {
    user = await UserSession.ensure
      (this.context, ['login', 'name']);
  }

  async onCompletion(ratings) { // called from p5
    user.traitsFromBrands(ratings);
    await UserSession.update(user);
    user.goto(this.props, '/thank-you');
  }

  render() {
    return (
      <div className={this.props.classes.root} id='clickMe'>
        <SpectreHeader colour="white" noDivider/>
        <P5Wrapper sketch={sketch} className="wrapper" />
        <IdleChecker />
        <FooterLogo />
      </div>
    );
  }
}
Game.propTypes = {
  classes: PropTypes.object.isRequired,
};
Game.contextType = UserSession;

export default withStyles(styles)(Game);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import P5Wrapper from 'react-p5-wrapper';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import './Game.css';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },

  // configurable parameters
  allowedTimeMs: 40000,
  sketchStrokeWeight: 6,
  sketchStrokeMinWeight: 2,

  // can grab css from sass
  sketchBg: '#FFFFFF',
  sketchText: '#929392',
  sketchStroke: '#929392',
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

  let done, brandSize, start, fps, numLines = 9, showFps = false,
    linesY = [], instruct, instructions = true;

  p.preload = () => {
    instruct = p.loadImage('/imgs/game_instruct.png');
    Brand.names.forEach((name) => {
      logos[name] = p.loadImage('/imgs/' + name.replace(/ /g, '_') + '.png');
    });
  }

  p.setup = () => {

    p.createCanvas(1080, 750);
    colors.sketchBg = p.color(styles.sketchBg);
    colors.sketchText = p.color(styles.sketchText);
    colors.sketchStroke = p.color(styles.sketchStroke);
    colors.sketchStrokeSel = p.color(styles.sketchStrokeSel);

    p.textAlign(p.CENTER, p.CENTER);
    p.imageMode(p.CENTER);
    brandSize = p.height / 10;

    shuffle(Brand.names);
    Brand.instances = [];
    for (let i = 0; i < Brand.names.length; i++) {
      let bx = -i * (p.width / 6) + p.width / 3;
      Brand.instances.push(new Brand(p, bx, p.height / 2, brandSize, Brand.names[i]));
    }
    totalDist = p.width - Brand.instances[Brand.instances.length - 1].x;
    start = p.millis();
  };

  p.draw = () => {

    p.background(colors.sketchBg);
    p.stroke(colors.sketchStroke);

    let lineGap = p.height / numLines;
    for (let i = 0; i < numLines; i++) {
      p.strokeWeight(i % 2 === 0 ? styles.sketchStrokeWeight : 0);
      let ypos = lineGap * (i + 1) - lineGap / 2;
      p.line(0, ypos, p.width, ypos);
      if (p.frameCount === 1) linesY.push(ypos);
    }

    drawInfo(p, colors.sketchText);

    if (instructions) {
      p.image(instruct, p.width/2, p.height/2-100);
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
      if (showFps) p.text('fps: ' + fps, 50, 20); // tmp
    }
  };

  p.keyReleased = () => {
    if (p.key === ' ') finished();
    if (p.key === 'f') showFps = !showFps;
  };

  p.mouseReleased = () => {
    if (instructions) {
      instructions = false;
      start = p.millis();
      return;
    }
    if (Brand.active) {
      let lineIdx = -1,
        closestLine = 10000;
      for (var i = 0; i < linesY.length; i++) {
        if (p.abs(linesY[i] - p.mouseY) < closestLine) {
          closestLine = p.abs(linesY[i] - p.mouseY);
          lineIdx = i;
        }
      }
      Brand.active.rating = p.map(lineIdx, 0, numLines - 1, 8, -8) / 10;
      Brand.active.snapTo(linesY[lineIdx]);
      Brand.active = false;
    }
  };

  p.mousePressed = () => {
    Brand.active = false;
    Brand.instances.forEach(b => {
      if (b.contains(p.mouseX, p.mouseY)) {
        Brand.active = b;
      }
    });
  };

  p.mouseDragged = () => {
    if (Brand.active) {
      Brand.active.y += p.mouseY - p.pmouseY;
    }
  };

  function elapsed() {
    return p.millis() - start;
  }

  function finished() {
    done = true;
    checkData();
    let data = Brand.instances.map(b => ({ item: b.item, rating: b.rating }));
    user.setBrands(data);
    //.forEach(p => user.traits[p.trait] = p.score);
    //user.influences = user.predictInfluences(3);
    game.componentComplete();
    //displayAsHtml(user);
  }

  function displayAsHtml(user) { // eslint-disable-line no-unused-vars
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

  function randomizeData() {
    Brand.instances.forEach(b => {
      let idx = Math.floor(p.random(0, numLines));
      b.rating = p.map(idx, 0, numLines - 1, -8, 8) / 10;
      b.y = (idx + 1) / (numLines + 1) * p.height;
    });
  }

  function drawInfo(p, c) {
    p.textSize(40);
    p.fill(c);
    p.noStroke();
    p.text('+ Love', p.width/2, 20);
    p.text('- Hate', p.width/2, p.height-20)
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
  constructor(p, x, y, sz, item) {
    this.p = p;
    this.ix = x;
    this.x = x;
    this.y = y;
    this.sy = y;
    this.ty = y;
    this.t = 1;
    this.sz = sz;
    this.item = item;
    this.rating = 0;
    this.strokeWeight = colors.sketchStrokeMinWeight;
    // HERE
    //this.logo = this.p.loadImage('/imgs/' + this.item.replace(/ /g, '_') + '.png');
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
      this.t += 0.1;
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
    p.strokeWeight(this === Brand.active ? styles.sketchStrokeWeight : styles.sketchStrokeMinWeight);
    p.ellipse(this.x, this.y, this.sz);

    p.image(this.logo, this.x, this.y, this.sz * .8, this.sz * .8);

    // p.noStroke();
    // p.fill(colors.sketchText);
    // p.textSize(this.sz / 4);
    // p.textAlign(p.CENTER, p.TOP);
    // p.text(this.item, this.x, this.y + this.sz / 2 + 2);

    p.textAlign(p.CENTER, p.CENTER);
  }
  textHeight(str) {
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
Brand.speed = styles.sketchSpeed;
Brand.names = ['disney', 'converse', 'xbox', 'red bull', 'hello kitty', 'h&m', 'ben & jerrys', 'old spice', 'burberry', 'adidas', 'marvel', 'nike', 'zara', 'vans', 'starbucks', 'topshop', 'lacoste', 'sony', 'new look', 'rayban', 'asos', 'chanel'];
Brand.drawAll = () => { Brand.instances.forEach(b => b.draw()) };
Brand.updateAll = () => { Brand.instances.forEach(b => b.update()) };

///////////////////// End p5.js sketch ////////////////////////////

let user, game;

class Game extends React.Component {

  constructor(props) {

    super(props);
    game = this; // handle for p5js
    this.state = { toThankYou: false };
  }

  componentComplete() { // redirect called from p5

    if (typeof this.context._id !== 'undefined') { // TMP: remove

      // update last page context
      this.context.lastPageVisit = { page: '/Game', time: Date.now };

      UserSession.updateUser(this.context,
        json => {
          Object.assign(this.context, json);
          this.setState(() => ({ toThankYou: true }));
        }, err => {
          console.error(err);
          this.setState(() => ({ toThankYou: true }));
        });

    } else { // TMP: remove
      console.warn('WARN: not updating Db with User info!');
    }
  }

  componentWillMount() {

    user = this.context;

    ///////////////////// TMP: ///////////////////////
    if (typeof user._id === 'undefined') {
      user.name = user.name || 'Barney';
      user.loginType = user.loginType || 'email';
      user.login = user.login || 'Barney' + (+new Date()) + '@aol.com';
      UserSession.createUser(user);
    }
    //////////////////////////////////////////////////

    console.log("User:", this.context);
  }

  render() {

    const { classes } = this.props;
    if (this.state.toThankYou === true) { // hack redirect
      return <Redirect to='/thank-you' />
    }
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        {/*<div className={"game content"}>*/}
          <P5Wrapper sketch={sketch} className="wrapper" />
          <Link to="/thank-you">
            <IconButton icon="next" text="Next" />
          </Link>
        {/*</div >*/}
        <FooterLogo />
      </div >
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};
Game.contextType = UserSession;

export default withStyles(styles)(Game);

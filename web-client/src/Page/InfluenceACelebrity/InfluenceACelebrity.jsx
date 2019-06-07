import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/es/Fade/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Video from '../../Components/Video/Video';

import './InfluenceACelebrity.scss';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class InfluenceACelebrity extends NavigationHack {
  constructor(props) {
    super(props, '/OCEAN-reveal');
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.save = this.save.bind(this);
    this.state = { video: null };

    // a random set, always with two femals
    let fcelebs = ['Kardashian', 'Abramovic'];
    let mcelebs = ['Freeman', 'Duchamp', 'Mercury', 'Trump', 'Zuckerberg'];
    mcelebs = InfluenceACelebrity.shuffle(mcelebs).splice(0, 4);
    this.celebs = InfluenceACelebrity.shuffle(mcelebs.concat(fcelebs));
  }

  save() {
    //this.context.celebrity = this.state.celebrity;
    // Send data somewhere
    this.next();
  }

  static shuffle(arr) {
    if (!arr) arr = [];
    arr.sort(() => Math.random() - 0.5);
    return arr;
  }

  stop() {
    this.setState({ video: null });
  }

  play(name) {
    this.context.celebrity = name;
    this.setState({
      celebrity: name,
      video: `/video/${this.context.virtue || 'power'}_${name}.mp4`,
    });
  }

  render() {
    const { classes, celebrity } = this.props;
    const { video } = this.state;
    const user = this.context;
    user.virtue = user.virtue || 'power';

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three"/>
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography className="title" component="h4" variant="h4">Influence a celebrity!</Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">
              Spectre has many famous followers.
            </Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">
              Listen to their confessions on&nbsp;{user.virtue}:
            </Typography>
          </Fade>
          {video && <Video autoPlay onComplete={this.stop} movie={video}/>}
          <AvatarCircle>
            {this.celebs
              .map((name, i) => (
                <AvatarComponent
                  active={name === celebrity}
                  handleClick={() => this.play(name)}
                  key={AvatarComponent.generateKey(i)}
                  target={{ name, image: `/imgs/${name}.png` }}
                />
              ))}
          </AvatarCircle>

          <IconButton onClick={this.save} icon="next" text="Next" />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceACelebrity.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
InfluenceACelebrity.contextType = UserSession;

export default withStyles(styles)(InfluenceACelebrity);

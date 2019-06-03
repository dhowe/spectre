import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/es/Fade/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Video from '../../Components/Video/Video';

import './InfluenceACelebrity.scss';

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

class InfluenceACelebrity extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = { video: null };
    this.celebs = InfluenceACelebrity.shuffle(['Kardashian', 'Trump', 'Freeman', 'Duchamp', 'Hirst', 'Zuckerberg']);
  }

  save() {
    this.context.celebrity = this.state.celebrity;
    // Send data somewhere
    window.location.assign('/OCEAN-reveal');
  }

  // Nabbed from StackOverflow: https://stackoverflow.com/a/2450976
  static shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while(currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  stop() {
    this.setState({ video: null });
  }

  play(name) {
    this.setState({
      celebrity: name,
      video: `/video/virtue/${this.context.virtue}_${name}.mp4`,
    });
  }

  render() {
    const { classes } = this.props;
    const { video } = this.state;
    const user = this.context;
    this.context.virtue = this.context.virtue || 'power';

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three"/>
        <div className={classes.content + ' content'}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography className="title" component="h3" variant="h3">Influence a celebrity!</Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">
              Spectre has many famous followers.
            </Typography>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <Typography component="h6" variant="h6">
              Select a famous follower to hear their confession
              on&nbsp;
              {user.virtue}
              :
            </Typography>
          </Fade>
          {video && <Video autoPlay onComplete={this.stop} movie={video}/>}
          <AvatarCircle>
            {this.celebs
              .map((name, i) => (
                <AvatarComponent
                  handleClick={() => this.play(name)}
                  key={AvatarComponent.generateKey(i)}
                  target={{ name, image: `/imgs/celebrities/${name}.png` }}
                />
              ))}
          </AvatarCircle>

          <IconButton onClick={this.save} icon="next" text="Next"/>
        </div>
        <FooterLogo/>
      </div>
    );
  }
}

InfluenceACelebrity.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceACelebrity.contextType = UserSession;

export default withStyles(styles)(InfluenceACelebrity);

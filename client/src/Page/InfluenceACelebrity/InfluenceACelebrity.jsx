import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//mport Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/es/Fade/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Video from '../../Components/Video/Video';

import './InfluenceACelebrity.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const styles = {

};

class InfluenceACelebrity extends React.Component {
  constructor(props) {
    super(props, '/OCEAN-reveal');
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      virtue: '',
      video: null,
      idleCheckerDone: false
    };
    // a random set, always with two females
    this.celebs = UserSession.randomCelebrities();
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'virtue']);
    this.setState({ virtue: user.virtue });
  }

  save() {
    //this.context.celebrity = this.state.celebrity;
    // Send data somewhere
    this.next();
  }

  stop() {
    this.setState({ video: null });
    this.setState({ idleCheckerDone: false });
  }

  play(name, virtue) {
    const user = this.context;
    user.celebrity = name;
    this.setState({
      celebrity: name,
      video: `/video/${virtue}_${name}.mp4`,
    });
    this.setState({ idleCheckerDone: true });
    UserSession.update(user);
  }

  render() {
    const { classes, celebrity } = this.props;
    const { video, virtue } = this.state;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <IdleChecker forceTerminate={this.state.idleCheckerDone} />
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <p className="copy">Influence a celebrity!</p>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <p className="copy-nextline">
              Spectre has many famous followers.
            </p>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <p className="copy-nextline">
              Listen to their confessions on&nbsp;{virtue}:
            </p>
          </Fade>
          {video && <Video autoPlay onComplete={this.stop} movie={video} />}
          <AvatarCircle>
            {this.celebs
              .map((name, i) => (
                <AvatarComponent
                  active={name === celebrity}
                  key={AvatarComponent.generateKey(i)}
                  handleClick={() => this.play(name, virtue)}
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

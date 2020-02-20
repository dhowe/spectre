import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/es/Fade/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import Video from '../../Components/Video/Video';

import './InfluenceACelebrity.scss';
import ComponentsStyles from '../../App.module.css';

const styles = {};

class InfluenceACelebrity extends React.Component {

  constructor(props) {
    super(props, '/OCEAN-reveal');
    this.state = {
      virtue: '',
      video: null,
      idleCheckerDone: false
    };
    // a random set, always with two females
    this.celebs = UserSession.randomCelebrities();
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, [/*'_id',*/ 'virtue']);
    this.setState({ virtue: user.virtue });
  }

  stop = () => {
    this.setState({ video: null });
    this.setState({ idleCheckerDone: false });
  }

  play = (name, virtue) => {
    const user = this.context;
    user.celebrity = name;
    this.setState({
      celebrity: name,
      video: `${UserSession.publicUrl}video/${virtue}_${name}.mp4`,
    });
    this.setState({ idleCheckerDone: true });
    UserSession.update(user); // no await
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
            <h1 className="noSpacing"><span><strong>Step 3</strong> - Influence a celebrity!</span></h1>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
              <h2>Spectre has many famous followers.</h2>
          </Fade>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <p className="normal-addSpacing">
              Listen to their confessions on&nbsp;{virtue}:
            </p>
          </Fade>
          {video && <Video autoPlay onComplete={this.stop} movie={video} />}
          <AvatarCircle>
            {this.celebs.map((name, i) => (
                <AvatarComponent key={i}
                  active={name === celebrity}
                  handleClick={() => this.play(name, virtue)}
                  target={{
                    name: name,
                    image: `${UserSession.imageDir}${name}.png`,
                    updatedAt: UserSession.epochDate
                  }}
                />
              ))}
          </AvatarCircle>
          <IconButton onClick={() => this.context.goto(this.props, '/OCEAN-reveal')}
           className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button/Button';

import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';

import Video from '../../Components/Video/Video';
import Styles from '../../Styles';
import colours from '../../colors.scss';
import './InsightComplete.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  button: {
    ...Styles.button,
    color: colours.blue,
    borderColor: colours.blue,
  },
};

class InsightComplete extends React.Component {
  constructor(props) {
    super(props, '/your-power');
    this.state = { idleCheckerDone: false, target: {name: '', traits:''} };
  }

  componentDidMount() {
    UserSession.ensure(this.context,
      ['_id', 'name', 'login', 'gender', 'virtue', 'target'],
      user => this.setState({ target: user.target }));
  }

  showVideo = () => {
    this.video.play();
    this.setState({ idleCheckerDone: true });
  }

  nextPage = () => {
    this.props.history.push('/your-power');
  }

  render() {
    console.log('page',window.location.pathname);
    const { classes } = this.props;
    const { target, idleCheckerDone } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker forceTerminate={idleCheckerDone}/>
        <div className={`${classes.content} content`}>
          <Typography className="title" component="h3" variant="h3">Excellent.</Typography>
          <Typography component="h6" variant="h6">Verification complete!</Typography>
          <Typography component="h6" variant="h6">You've unlocked OCEAN profiling!</Typography>
          <OceanProfile subject={target} classes={classes}></OceanProfile>
          <Typography component="h6" variant="h6">You now have the <strong>power</strong> to
           influence&nbsp;<strong>{target.name}</strong>.
          </Typography>
          <IconButton icon="play" text="Next" onClick={this.showVideo} Button={<Button style={{ marginTop: 20, }}
            className={classes.button} variant="contained" color="primary">WTF is OCEAN?</Button>} />
          <Video ref={(el) => { this.video = el; }} onComplete={this.nextPage}
            autoPlay={false} movie="/video/OceanIntro.mp4" />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InsightComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};
InsightComplete.contextType = UserSession;

export default withStyles(styles)(InsightComplete);

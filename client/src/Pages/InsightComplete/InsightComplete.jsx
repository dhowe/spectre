import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import { ReactComponent as ThumbUp } from '../../Icons/insightthankyou.svg';
import Video from '../../Components/Video/Video';
import './InsightComplete.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {};

class InsightComplete extends React.Component {
  constructor(props) {
    super(props, '/your-power');
    this.video = React.createRef();
    this.state = { idleCheckerDone: false };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      [ 'name', 'login', 'virtue', 'target']);
    this.setState({ target: user.target });
  }

  showVideo = () => {
    this.video.play();
    this.setState({ idleCheckerDone: true });
  }

  render() {
    const { classes } = this.props;
    const { idleCheckerDone } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        {/*<ThumbUp className="thankyou-icon" />*/}
        <IdleChecker forceTerminate={idleCheckerDone} />
        <div className={`${classes.content} content`}>
          <h1><span><strong>Step 1</strong> complete!</span></h1>
          <h2>You've unlocked <span>OCEAN Profiling</span></h2>
          <IconButton enabled={true}
            className={ComponentsStyles.iconButtonStyle3}
            icon="play" text="WTF is OCEAN?&nbsp;"
            onClick={this.showVideo} />
          <Video
            ref={e => { this.video = e; }}
            onComplete={() => this.context.goto(this.props, '/your-power')}
            movie={`${UserSession.publicUrl}video/OceanIntro.mp4`}
            autoPlay={false}
          />
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

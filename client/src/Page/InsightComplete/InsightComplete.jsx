import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';

import Video from '../../Components/Video/Video';
import './InsightComplete.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {
};

class InsightComplete extends React.Component {
  constructor(props) {
    super(props, '/your-power');
    this.state = {
      idleCheckerDone: false,
      target: { name: '', traits: '' },
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      [/*'_id',*/ 'name', 'login', 'gender', 'virtue', 'target']);
    this.setState({ target: user.target });
  }

  showVideo = () => {
    this.video.play();
    this.setState({ idleCheckerDone: true });
  }

  render() {
    //console.log('page',window.location.pathname);
    const { classes } = this.props;
    const { target, idleCheckerDone } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker forceTerminate={idleCheckerDone} />
        <OceanProfile subject={target} className="w3-bar-item w3-button"></OceanProfile>
        <div className={`${classes.content} content`}>
          <IconButton enabled={true} icon="play" text="menu" onClick={e=>this.handleSideBar(e)} />
          <p className="normal-nextline">You now have the <strong>power</strong> to influence&nbsp;<strong>{target.name}</strong>.</p>
          <IconButton enabled={true} className={ComponentsStyles.iconButtonStyle2} icon="play" text="WTF is OCEAN?" onClick={this.showVideo} />
          <Video
            ref={(el) => { this.video = el; }}
            onComplete={() => this.props.history.push('/your-power')}
            autoPlay={false} movie="https://spectreknows.me/video/OceanIntro.mp4" />
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

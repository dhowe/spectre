import React from 'react';
import Webcam from "react-webcam";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import { withStyles } from '@material-ui/core/styles';
import ComponentsStyles from '../../App.module.css';
import './SearchingFor.scss';

const styles = {
  profileImage: {
    width: 1920,
    height: 1080,
  },
};

class SearchingFor extends React.Component {
  constructor(props) {
    super(props, '/data-is');
    this.state = { name: '' };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  async componentDidMount() {
    let user = await UserSession.ensure(this.context,
      ['_id', 'login', 'gender', 'name']);
    this.setState({ name: user.name })
  }

  handleClick(virtue) {
    const user = this.context;
    user.virtue = virtue;
    try {
      console.log('[WEBCAM] Taking image...');
      if (!UserSession.uploadImage(user, this.webcam.getScreenshot())) {
        console.error('[WEBCAM] Error: webcam not available[1]');
        if (!UserSession.uploadImage(user, this.webcam.getScreenshot())) {
          console.error('[WEBCAM] Error: webcam not available[2]');
        }
      }
    }
    catch (e) {
      console.error('[WEBCAM] Caught: ', e);
    }
    this.props.history.push('/data-is');
  }

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1><span>{name}, </span>what are you<br />
            searching for today?</h1>
          <div className="ImageCapture">
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              width={styles.profileImage.width}
              height={styles.profileImage.height}
              style={{ left: '-5000px', position: 'fixed' }}
              videoConstraints={{
                width: styles.profileImage.width,
                height: styles.profileImage.height,
                facingMode: "user"
              }}
            />
          </div>
          <div className={ComponentsStyles.buttonWrapper}>
            <Button className={ComponentsStyles.button} variant="contained" color="primary"
              onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary"
              onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary"
              onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary"
              onClick={() => this.handleClick('wealth')}>Wealth</Button>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

SearchingFor.propTypes = {
  classes: PropTypes.object.isRequired,
};
SearchingFor.contextType = UserSession;

export default withStyles(styles)(SearchingFor);

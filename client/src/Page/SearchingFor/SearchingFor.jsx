import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Webcam from "react-webcam";
import './SearchingFor.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {

  profileImage: {
    width: 1920,
    height: 1080,
  },
};

class SearchingFor extends React.Component {
  constructor(props) {
    super(props, 'data-is');
    this.state = {};
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

  toImageFile(data, fname) {
    const arr = data.split(',');
    if (!data || data.length <= 6) {
      data && console.error(data);
      throw Error('Bad image data: ' + data);
    }
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fname, { type: mime });
  }

  handleClick(virtue) {

    const user = this.context;
    user.virtue = virtue;

    try {
      console.log('[WEBCAM] Taking image...');
      const data = this.webcam.getScreenshot();
      if (data && data.length) {
        const imgfile = this.toImageFile(data, user._id + '.jpg');
        UserSession.postImage(this.context, imgfile,
          (json) => {
            this.context.hasImage = true;
            this.props.history.push('/data-is');
            return;
          },
          (e) => {
            console.error('Error', e);
            this.context.hasImage = false;
            this.props.history.push('/data-is');
            return;
          }
        );
      }
      else {
        console.error('Webcam not available');
        this.context.hasImage = false;
        this.props.history.push('/data-is');
        return;
      }
    }
    catch (e) {
      console.error('Webcam Error: ', e);
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
          <h1><span>{name}, </span>what are you<br/>
           searching for today?</h1>
          {<div className="ImageCapture">
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
          </div>}
          <div className={ComponentsStyles.buttonWrapper}>
            <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick('wealth')}>Wealth</Button>
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

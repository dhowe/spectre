import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Webcam from "react-webcam";
import './SearchingFor.scss';
import Styles from '../../Styles';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  content: {
    paddingTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  button: {
    ...Styles.button,
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  profileImage: {
    width: 800,
    height: 1000,
  },
};

class SearchingFor extends React.Component {
  constructor(props) {
    super(props, 'data-is');
    this.setRef = this.setRef.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
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

  componentDidMount() {
    this.user = UserSession.validate(this.context,
      ['loginType', 'login', 'gender', 'name']);
  }

  handleClick(virtue) {

    if (!this.user) throw Error('No user');
    this.user.virtue = virtue;

    // here we are doing the webcam capture, disabled for now
    if (false) {

      // TODO: next work
      const data = this.webcam.getScreenshot();
      if (data && data.length) {
        const imgfile = this.toImageFile(data, this.user._id + '.jpg');
        UserSession.postImage(this.context, imgfile,
          (json) => {
            console.log(`Upload: http://localhost:3000${json.url}`);
            this.context.hasImage = true;
          },
          (e) => {
            console.error('Error', e);
            this.context.hasImage = false;
          },
        );
        this.setState(() => ({ toNext: true }));
      }
      else {
        console.error('no image capture');
      }
    }

    this.next();
  }

  render() {
    const { classes } = this.props;
    const videoConstraints = {
      width: styles.profileImage.width,
      height: styles.profileImage.height,
      facingMode: "user"
    }
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <Typography className="username" component="h3" variant="h3">{this.context.name || 'Barney'}</Typography>
          <Typography className="question" component="h3" variant="h3">What are you searching for today?</Typography>

          <div className="ImageCapture">
            {<Webcam ref={this.setRef}
              audio={false}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              width={styles.profileImage.width}
              height={styles.profileImage.height}
              style={{ left: '-5000px', position: 'relative' }}
              videoConstraints={videoConstraints}
            />}
          </div>

          <div className="buttonWrapper">
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('wealth')}>Wealth</Button>
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

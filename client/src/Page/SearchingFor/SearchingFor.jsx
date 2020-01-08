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
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  profileImage: {
    width: 640,
    height: 480,
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

  // capture = () => {
  //   const image = this.webcam.getScreenshot();
  //   this.setState({ screenshot: image });
  // }

  async componentDidMount() {
    let user = await UserSession.ensure(this.context,
      ['_id', 'login', 'gender', 'name']);
    this.setState({ name: user.name })
  }

  toImageFile(data, fname) {
    console.log('toImageFile', data);
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

    // here we are doing the webcam capture, disabled for now
    if (1) {
      // TODO: next work
      try {

        const data = this.webcam.getScreenshot();
        if (data && data.length) {
          const imgfile = this.toImageFile(data, user._id + '.jpg');
          UserSession.postImage(this.context, imgfile,
            (json) => {
              console.log(`Upload: http://localhost:3000${json.url}`);
              console.log(json);
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
          console.error('no image capture');
          this.context.hasImage = false;
          return;
        }
      }
      catch (e) {
        console.error('Error on Screenshot: ', e);
      }
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
          <Typography className="username" component="h3" variant="h3">{name}</Typography>
          <p>What are you searching for today?</p>
          {<div className="ImageCapture">
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              width={styles.profileImage.width}
              height={styles.profileImage.height}
              style={{ left: '-5000px', position: 'relative' }}
              videoConstraints={{
                width: styles.profileImage.width,
                height: styles.profileImage.height,
                facingMode: "user"
              }}
            />
          </div>
          }
          <div className="buttonWrapper">
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => this.handleClick('wealth')}>Wealth</Button>
          </div>
          {/*<this.state.screenshot ? <img src={this.state.screenshot} /> : null*/}
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

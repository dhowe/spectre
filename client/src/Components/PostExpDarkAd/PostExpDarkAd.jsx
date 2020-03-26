import React from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import IconButton from '../../Components/IconButton/IconButton';
//import UserSession from '../../Components/UserSession/UserSession';
//import OceanProfile from '../../Components/OceanProfile/OceanProfile';
//import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
//import FooterLogo from '../../Components/FooterLogo/FooterLogo';
//import IdleChecker from '../../Components/IdleChecker/IdleChecker';

//import ComponentsStyles from '../../App.module.css';
import "./PostExpDarkAd.scss";

const styles = {
  button: {
    borderRadius: '28px',
    margin: '20px',
    border: 'solid 3px #21c0fc',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#21c0fc',
    width: '320px',
    height: '54px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: 0,
    textTransform: 'initial',
    fontSize: '21px', // was 24px, 2 words
    '&:hover': {
      backgroundColor: '#21c0fc',
      color: '#ffffff',
    }
  },
  ad: {
    position: 'relative',
    margin: '0 auto',
    width: '642px',
    height: '570px',
  },
  adPage2: {
    position: 'relative',
    margin: '0 auto',
    width: '642px',
  },
  campaignPage2: {
    position: 'absolute',
    bottom: '23px',
    right: '10px',
    width: '100px',
  },
  campaignImage: {
    position: 'absolute',
    bottom: '116px',
    right: '10px',
    width: '100px',
  }
};

class PostExpDarkAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slogan: this.props.target.targetAd.slogan ? this.props.target.targetAd.slogan : 'Americans protect their own',
      issue: '',
      //  images: ['', '', ''],
      //  slogans: ['', '', ''],
      pageDone: false,
      defaultImg: true,
      //  pageOne: { display: 'none' },
      pageTwo: { display: 'block' },
      target: this.props.target,
      image: this.props.target.targetAd.image ? this.props.target.targetAd.image : 'imgs/republican_5.1.jpg',
      sloganY: 230, // offset for slogan on image
      imgLoaded: false,
      imgH: 464
    };
    this.imageRef = React.createRef()
  }

  componentDidMount() {

  }


  render() {
    const { classes } = this.props;
    const { slogan, sloganY } = this.state;
    const { issue, image, defaultImg } = this.state;
    //  const btnEnabledPg1 = (!defaultImg && slogan.length);
    //    const redimg = /imgs/ + 'darkadred.png';
    const cimage = /imgs/ + issue + '.svg';

    return (
      <div className={classes.root + " postExpDarkAd"}>
        <span className="noSpacing darkad-title"><br />Your targeted  <img className="fb-img" src='/imgs/facebook.png'
          alt="facebook" /> ad:</span>
        <div className="adPage">
          <img className='adImage' src={image} alt="bg" ref={this.imageRef}></img>
          <p style={slogan ? { backgroundColor: 'red', top: (bannerOffsets[image] * 100) + '%', color: '#ffffff' } : { backgroundColor: 'none' }} className='darkAdText'>{slogan}</p>
          {!defaultImg ? <img className={classes.campaignPage2} src={cimage} alt="bg"
            style={{ bottom: (sloganY === 370 ? 315 : 15) }}></img> : ''}
        </div>
        <p className='shareText'> Share with <span>{this.props.target.name}</span></p>
        <div className="fakeBtn"><img alt="shareIcon" src="./imgs/shareIcon.svg" /><strong>Share</strong></div>
      </div>
    );
  }
}

const bannerOffsets = {
  'imgs/democrat_1.1.jpg': 230 / 464,
  'imgs/democrat_1.2.jpg': 370 / 464,
  'imgs/democrat_2.1.jpg': 230 / 464,
  'imgs/democrat_2.2.jpg': 230 / 464,
  'imgs/democrat_3.1.jpg': 370 / 464,
  'imgs/democrat_3.2.jpg': 370 / 464,
  'imgs/democrat_4.1.jpg': 230 / 464,
  'imgs/democrat_4.2.jpg': 370 / 464,
  'imgs/democrat_5.1.jpg': 370 / 464,
  'imgs/democrat_5.2.jpg': 370 / 464,

  'imgs/democrat_-1.1.jpg': 230 / 464,
  'imgs/democrat_-1.2.jpg': 370 / 464,
  'imgs/democrat_-2.1.jpg': 130 / 464,
  'imgs/democrat_-2.2.jpg': 230 / 464,
  'imgs/democrat_-3.1.jpg': 230 / 464,
  'imgs/democrat_-3.2.jpg': 230 / 464,
  'imgs/democrat_-4.1.jpg': 230 / 464,
  'imgs/democrat_-4.2.jpg': 130 / 464,
  'imgs/democrat_-5.1.jpg': 230 / 464,
  'imgs/democrat_-5.2.jpg': 230 / 464,

  'imgs/republican_1.1.jpg': 370 / 464,
  'imgs/republican_1.2.jpg': 370 / 464,
  'imgs/republican_2.1.jpg': 370 / 464,
  'imgs/republican_2.2.jpg': 230 / 464,
  'imgs/republican_3.1.jpg': 370 / 464,
  'imgs/republican_3.2.jpg': 230 / 464,
  'imgs/republican_4.1.jpg': 230 / 464,
  'imgs/republican_4.2.jpg': 370 / 464,
  'imgs/republican_5.1.jpg': 370 / 464,
  'imgs/republican_5.2.jpg': 230 / 464,

  'imgs/republican_-1.1.jpg': 370 / 464,
  'imgs/republican_-1.2.jpg': 370 / 464,
  'imgs/republican_-2.1.jpg': 230 / 464,
  'imgs/republican_-2.2.jpg': 230 / 464,
  'imgs/republican_-3.1.jpg': 230 / 464,
  'imgs/republican_-3.2.jpg': 130 / 464,
  'imgs/republican_-4.1.jpg': 230 / 464,
  'imgs/republican_-4.2.jpg': 370 / 464,
  'imgs/republican_-5.1.jpg': 230 / 464,
  'imgs/republican_-5.2.jpg': 230 / 464
}

PostExpDarkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};
//PostExpDarkAd.contextType = this.props.target;

export default withStyles(styles)(PostExpDarkAd);

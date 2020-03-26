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

import ComponentsStyles from '../../App.module.css';
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
    super(props, '/target-ad');
    this.state = {
      slogan: 'Americans protect their own',
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
      imgLoaded: false
    };
  }

  async componentDidMount() {
    /*
    const user = await this.props.userSession.ensure(this.context, ['name', 'login',
      'age', 'adIssue', 'gender', 'name', 'traits', 'virtue', 'target']);
    let images = user.target.influences[user.adIssue].images;
    this.setState({
      images: images,
      issue: user.adIssue,
      target: this.props.userSession.oceanData(user.target, user.adIssue),
      slogans: user.target.influences[user.adIssue].slogans,
      imgLoaded: true
    });

    */

  }

  handleNextPage = (e) => {
    e.preventDefault();
    this.setState({
      pageOne: { display: 'none' },
      pageTwo: { display: 'block' }
    });
  }

  render() {
    const { classes } = this.props;
    const { slogan, sloganY, pageTwo } = this.state;
    const { target, issue, image, defaultImg } = this.state;
  //  const btnEnabledPg1 = (!defaultImg && slogan.length);
//    const redimg = /imgs/ + 'darkadred.png';
    const cimage = /imgs/ + issue + '.svg';

    return (
      <div className={classes.root + " postExpDarkAd"}>
      {/*
        <div style={pageOne}>
          <h1>Create Your Campaign</h1>
          <div className="split-half">
            <div className="split-left">
              <div className={classes.ad}>
                <img className={ComponentsStyles.adImage} src={image} alt="adbg"></img>
                <p style={slogan ? {
                  backgroundColor: 'red',
                  top: sloganY
                } : {
                    backgroundColor: 'none'
                  }}
                  className={ComponentsStyles.adText}>{slogan}
                </p>
                {!defaultImg ? <img className={classes.campaignImage} src={cimage} alt="campaign"
                  style={{ bottom: (sloganY === 370 ? 407 : 107) }}></img> : ''}
              </div>
            </div>
            <div className="split-right">
              <div>
                <p className="normal darkAdsubtitle">Select your image:</p>
                {images.map((img, i) => (
                  <img className={ComponentsStyles.adImageSelection}
                    style={{ visibility: (imgLoaded ? 'visible' : 'hidden') }}
                    src={img} alt={`adimg${i}`} key={`img${i}`}
                    onClick={() => {
                      this.setState({
                        image: img,
                        defaultImg: false,
                        sloganY: bannerOffsets[img]
                      });
                    }}
                  />
                ))}

              </div>
              <div>
                <p className="normal darkAdsubtitle">Select your slogan:</p>
                {slogans.map((slogan, i) => (
                  <Button
                    key={i}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      let nextState = { slogan };
                      if (defaultImg) nextState.image = redimg;
                      this.setState(nextState);
                    }}>
                    {slogan.split(' ').slice(0, 3).join(' ') + '...'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      */}
        <div style={pageTwo}>
          <h1 className="noSpacing"><br />Your targeted  <img src='/imgs/facebook.png'
            style={{ marginTop: 15, height: 100, position: 'relative', top: 30 }}
            alt="facebook" /> ad:</h1>
          <div className={classes.adPage2}>
            <img className='adImage' src={image} alt="bg"></img>
            <p style={slogan ? { backgroundColor: 'red', top: sloganY } : { backgroundColor: 'none' }}
              className={ComponentsStyles.adText}>{slogan}
            </p>
            {!defaultImg ? <img className={classes.campaignPage2} src={cimage} alt="bg"
              style={{ bottom: (sloganY === 370 ? 315 : 15) }}></img> : ''}
          </div>
          <p> Share with <span>{target.name}</span></p>

        </div>{
          /*
          <div className="link">
            <div style={pageOne}>
              <IconButton enabled={btnEnabledPg1}
                onClick={this.handleNextPage}
                className={ComponentsStyles.iconButtonStyle1}
                icon="next" text="Next" />
            </div>
            <div style={pageTwo}>
              <Link to="/success-ad" onClick={() => this.context.targetAd =
                { image: image, slogan: slogan }}>
                <div className={ComponentsStyles.buttonWrapper}>
                  <Button className="shareButton" variant="outlined" color="primary">
                    <img alt="shareIcon" src="./imgs/shareIcon.svg" /><strong>Share</strong>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          */
        }

      </div>
    );
  }
}
/*
const bannerOffsets = {
  'imgs/democrat_1.1.jpg': 230,
  'imgs/democrat_1.2.jpg': 370,
  'imgs/democrat_2.1.jpg': 230,
  'imgs/democrat_2.2.jpg': 230,
  'imgs/democrat_3.1.jpg': 370,
  'imgs/democrat_3.2.jpg': 370,
  'imgs/democrat_4.1.jpg': 230,
  'imgs/democrat_4.2.jpg': 370,
  'imgs/democrat_5.1.jpg': 370,
  'imgs/democrat_5.2.jpg': 370,

  'imgs/democrat_-1.1.jpg': 230,
  'imgs/democrat_-1.2.jpg': 370,
  'imgs/democrat_-2.1.jpg': 130,
  'imgs/democrat_-2.2.jpg': 230,
  'imgs/democrat_-3.1.jpg': 230,
  'imgs/democrat_-3.2.jpg': 230,
  'imgs/democrat_-4.1.jpg': 230,
  'imgs/democrat_-4.2.jpg': 130,
  'imgs/democrat_-5.1.jpg': 230,
  'imgs/democrat_-5.2.jpg': 230,

  'imgs/republican_1.1.jpg': 370,
  'imgs/republican_1.2.jpg': 370,
  'imgs/republican_2.1.jpg': 370,
  'imgs/republican_2.2.jpg': 230,
  'imgs/republican_3.1.jpg': 370,
  'imgs/republican_3.2.jpg': 230,
  'imgs/republican_4.1.jpg': 230,
  'imgs/republican_4.2.jpg': 370,
  'imgs/republican_5.1.jpg': 370,
  'imgs/republican_5.2.jpg': 230,

  'imgs/republican_-1.1.jpg': 370,
  'imgs/republican_-1.2.jpg': 370,
  'imgs/republican_-2.1.jpg': 230,
  'imgs/republican_-2.2.jpg': 230,
  'imgs/republican_-3.1.jpg': 230,
  'imgs/republican_-3.2.jpg': 130,
  'imgs/republican_-4.1.jpg': 230,
  'imgs/republican_-4.2.jpg': 370,
  'imgs/republican_-5.1.jpg': 230,
  'imgs/republican_-5.2.jpg': 230
}
*/
PostExpDarkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};
//PostExpDarkAd.contextType = this.props.target;

export default withStyles(styles)(PostExpDarkAd);

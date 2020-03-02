import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '../../Components/IconButton/IconButton';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import ComponentsStyles from '../../App.module.css';
import "./DarkAd.scss";

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

class DarkAd extends React.Component {
  constructor(props) {
    super(props, '/target-ad');
    this.state = {
      slogan: '',
      issue: '',
      images: ['', '', ''],
      slogans: ['', '', ''],
      pageDone: false,
      defaultImg: true,
      pageOne: { display: 'block' },
      pageTwo: { display: 'none' },
      target: UserSession.oceanData(),
      image: '/imgs/no_propaganda_bg.svg',
      sloganY: 230 // offset for slogan on image
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['adIssue', 'target']);
    let images = user.target.influences[user.adIssue].images;
    this.setState({
      images: images,
      issue: user.adIssue,
      target: UserSession.oceanData(user.target, user.adIssue),
      slogans: user.target.influences[user.adIssue].slogans
    });
  }

  handleNextPage(e) {
    e.preventDefault();
    this.setState({ pageOne: { display: 'none' }, pageTwo: { display: 'block' } })
  }

  render() {
    const { classes } = this.props;
    const { issue, images, slogans, target, defaultImg } = this.state;
    const redimg = UserSession.imageDir + 'darkadred.png';
    const cimage = UserSession.imageDir + issue + '.svg';
    const btnEnabledPg1 = (this.state.defaultImg !== true && this.state.slogan.length);

    console.log('SLOGANY: '+this.state.sloganY);
    return (
      <div className={classes.root + " darkAd"}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <OceanProfile target={target} />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <div style={this.state.pageOne}>
            <h1>Create Your Campaign</h1>
            <div className="split-half">
              <div className="split-left">
                <div className={classes.ad}>
                  <img className={ComponentsStyles.adImage} src={this.state.image} alt="adbg"></img>
                  <p style={this.state.slogan ? {
                      backgroundColor: 'red',
                      top: this.state.sloganY
                    } : {
                      backgroundColor: 'none'
                    }} className={ComponentsStyles.adText}>{this.state.slogan}
                  </p>
                  {!defaultImg ? <img className={classes.campaignImage} src={cimage} alt="campaign"
                    style={{ bottom: (this.state.sloganY===370 ? 407: 107)  }}></img> : ''}
                </div>
              </div>
              <div className="split-right">
                <div>
                  <p className="normal darkAdsubtitle">Select your image:</p>
                  {images.map((img, i) => (
                    <img className={ComponentsStyles.adImageSelection}
                      src={img} alt={`adimg${i + 1}`} key={`img${i + 1}`}
                      onClick={() => {
                        this.setState({
                          image: img,
                          defaultImg: false,
                          sloganY: bannerOffsets[img]
                        });
                        //console.log('sloganY', bannerOffsets, img, bannerOffsets[img] + 'px');
                      }}>
                    </img>
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
          <div style={this.state.pageTwo}>
            <h1 className="noSpacing"><br />Your targeted  <img src='/imgs/facebook.png'
              style={{ marginTop: 15, height: 100, position: 'relative', top: 30 }}
              alt="facebook" /> ad:</h1>
            <div className={classes.adPage2}>
              <img className={ComponentsStyles.adImage} src={this.state.image} alt="bg"></img>
              <p style={this.state.slogan ? { backgroundColor: 'red', top: this.state.sloganY } : { backgroundColor: 'none' }}
                className={ComponentsStyles.adTextPage2}>{this.state.slogan}
              </p>
              {!this.state.defaultImg ? <img className={classes.campaignPage2} src={cimage} alt="bg"
                style={{ bottom:(this.state.sloganY===370 ? 315:15)}}></img> : ''}
            </div>
            <p> Share with <span>{target.name}</span></p>
          </div>
          <div className="link">
            <div style={this.state.pageOne}>
              <IconButton enabled={btnEnabledPg1}
                onClick={e => this.handleNextPage(e)}
                className={ComponentsStyles.iconButtonStyle1}
                icon="next" text="Next" />
            </div>
            <div style={this.state.pageTwo}>
              <Link to="/success-ad" onClick={() => this.context.targetAd =
                { image: this.state.image, slogan: this.state.slogan }}>
                <div className={ComponentsStyles.buttonWrapper}>
                  <Button className="shareButton" variant="outlined" color="primary">
                    <img alt="shareIcon" src="./imgs/shareIcon.svg" /><strong>Share</strong>
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

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

DarkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};
DarkAd.contextType = UserSession;

export default withStyles(styles)(DarkAd);

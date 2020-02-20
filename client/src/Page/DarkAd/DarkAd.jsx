import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
    margin: '30px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
    width: '280px',
    height: '54px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: 0,
    textTransform: 'initial',
    fontSize: '24px',
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
    bottom: '13px',
    right: '0',
    width: '100px',
  },
  campaignImage: {
    position: 'absolute',
    bottom: '106px',
    right: '0',
    width: '100px',
  }
};

class DarkAd extends React.Component {
  constructor(props) {
    super(props, '/target-ad');
    this.state = {
      text: '',
      issue: '',
      images: ['', '', ''],
      slogans: ['', '', ''],
      defaultImageSelected: true,
      image: '/imgs/no_propaganda_bg.svg',
      pageDone: false,
      pageOne: { display: 'block' },
      pageTwo: { display: 'none' },
      target: UserSession.oceanData(),
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['adIssue', 'target']);
    this.setState({
      issue: user.adIssue,
      target: UserSession.oceanData(user.target),
      images: user.target.influences[user.adIssue].images,
      slogans: user.target.influences[user.adIssue].slogans
    });
  }

  handleNextPage(e) {
    e.preventDefault();
    this.setState({ pageOne: { display: 'none' }, pageTwo: { display: 'block' } })
    // if (btnEnabledPg1)) {
    // this.setState({ pageOne: { display: 'none' } })
    // this.setState({ pageTwo: { display: 'block' } })
    // }
  }

  render() {
    const { classes } = this.props;
    const { issue, images, slogans, target } = this.state;
    const redimg = UserSession.imageDir + 'darkadred.png';
    const cimage = UserSession.imageDir + 'vote-' + issue + '.svg';
    const btnEnabledPg1 = (this.state.defaultImageSelected !== true && this.state.text.length);
    //  const btnEnabledPg2 = btnEnabledPg1;
    //console.log(slogans);
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
                <div className={classes.ad}>    { /* adIssue should never change after being selected '*/}
                  <img className={ComponentsStyles.adImage} src={this.state.image} alt="leave"></img>
                  <p style={this.state.text ? { backgroundColor: 'red' } : { backgroundColor: 'none' }} className={ComponentsStyles.adText}>{this.state.text}</p>
                  {!this.state.defaultImageSelected ? <img className={classes.campaignImage} src={cimage} alt="leave"></img> : ''}
                </div>
              </div>
              <div className="split-right">
                <div>
                  <p className="normal darkAdsubtitle">Select your image:</p>
                  {images.map((image, i) => (
                    <img className={ComponentsStyles.adImageSelection} src={image} alt="leave" key={i}
                      onClick={() => this.setState({ image: image, defaultImageSelected: false })}></img>
                  ))}
                </div>
                <div>
                  <p className="normal darkAdsubtitle">Select your slogan:</p>
                  {slogans.map((slogan, i) => (
                    <Button className={classes.button} variant="contained" color="primary" key={i}
                      onClick={() => {
                        if (this.state.defaultImageSelected) this.setState({ image: redimg });
                        this.setState({ text: slogan });
                      }}>
                      {slogan.split(' ').slice(0, 2).join(' ') + '...'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={this.state.pageTwo}>
            <h1 className="noSpacing"><br />Your Targeted Facebook ad:</h1>
            <div className={classes.adPage2}>    { /* adIssue should never change after being selected '*/}
              <img className={ComponentsStyles.adImage} src={this.state.image} alt="leave"></img>
              <p style={this.state.text ? { backgroundColor: 'red' } : { backgroundColor: 'none' }} className={ComponentsStyles.adTextPage2}>{this.state.text}</p>
              {!this.state.defaultImageSelected ? <img className={classes.campaignPage2} src={cimage} alt="leave"></img> : ''}
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
                { image: this.state.image, slogan: this.state.text }}>
                <div className={ComponentsStyles.buttonWrapper}>
                  <Button className="shareButton" variant="contained" color="primary">
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

DarkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};
DarkAd.contextType = UserSession;

export default withStyles(styles)(DarkAd);

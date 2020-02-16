import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import UserSession from '../../Components/UserSession/UserSession';
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
    },
  },
  ad: {
    position: 'relative',
    margin: '0 auto',
    width: '642px',
    height: '570px',
  },

  campaignImage: {
    position: 'absolute',
    bottom: '106px',
    right: '0',
    width: '150px',
  },

};

class DarkAd extends React.Component {
  constructor(props) {
    super(props, '/target-ad');
    this.state = {
      text: '',
      issue: '',
      images: ['','',''],
      slogans: ['','',''],
      defaultImageSelected: true,
      image: '/imgs/darkad-default.png'
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, [ 'adIssue', 'target' ]);
    this.setState({
      issue: user.adIssue,
      images: user.target.influences[user.adIssue].images,
      slogans: user.target.influences[user.adIssue].slogans,
    });
  }

  render() {
    const { classes } = this.props;
    const { issue, images, slogans } = this.state;
    const redimg = UserSession.imageDir + 'darkadred.png';
    const cimage = UserSession.imageDir + 'vote-' + issue + '.png';
    //console.log(slogans);
    return (
      <div className={classes.root + " darkAd"}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
        <h1>Create Your Campaign</h1>
          <div className="split-half">
            <div className="split-left">
              <div className={classes.ad}>    { /* adIssue should never change after being selected '*/}
                <img className={ComponentsStyles.adImage} src={this.state.image} alt="leave"></img>
                <p style={this.state.text ? {backgroundColor: 'red'} : {backgroundColor: 'none'}} className={ComponentsStyles.adText}>{this.state.text}</p>
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
              <div className="link">
                <Link to="/target-ad" onClick={() => this.context.targetAd =
                  { image: this.state.image, slogan: this.state.text }}>
                  <IconButton enabled={(this.state.defaultImageSelected !== true && this.state.text.length)} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
                </Link>
              </div>
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

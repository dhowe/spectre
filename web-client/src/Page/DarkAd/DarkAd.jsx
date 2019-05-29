import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import image1 from './Leave_Migration_1.jpg';
import image2 from './Leave_Migration_2.jpg';
import image3 from './Leave_Migration_3.jpg';
import image4 from './Leave_Migration_4.jpg';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  image: {
    width: '20%'
  },
  button: {
    borderRadius: '28px',
    margin: '16px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
    width: '20%'
  },
  ad: {
    position: 'relative',
  },
  adImage: {
    width: '850px'
  },
  adText: {
    position: 'absolute',
    top: '40%',
    fontSize: '64px',
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    width: '100%'
  }
};

class darkAd extends React.Component {
  state = {
    image: image2,
    text: 'STOP THE INVASION'
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">Select Background Image:</Typography>
          <div>
            <img className={classes.image} src={image1} alt='leave' onClick={() => { this.setState({ image: image1 }) }}></img>
            <img className={classes.image} src={image2} alt='leave' onClick={() => { this.setState({ image: image2 }) }}></img>
            <img className={classes.image} src={image3} alt='leave' onClick={() => { this.setState({ image: image3 }) }}></img>
            <img className={classes.image} src={image4} alt='leave' onClick={() => { this.setState({ image: image4 }) }}></img>
          </div>
          <div className={classes.ad}>
            <img className={classes.adImage} src={this.state.image} alt='leave' onClick={() => { this.context.adIssue = 'leave' }}></img>
            <p className={classes.adText}>{this.state.text}</p>
          </div>
          <div>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.setState({ text: 'STOP THE INVASION' }) }}>
              STOP THE INVASION
          </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.setState({ text: 'TAKE BACK CONTROL' }) }}>
              TAKE BACK CONTROL
          </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.setState({ text: 'GO HOME!' }) }}>
              GO HOME!
          </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.setState({ text: 'OUR BORDERS, OUR JOBS' }) }}>
              OUR BORDERS, OUR JOBS
          </Button>
          </div>
          <Link to="/target-ad">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

darkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(darkAd);

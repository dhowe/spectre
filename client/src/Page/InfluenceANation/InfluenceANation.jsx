import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
//import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Styles from '../../Styles';
import colours from '../../colors.scss';
import Button from '@material-ui/core/Button';
//import Fade from '@material-ui/core/Fade';
import "./InfluenceANation.scss";
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import SpectrePage from '../SpectrePage';

const height = 53;
const fontSize = 22;

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  button: {
    ...Styles.button,
    color: colours.blue,
    borderColor: colours.blue,
    marginRight: 20,
    fontSize,
    height,
    display: 'inline-block',
    marginTop: '150px'
  },
};

class InfluenceANation extends SpectrePage {
  constructor(props) {
    super(props, '/consumer-data');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} InfluenceANation`}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
          <IdleChecker />
          <div className={`${classes.content} content`}>
              <Typography className="top"><strong>Influence a Nation</strong></Typography>
              <Typography className="middle">Let's amplify your campaign by convincing
              lots of others to vote {this.context.adIssue}.</Typography>
              <Typography className="semi-bold">We can show you how, but first, you must...</Typography>
              <Link to="/consumer-data">
                <Button className={classes.button}>Get more data!</Button>
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

InfluenceANation.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceANation.contextType = UserSession;

export default withStyles(styles)(InfluenceANation);

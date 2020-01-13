import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

//import colours from '../../colors.scss';
import './TakeBackControl.scss';

const styles = {

};

class TakeBackControl extends React.Component {
  constructor(props) {
    super(props, '/goodbye');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="copy">Take back control?</p>
          <p className="copy">Delete your data from Spectre’s system?</p>
          <div className={ComponentsStyles.buttonWrapper}>
            <Link to="/goodbye">
              <Button className={ComponentsStyles.button} variant="contained" color="primary" >Keep</Button>
            </Link>
            <Link to="/we-are-sorry">
              <Button className={ComponentsStyles.button} variant="contained" color="primary" >Delete</Button>
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TakeBackControl.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeBackControl.contextType = UserSession;

export default withStyles(styles)(TakeBackControl);

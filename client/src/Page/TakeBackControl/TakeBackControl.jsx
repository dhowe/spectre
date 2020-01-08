import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

//import colours from '../../colors.scss';
import './TakeBackControl.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },

  content: {
    justifyContent: 'center',
  },
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
          <Typography component="h5" variant="h5">Take back control? </Typography>
          <Typography component="h6" variant="h6">Delete your data from Spectre’s system?</Typography>
          <Grid className="take-back-control-buttons" container justify="center">
            <Grid item>
              <Link to="/goodbye">
                <Button className={classes.keepButton}>Keep</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/we-are-sorry">
                <Button className={classes.deleteButton}>Delete</Button>
              </Link>
            </Grid>
          </Grid>
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

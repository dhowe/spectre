import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class YourPower extends React.Component {
  render() {
    console.log('User:', this.context);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6">{this.context.name || 'Remy'}, your {this.context.virtue || 'Power'} is growing.</Typography>
              <Typography component="h6" variant="h6">Let's put it into practice.</Typography>
              <Link to="/pick-your-side">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

YourPower.propTypes = {
  classes: PropTypes.object.isRequired,
};
YourPower.contextType = UserSession;

export default withStyles(styles)(YourPower);

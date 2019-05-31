import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class WeHopeYouEnjoyed extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6">We hope you enjoyed your personalised experience.
               Please answer the following 3 questions truthfully:</Typography>
               {/* Add three questions here, only show one at a time */}
              <Link to="/customer-survey">
                  <IconButton icon="tick" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

WeHopeYouEnjoyed.propTypes = {
  classes: PropTypes.object.isRequired,
};
WeHopeYouEnjoyed.contextType = UserSession;

export default withStyles(styles)(WeHopeYouEnjoyed);

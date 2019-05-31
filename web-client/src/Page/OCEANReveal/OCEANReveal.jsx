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

class OCEANReveal extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="three" />
          <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">A little data and a little tech goes a long way, doesn't it? </Typography>
          <Typography component="h6" variant="h6">For example, we haven't known you very long, but already we know that [INSERT-DESC-HERE]</Typography>
              <Link to="/take-back-control">
                  {/* Next button brings up overlay video, then goes to take-back-control */}
                  <IconButton icon="next" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

OCEANReveal.propTypes = {
  classes: PropTypes.object.isRequired,
};
OCEANReveal.contextType = UserSession;

export default withStyles(styles)(OCEANReveal);

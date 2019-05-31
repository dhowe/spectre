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

class InfluenceACelebrity extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="three" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6">Spectre has many famous followers.</Typography>
              <Typography component="h6" variant="h6">Select a famous follower to hear their confession on {this.context.virtue}:</Typography>

              {/* Add Circle of Clickable Celebrity Images Here */}

              <Link to="/OCEAN-reveal">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

InfluenceACelebrity.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceACelebrity.contextType = UserSession;

export default withStyles(styles)(InfluenceACelebrity);

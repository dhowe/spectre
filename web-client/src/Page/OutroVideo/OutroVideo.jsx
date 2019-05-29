import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

class OutroVideo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              [video]
              <Link to="/goodbye">
                  <IconButton icon="tick" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

OutroVideo.propTypes = {
  classes: PropTypes.object.isRequired,
};
OutroVideo.contextType = UserSession;

export default withStyles(styles)(OutroVideo);

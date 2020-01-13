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

};

class AIIsTheFuture extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="three" />
          <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">AI is the future of data.</Typography>
          <Typography component="h6" variant="h6">Spectre can show you how to achieve true [power] </Typography>

              <Link to="/influence-a-celebrity">
                  <IconButton icon="next" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

AIIsTheFuture.propTypes = {
  classes: PropTypes.object.isRequired,
};
AIIsTheFuture.contextType = UserSession;

export default withStyles(styles)(AIIsTheFuture);

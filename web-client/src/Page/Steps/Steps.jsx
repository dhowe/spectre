import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PersonalisedExperience from '../PersonalisedExperience/PersonalisedExperience';
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

class Steps extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
          <SpectreHeader colour="white" />
          <div className={this.props.classes.content + " content"}>
              <Typography component="h5" variant="h5">Find what you are looking for by following these three steps:</Typography>
              <Typography component="h6" variant="h6"><strong>Step 1</strong> - influence a follower</Typography>
              <Typography component="h6" variant="h6"><strong>Step 2</strong> - influence a nation</Typography>
              <Typography component="h6" variant="h6"><strong>Step 3</strong> - influence a celebrity</Typography>
              <Typography component="h5" variant="h5">Get the data. Get the {this.context.virtue}.</Typography>
              <Typography component="h4" variant="h4">Ready?</Typography>
              <Link component={PersonalisedExperience} to="/personalised-experience">
                  <IconButton icon="next" text="Yes" />
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

Steps.propTypes = {
    classes: PropTypes.object.isRequired,
};
Steps.contextType = UserSession;

export default withStyles(styles)(Steps);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InsightGender from '../InsightGender/InsightGender';
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
};

class SelectedAvatar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
          <SpectreHeader colour="white" />
          <div className={styles.content + " content"}>
              <Typography component="h3" variant="h3">You selected {this.props.selectedFollower.name}</Typography>
              <Typography component="h4" variant="h4">Lets start by verifying some of the basics to unlock {this.context.virtueAsAdverb()} insights into {this.props.selectedFollower.name}. Don’t worry only you will see the results. </Typography>
              <Link component={InsightGender} to="/insight-hair">
                  <IconButton icon="next" text="DIVE IN" />
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

SelectedAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};
SelectedAvatar.contextType = UserSession;

export default withStyles(styles)(SelectedAvatar);

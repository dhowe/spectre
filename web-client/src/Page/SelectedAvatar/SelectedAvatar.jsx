import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class SelectedAvatar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">You selected {this.context.targetName}</Typography>
          <AvatarComponent target={{ image: this.context.imageUrl }}/>
          <Typography component="h6" variant="h6">Lets start by verifying some of the basics to unlock {this.context.virtueAsAdverb()} insights into {this.context.targetName}. </Typography>
          <Typography component="h6" variant="h6">Don’t worry, only you will see the results. </Typography>
          <Link to="/insight-gender">
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

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
    const target = this.context.getTarget();
    const tname = target.name || 'Targ';
    const pimg = this.context.targetImgUrl() || '/profiles/default.jpg';
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">You selected:</Typography>
          <AvatarComponent target={{ image: pimg }}/>
          <Typography component="h6" variant="h6"><strong>{tname}</strong></Typography>
          <Typography component="h6" variant="h6">Lets start by verifying some of the basics to unlock insight into {tname}. </Typography>
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

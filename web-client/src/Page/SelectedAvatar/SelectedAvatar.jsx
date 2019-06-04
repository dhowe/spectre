import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Styles from '../../Styles';
import colours from '../../colors.scss';

import "./SelectedAvatar.scss";

const height = 53;
const fontSize = 22;

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  content: {
    display: 'block',
  },
  button: {
    ...Styles.button,
    color: colours.blue,
    borderColor: colours.blue,
    marginRight: 20,
    fontSize,
    height,
    display: 'inline-block',
    marginTop: '0'
  },
};

class SelectedAvatar extends React.Component {
  render() {
    const { classes } = this.props;
    const target = this.context.getTarget();
    const tname = target.name || 'Targ';
    const pimg = this.context.targetImgUrl() || '/profiles/default.jpg';
    return (
      <div className={classes.root + " SelectedAvatar"}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
          <p className="title">You selected:</p>
          <div>
          <AvatarComponent target={{ image: pimg }}/>
          <p className="avatarName">{tname}</p>
          </div>
          <p className="copy">Lets start by verifying some of the basics to unlock insight into {tname}. </p>
          <p className="copy">Don’t worry, only you will see the results. </p>
          <Link to="/insight-gender">
            <Button className={classes.button}>Dive in</Button>
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

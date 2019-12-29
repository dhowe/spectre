import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Styles from '../../Styles';
import colours from '../../colors.scss';

import './SelectedAvatar.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const height = 53;
const fontSize = 22;

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
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
    marginTop: '0',
  },
};

class SelectedAvatar extends React.Component {
  constructor(props) {
    super(props, '/insight-gender');
  }

  render() {
    const { classes } = this.props;

    // TODO: working here next
    this.context.target = this.context.target || UserSession.defaultUsers[0];
    const timage = this.context.targetImgUrl();
    const tname = this.context.target.name;
    return (
      <div className={`${classes.root} SelectedAvatar`}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="title">You selected:</p>
          <div>
            <AvatarComponent target={ {name: tname, image: timage } } />
          </div>
          <p className="copy">Let&apos;s start by verifying some of the basics to unlock insight into <strong>{tname}</strong>. </p>
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
  history: PropTypes.object.isRequired,
};
SelectedAvatar.contextType = UserSession;

export default withStyles(styles)(SelectedAvatar);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderLogo from '../../Icons/headerlogo.svg';
import HeaderLogoColour from '../../Icons/headerlogo-colour.svg';
import Progress from '../Progress/Progress';
import Divider from '@material-ui/core/Divider';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';

import './SpectreHeader.scss';

const styles = {

};

class SpectreHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'Test',
      userImage: UserSession.profileDir + 'default.jpg'
    };
  }

  render() {
    const { userImage, userName } = this.state;
    return this.props.colour === "white" ?
      (
        <div className="SpectreHeader SpectreHeader-white">
          <img height="150" alt='header' src={HeaderLogoColour} />
          <Progress active={this.props.progressActive} progressNumber={this.props.progressNumber} />
          <Divider light />
        </div>
      ) : (
        <div className="SpectreHeader">
          <img height="150" alt='logo' src={HeaderLogo} />
          <AvatarComponent target={{ name: userName, image: userImage }} />
        </div>
      );
  }
}

SpectreHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpectreHeader);

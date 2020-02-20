import React from 'react';
import PropTypes from 'prop-types';
import HeaderLogo from '../../Icons/headerlogo.svg';
import HeaderLogoColour from '../../Icons/headerlogo-colour.svg';
import Progress from '../Progress/Progress';
import Divider from '@material-ui/core/Divider';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';

import { withStyles } from '@material-ui/core/styles';
import './SpectreHeader.scss';

const styles = {};

class SpectreHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Test',
      image: undefined,
      updatedAt: UserSession.epochDate
    };
  }

  async componentDidMount() { // tmp for testing webcam
    if (/(data-is|personalised|game)$/.test(window.location.pathname)) {
      let user = await UserSession.ensure(this.context, ['name', 'updatedAt', 'hasImage']);
      if (user) this.setState({
        name: user.name,
        image: UserSession.profileDir + user._id + '.jpg',
        updatedAt: user.updatedAt,
      });
    }
  }

  render() {
    const { image } = this.state;

    // tmp for testing webcam
    const avatar = image ? <AvatarComponent target={this.state} /> : '';

    return this.props.colour === "white" ?
      (
        <div className="SpectreHeader SpectreHeader-white">
          {avatar}
          <img height="150" alt='header' className='logo-img' src={HeaderLogoColour} />
          <Progress active={this.props.progressActive} progressNumber={this.props.progressNumber} />
          <Divider light />
        </div>
      ) : (
        <div className="SpectreHeader">
          <img height="150" alt='logo' className='logo-img' src={HeaderLogo} />
        </div>
      );
  }
}

SpectreHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
SpectreHeader.contextType = UserSession;

export default withStyles(styles)(SpectreHeader);

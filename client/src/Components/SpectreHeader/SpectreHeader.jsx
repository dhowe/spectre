import React from 'react';
import PropTypes from 'prop-types';
import HeaderLogo from '../../Icons/headerlogo.svg';
import HeaderLogoColour from '../../Icons/headerlogo-colour.svg';
import Progress from '../Progress/Progress';
import Divider from '@material-ui/core/Divider';
//import AvatarComponent from '../AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';

import { withStyles } from '@material-ui/core/styles';
import './SpectreHeader.scss';

import packageJson from '../../../package.json';
global.appVersion = packageJson.version;

const styles = {};

class SpectreHeader extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: '',
  //     image: undefined,
  //     updatedAt: UserSession.epochDate
  //   };
  // }
  //
  // componentDidMount() { // tmp for testing webcam
  //   if (/(data-is|personalised)$/.test(window.location.pathname)) {
  //     if (this.context && this.context._id && this.context.updatedAt) {
  //       this.setState({
  //         name: '',
  //         image: UserSession.profileDir + this.context._id + '.jpg',
  //         updatedAt: this.context.updatedAt,
  //       });
  //     }
  //     else {
  //       console.warn('No data for image', this.context);
  //     }
  //   }
  // }

  //resize = () => window.location.reload();
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }


  async componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  render() {
    //const { image } = this.state;

    // tmp for testing webcam
    //const avatar = image ? <AvatarComponent target={this.state} /> : '';
    const divider = this.props.noDivider ? '' : <Divider light />;
    return this.props.colour === "white" ?
      (
        <div className="SpectreHeader SpectreHeader-white">
          {/*<div style={{ position: 'absolute', color: 'black', top: 10, left: 20 }}>
            <p>{global.appVersion}</p>
          </div>*/}
          {/*{avatar}*/}
          <img height="150" alt='header' className='logo-img' src={HeaderLogoColour} />
          <Progress active={this.props.progressActive} progressNumber={this.props.progressNumber} />
          {divider}
        </div>
      ) : (
        <div className="SpectreHeader">
          {/*<div style={{ position: 'absolute', color: 'black', top: 10, left: 20 }}>
            <p>{global.appVersion}</p>
          </div>*/}
          <img height="150" alt='logo' className='logo-img' src={HeaderLogo} />
        </div>
      )
  };
}

SpectreHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
SpectreHeader.contextType = UserSession;

export default withStyles(styles)(SpectreHeader);

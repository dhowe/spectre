import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import BeginBackground from '../../Images/1_Standby_Screen_1080px_by_1620px.jpg';
import UserSession from '../../Components/UserSession/UserSession';

import './TouchToBegin.scss';

/*const styles_portrait = {
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundImage: `url(${BeginBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 300px',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};*/

const styles_landscape = {
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${BeginBackground})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

  },
  clickToContinue: {
      fontSize: '0.5rem'
  },

};

class TouchToBegin extends React.Component {

  constructor(props) {
    super(props, '/login');
  }
  render() {
    return (
      <div className={this.props.classes.root + ' touchToBegin'}>
        <SpectreHeader />
        <div className={`${this.props.classes.content} content`}>
          <Link className="touchToBegin-beginButton" to="/login">
            <div className={this.props.classes.clickToContinue}>
              <div className="beginLogo">
                <Logo />
              </div>
              <Typography>Touch to Begin!</Typography>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

TouchToBegin.propTypes = {
  classes: PropTypes.object.isRequired,
};
TouchToBegin.contextType = UserSession;


export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(TouchToBegin);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderLogo from '../../Icons/headerlogo.svg';
import HeaderLogoColour from '../../Icons/headerlogo-colour.svg';
import Progress from '../Progress/Progress';

import './SpectreHeader.scss';

const styles = {

};

function SpectreHeader(props) {
  return props.colour === "white" ? (
    <div className="SpectreHeader SpectreHeader-white">
      <img height="150" alt='header' src={HeaderLogoColour} />
      <Progress active={props.progressActive} progressNumber={props.progressNumber}/>
    </div>
  ) : (
      <div className="SpectreHeader">
        <img height="150" alt='logo' src={HeaderLogo} />
      </div>
    );
}

SpectreHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpectreHeader);

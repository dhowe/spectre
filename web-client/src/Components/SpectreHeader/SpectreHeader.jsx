import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeaderLogo from '../../Icons/headerlogo.svg';
import HeaderLogoColour from '../../Icons/headerlogo-colour.svg';

import './SpectreHeader.scss';

const styles = {
    
};

function SpectreHeader(props) {
    const { classes } = props;
    return props.colour == "white" ? (
        <div className="SpectreHeader SpectreHeader-white">
          <img src={HeaderLogoColour} />
        </div>
      ) : (
        <div className="SpectreHeader">
          <img src={HeaderLogo} />
        </div>
      );      
}

SpectreHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpectreHeader);

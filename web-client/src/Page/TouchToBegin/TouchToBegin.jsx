import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Logo from "../../Components/Logo/Logo";
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import BeginBackground from '../../Images/1_Standby_Screen_1080px_by_1620px.jpg';

import './TouchToBegin.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundImage: 'url(' + BeginBackground + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 300px',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

function TouchToBegin(props) {
  const { classes } = props;
  return (
    <div className={classes.root + ' touchToBegin'}>
        <SpectreHeader />
        <div className={classes.content + " content"}>
            <Link className="touchToBegin-beginButton" to="/login">
                <div className={classes.clickToContinue}>
                    <div className="beginLogo">
                      <Logo></Logo>
                    </div>
                    <Typography>Touch to Begin!</Typography>
                </div>
            </Link>
        </div >
    </div >
  );
}

TouchToBegin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TouchToBegin);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Webcam from "react-webcam";
import './VideoTest.scss'

const styles = {

};

function VideoTest(props) {
  const { classes } = props;
  return (
    <div className='VideoTest'>
        <Webcam />
        <Link to="/touch-to-begin">
            <div className={classes.clickToContinue}>
                <Typography>Touch to Begin</Typography>
            </div>
        </Link>
    </div >
  );
}

VideoTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoTest);

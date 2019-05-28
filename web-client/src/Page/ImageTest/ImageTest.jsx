import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserSession from '../../Components/UserSession/UserSession';
import { Link } from 'react-router-dom';

const styles = {};

class ImageTest extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <img src="http://localhost:3000/profiles/44798135.68164672.jpg"/>
        <Link to='/believe-in-dataism'>
            <div className={classes.clickToContinue}>
                <Typography>Next</Typography>
            </div>
        </Link>
      </div >
    );
  }
}

ImageTest.propTypes = {
  classes: PropTypes.object.isRequired,
};
ImageTest.contextType = UserSession;

export default withStyles(styles)(ImageTest);

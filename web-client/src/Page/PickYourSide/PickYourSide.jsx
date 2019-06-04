import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class PickYourSide extends React.Component {
  render() {
    const { classes } = this.props;
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({ "id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } });
    }
    return (
      <div className={classes.root}>
          <OceanProfile subject={this.context.getTarget()} ></OceanProfile>
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6" style={{marginTop:'300px'}}>Choose a side:</Typography>
              <Link to="/campaign">
                  <img src="https://i.gyazo.com/1890ddef64e0bde795334a2e8564d3b1.png" alt='leave' onClick={() => { this.context.adIssue = 'leave' }}></img>
              </Link>
              <Link to="/campaign" style={{marginBottom:'100px'}}>
                  <img src="https://i.gyazo.com/de4447b86eac589133ad3ae0e399b5d4.png" alt='remain' onClick={() => { this.context.adIssue = 'remain' }}></img>
              </Link>
              <span/>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

PickYourSide.propTypes = {
  classes: PropTypes.object.isRequired,
};
PickYourSide.contextType = UserSession;

export default withStyles(styles)(PickYourSide);

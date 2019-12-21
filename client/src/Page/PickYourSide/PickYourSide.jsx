import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import QuickNav from '../QuickNav';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class PickYourSide extends QuickNav {
  constructor(props) {
    super(props, '/campaign');
  }

  render() {
    const { classes } = this.props;
    this.context.target = this.context.target || UserSession.defaults[0];
    const tname = this.context.target.name;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one"/>
        <div className={`${classes.content} content`}>
          <Typography component="h6" variant="h6" style={{ marginTop: '300px' }}>Persuade {tname} to:</Typography>
          <Link to="/campaign">
            <img src="/imgs/vote_leave.png" width={420} alt="leave"
                 onClick={() => { this.context.adIssue = 'leave'; }}></img>
          </Link>
          <Link to="/campaign" style={{ marginBottom: '100px' }}>
            <img src='/imgs/vote_remain.png' width={300} alt="remain"
                 onClick={() => { this.context.adIssue = 'remain'; }}></img>
          </Link>
          <span/>
        </div>
        <FooterLogo/>
      </div>
    );
  }
}

PickYourSide.propTypes = {
  classes: PropTypes.object.isRequired,
};
PickYourSide.contextType = UserSession;

export default withStyles(styles)(PickYourSide);

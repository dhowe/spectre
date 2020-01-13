import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {

};

class PickYourSide extends React.Component {
  constructor(props) {
    super(props, '/campaign');
    this.state = { targetName: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'name', 'target']);
    this.setState({ targetName: user.target.name });
  }

  render() {
    const { classes } = this.props;
    const { targetName } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p>
            Persuade <strong>{targetName}</strong> to:
          </p>
          <Link to="/campaign">
            <img src="/imgs/vote_leave.png" width={420} alt="leave"
              onClick={() => { this.context.adIssue = 'leave'; }}></img>
          </Link>
          <Link to="/campaign" style={{ marginBottom: '100px' }}>
            <img src='/imgs/vote_remain.png' width={300} alt="remain"
              onClick={() => { this.context.adIssue = 'remain'; }}></img>
          </Link>
          <span />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

PickYourSide.propTypes = {
  classes: PropTypes.object.isRequired,
};
PickYourSide.contextType = UserSession;

export default withStyles(styles)(PickYourSide);

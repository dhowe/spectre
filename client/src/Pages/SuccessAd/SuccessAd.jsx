import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import { ReactComponent as Trophy } from '../../Icons/trophy.svg';
import { Link } from 'react-router-dom';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import IconButton from '../../Components/IconButton/IconButton';

import ComponentsStyles from '../../App.module.css';
import './SuccessAd.scss';

const styles = {};

class SuccessAd extends React.Component {
  constructor(props) {
    super(props, '/influence-a-nation');
    this.timeout = -1;
    this.state = {
      adIssue: '',
      targetName: ''
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['adIssue', 'traits', 'target']);
    this.setState({
      adIssue: user.adIssue,
      targetName: user.target.name
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { classes } = this.props;
    const { adIssue, targetName } = this.state;
    return (
      <div className={`${classes.root} successAd`}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <Fade in timeout={1000}>
            <div>
              <h1 className="addSpacing"><span>Great work!</span></h1>
              <h2 className="copy bold">Your targeted ad was successful!</h2>
              <p className="thankyou-icon"><Trophy /></p>
              <p className="normal">
                <span>{targetName}</span> is now more likely to vote <span>{adIssue}</span> in the election.
              </p>
            </div>
          </Fade>
          <div className="link">
            <Link to="/influence-a-nation">
              <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

SuccessAd.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
SuccessAd.contextType = UserSession;

export default withStyles(styles)(SuccessAd);

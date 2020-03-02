import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import './PickYourSide.scss';

const styles = {};

class PickYourSide extends React.Component {
  constructor(props) {
    super(props, '/campaign');
    this.state = { target: UserSession.oceanData() };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, [ 'name', 'target' ]);
    this.setState({ target: UserSession.oceanData(user.target) });
  }

  render() {
    const { classes } = this.props;
    const { target } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <OceanProfile target={target} />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1>
            <br />
            Use <span>{target.name}'s OCEAN profile</span><br />
            to persuade <span>{target.objpron}</span> to vote:
          </h1>
          <div className="pickLink">

            <Link to="/campaign">
              <div className="RepublicanLogo">
                <img src="/imgs/republican.svg" alt="republican"
                  onClick={() => { this.context.adIssue = 'republican' }} />
                <h2><span>Republican</span></h2>
              </div>

            </Link>
            <Link to="/campaign">
              <div className="DemocratLogo">
                <img src='/imgs/democrat.svg' alt="democrat"
                  onClick={() => { this.context.adIssue = 'democrat' }} />
                <h2><span>Democrat</span></h2>
              </div>

            </Link>

          </div>

          <div className="pick-or">
            <h2>or</h2>
          </div>

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

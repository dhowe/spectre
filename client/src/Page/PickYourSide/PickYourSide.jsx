import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import './PickYourSide.scss';

const styles = {

};

class PickYourSide extends React.Component {
  constructor(props) {
    super(props, '/campaign');
    this.state = { targetName: '', pronoun: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, [/*'_id',*/ 'name', 'target']);
    this.setState({ targetName: user.target.name, pronoun: (user.target.gender === 'male' ? 'him' : 'her')  });
  }

  render() {
    const { classes } = this.props;
    const { targetName, pronoun } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1>
          <br/>
            Use <span>{targetName}'s OCEAN profile</span><br/>
            to persuade <span>{pronoun}</span> to vote:
          </h1>
          <div className="pickLink">

            <Link to="/campaign">
              <div className="RepublicanLogo">
                <img src="/imgs/RepublicanLogo.svg" alt="leave"
                  onClick={() => { this.context.adIssue = 'leave' }}/>
                    <h2><span>Republican</span></h2>
              </div>

            </Link>
            <Link to="/campaign">
              <div className="DemocratLogo">
                <img src='/imgs/DemocratLogo.svg' alt="remain"
                  onClick={() => { this.context.adIssue = 'remain'; }}/>
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

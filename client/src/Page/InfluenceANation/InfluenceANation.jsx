import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Button from '@material-ui/core/Button';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import "./InfluenceANation.scss";
import ComponentsStyles from '../../App.module.css';

const styles = {

};

class InfluenceANation extends React.Component {
  constructor(props) {
    super(props, '/consumer-data');
    this.state = { adIssue: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'adIssue']);
    this.setState({adIssue: user.adIssue});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} InfluenceANation`}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="copy"><strong>Influence a Nation</strong></p>
          <p className="copy">Let's amplify your campaign by convincing
              lots of others to vote <strong>{this.state.adIssue}</strong>.</p>
          <p className="copy">We can show you how, but first, you must...</p>
          <div className="link">
          <Link to="/consumer-data">
          <Button className={ComponentsStyles.blueBtn}>Get more data!</Button>
          </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceANation.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceANation.contextType = UserSession;

export default withStyles(styles)(InfluenceANation);

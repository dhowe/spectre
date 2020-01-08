import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Button from '@material-ui/core/Button';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import "./InfluenceANation.scss";

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
          <Typography className="top"><strong>Influence a Nation</strong></Typography>
          <Typography className="middle">Let's amplify your campaign by convincing
              lots of others to vote <strong>{this.state.adIssue}</strong>.</Typography>
          <Typography className="semi-bold">We can show you how, but first, you must...</Typography>
          <Link to="/consumer-data">
            <Button className="blueBtn">Get more data!</Button>
          </Link>
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

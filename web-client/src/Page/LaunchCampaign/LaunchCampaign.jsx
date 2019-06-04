import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link,Redirect } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
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

class LaunchCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toNext: false };
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to="/referendum-results" />;
    }
  }
  render() {
    const { classes } = this.props;
    const launchImg = '/imgs/vote-' + (this.context.adIssue || 'remain') + '.png';
    return (
      <div className={classes.root}>
          {this.renderRedirect()}
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6" style={{marginTop:'300px'}}>Launch Campaign!</Typography>
              <Link to="/targets-found" style={{marginBottom:'500px'}}>
                  <img className={classes.image} src={launchImg} alt='launch capmpaign'
                   onClick={() => { this.setState({ toNext: true }) }}></img>
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

LaunchCampaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
LaunchCampaign.contextType = UserSession;

export default withStyles(styles)(LaunchCampaign);

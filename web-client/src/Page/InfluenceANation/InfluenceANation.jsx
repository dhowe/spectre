import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
//import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import GetMoreDataButton from '../../Icons/Get_more_data_button.svg';
//import Fade from '@material-ui/core/Fade';
import "./InfluenceANation.scss";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class InfluenceANation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + "InfluenceANation"}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
          <div className={classes.content + " content"}>
              <Typography class="top"><strong>Influence a nation</strong></Typography>
              <Typography class="middle">Lets increase the {this.context.virtue||'influence'} of your campaign by convincing lots of people to vote {this.context.adIssue}.</Typography>
              <Typography class="semi-bold">We can show you how, but first, you must...</Typography>
              <Link to="/consumer-data">
                <img id="GetMoreDataButton" alt='Get more data' src={GetMoreDataButton} />
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

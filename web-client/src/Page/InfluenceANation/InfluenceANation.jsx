import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

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
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h3" variant="h3">Influence a nation</Typography>
              <Typography component="h4" variant="h4">Lets increase the {this.context.virtue||'influence'} of your campaign to convince lots of people to vote {this.context.adIssue} in the referendum.</Typography>
              <Typography component="h4" variant="h4">We can show you how, but first, you must...  get more DATA.</Typography>
              <Link to="/consumer-data">
                  <IconButton icon="next" text="Get more data" />
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

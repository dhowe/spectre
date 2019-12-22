import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectrePage from '../SpectrePage';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import { Link } from 'react-router-dom';

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

class Campaign extends SpectrePage {
  constructor(props) {
    super(props, '/dark-ad');
  }

  render() {
    const { classes } = this.props;
    this.context.adIssue = this.context.adIssue || 'leave';
    this.context.target = this.context.target || UserSession.defaults[0];
    const pron = this.context.target.gender === 'male' ? 'he' : 'she';
    //const poss = this.context.target.gender === 'male' ? 'him' : 'her';
    const infls = this.context.targetAdInfluences();
    const tname = this.context.target.name;
    const name = tname.ucf();

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Typography component="h6" variant="h6" style={{ marginTop: '100px'}}>
            Now use a simple design tool to create a targeted Facebook ad.
          </Typography>
          <Typography component="h6" variant="h6">
            {name}'s OCEAN profile shows that {pron} can be influenced by:
          </Typography>
          <Typography component="h6" variant="h6">
            <strong>Images</strong> that contain {infls[0]}
          </Typography>
          <Typography component="h6" variant="h6" style={{ marginBottom: '100px'}}>
            <strong>Slogans</strong> that contain {infls[1]}
          </Typography>
          <Link to="/dark-ad">
              <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
Campaign.contextType = UserSession;

export default withStyles(styles)(Campaign);

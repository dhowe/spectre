import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class Campaign extends NavigationHack {
  constructor(props) {
    super(props, '/dark-ad');
  }

  render() {
    const { classes } = this.props;
    console.log(this.context);
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({
        "id": "111111111111111111111111",
        "gender": "male",
        "name": "Remy",
        influences: ['A & B', 'X & Y'],
        "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 }
      });
    }

    const target = this.context.getTarget();
    const pron = target.gender === 'male' ? 'he' : 'she';
    const poss = target.gender === 'male' ? 'him' : 'her';
    const name = target.name.ucf();

    return (
      <div className={classes.root}>
          {/*<OceanProfile subject={this.context.getTarget()} ></OceanProfile>*/}
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6" style={{ marginTop: '170px'}}>
                Now use a simple design tool to create a targeted Facebook ad.
              </Typography>
              <Typography component="h6" variant="h6">
                {name}'s OCEAN profile shows that {pron} can be influenced by:
              </Typography>
              <Typography component="h6" variant="h6">
                <strong>Images</strong> that contain {target.influences[0]}
              </Typography>
              <Typography component="h6" variant="h6">
                <strong>Slogans</strong> that contain {target.influences[1]}
              </Typography>
              <Typography component="h6" variant="h6">
                Influence {poss}!
              </Typography>
              <Link to="/dark-ad">
                  <IconButton icon="next" text="Ready" />
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

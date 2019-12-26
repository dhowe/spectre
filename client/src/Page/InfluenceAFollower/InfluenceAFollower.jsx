import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import User from '../../Components/User/User';

import './InfluenceAFollower.scss';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const styles = {
  root: {
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  glow: {
    color: '#ffd700',
  },
  content: {
    display: 'block',
  }
};

class InfluenceAFollower extends React.Component {

  constructor(props) {
    super(props, '/selected-avatar');
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const user = this.context || new User();
    // eslint-disable-next-line no-underscore-dangle
    if (typeof user === 'undefined') { // TMP
      user.name = user.name || 'Barney';
      user.loginType = user.loginType || 'email';
      user.login = user.login || `Barney${+new Date()}@aol.com`;
      //UserSession.create(user);
    }
  }

  handleSelect(target) {
    this.context.target = target;
    this.next();
  }

  renderSimilars() {
    let result = UserSession.defaults;
    const sims = this.context.similars;
    if (sims && sims.length) {
      console.log('using sims', sims);
      result = sims;
    }
    else {
      console.log('using defaults');
    }
    this.shuffle(result);
    result = result.slice(0, 6);
    //console.log(result);
    return result;
  }

  shuffle(arr) { // TODO: duplicated
    if (!arr) arr = [];
    arr.sort(() => Math.random() - 0.5);
    return arr;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} >
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <Typography component="h5" variant="h5" className="influence-a-follower"><strong>Influence a follower!</strong></Typography>
          <Typography component="p" variant="body1" className="community">Spectre has a global community of followers.</Typography>
          <Typography component="h5" variant="h5" className="choose-participant">Choose one:</Typography>
          <AvatarCircle>
            {this.renderSimilars().map((sim, i) => (
              <AvatarComponent
                handleClick={() => this.handleSelect(sim)}
                key={AvatarComponent.generateKey(i)}
                target={{ name: sim.name, image: `${User.profileDir}/${sim._id}.jpg` }}
              />
            ))}
         </AvatarCircle>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceAFollower.propTypes = {
  classes: PropTypes.object.isRequired,
};

InfluenceAFollower.contextType = UserSession;

export default withStyles(styles)(InfluenceAFollower);

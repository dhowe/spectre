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
    this.state = {similars: []};
  }

  componentDidMount() {
    console.log('componentDidMount');
    UserSession.ensure(this.context,
        ['_id', 'name', 'login', 'gender', 'virtue', 'traits', 'similars'],
        u => this.setState({similars: u.similars}));
  }

  handleSelect = (target) => {
    this.context.target = target;
    this.next();
  }

  renderSimilars() {
    // TODO: working here
    // const user = UserSession.validate
    //   (this.context, ['_id', 'name', 'login', 'gender', 'virtue', 'traits', 'similars']);
    return this.shuffle(this.state.similars.slice(0,7));
  }

  shuffle(arr) {
    let newArray = arr.slice(),
      len = newArray.length,
      i = len;
    while (i--) {
      let p = parseInt(Math.random() * len),
        t = newArray[i];
      newArray[i] = newArray[p];
      newArray[p] = t;
    }
    return newArray;
  }

  render() {
    return (
      <div className={this.props.root} >
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${this.props.content} content`}>
          <Typography component="h5" variant="h5" className="influence-a-follower"><strong>Influence a follower!</strong></Typography>
          <Typography component="p" variant="body1" className="community">Spectre has a global community of followers.</Typography>
          <Typography component="h5" variant="h5" className="choose-participant">Choose one:</Typography>
          <AvatarCircle>
            {this.renderSimilars().map((sim, i) => (
              <AvatarComponent
                key={AvatarComponent.generateKey(i)}
                handleClick={() => this.handleSelect(sim)}
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

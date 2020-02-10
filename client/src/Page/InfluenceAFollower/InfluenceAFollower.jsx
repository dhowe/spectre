import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import './InfluenceAFollower.scss';

const styles = {

};

class InfluenceAFollower extends React.Component {

  constructor(props) {
    super(props, '/selected');
    this.state = { similars: [] };
  }

  async componentDidMount() {
    let user = await UserSession.ensure(this.context,
      ['_id', 'name', 'login', 'gender', 'virtue', 'traits']);
    user = await UserSession.similars(user);
    this.setState({ similars: user.similars });
  }

  handleSelect = (target) => {
    this.context.target = target;
    this.context.targetId = target._id;
    this.props.history.push('/selected');
  }

  renderSimilars() {
    return this.state.similars.slice(0, 6);
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
    let { similars } = this.state;
    return (
      <div className={this.props.root} >
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${this.props.content} content`}>
        <div className="split-half">
          <div className="split-left">
            <p><strong>Influence a follower!</strong></p>
            <p className="smallText">Spectre has a global community of followers.</p>
          </div>
          <div className="split-right">
            <p className="smallText">Choose one:</p>
            <AvatarCircle>
              {similars.slice(0, 6).map((sim, i) => (
                <AvatarComponent
                  //key={AvatarComponent.generateKey(i)}
                  key={i}
                  handleClick={() => this.handleSelect(sim)}
                  target={{ name: sim.name, image: `${UserSession.profileDir}/${sim._id}.jpg` }}
                />
              ))}
            </AvatarCircle>
          </div>
          </div>
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

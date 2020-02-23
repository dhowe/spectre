import React from 'react';
import PropTypes from 'prop-types';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import './InfluenceAFollower.scss';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class InfluenceAFollower extends React.Component {

  constructor(props) {
    super(props, '/selected');
    this.state = { targets: [] };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'virtue', 'traits']);
    await UserSession.targets(user);
    this.setState({ targets: user.similars });
  }

  handleSelect = (target) => {
    const user = this.context;
    user.target = target;
    user.targetId = target._id;
    UserSession.computeInfluencesFor(target);
    UserSession.update(user);
    user.goto(this.props, '/selected');
  }

  render() {
    let { targets } = this.state;
    return (
      <div className={this.props.root} >
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${this.props.content} content`}>
          <h1><span><strong>Step 1</strong> - Influence a follower!</span></h1>
          <p className="normal-nextline"><br />Spectre has a global community of followers.</p>
          <p className="normal"><br />Choose one:</p>
          <AvatarCircle>
            {targets.map((t, i) => (
              <AvatarComponent key={i}
                handleClick={() => this.handleSelect(t)}
                target={{
                  name: t.name,
                  updatedAt: t.updatedAt,
                  image: UserSession.targetImage(t)
                }}
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

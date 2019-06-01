import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import './InfluenceAFollower.scss';

const styles = {
  root: {
    // flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  glow: {
    color: '#ffd700',
  },
};

const defaults = [
  { name: 'Remy', id: '111111111111111111111111' },
  { name: 'Bailey', id: '222222222222222222222222' },
  { name: 'Devin', id: '333333333333333333333333' },
  { name: 'Tyler', id: '444444444444444444444444' },
  { name: 'Fran', id: '555555555555555555555555' },
  { name: 'Pat', id: '666666666666666666666666' },
  { name: 'Sam', id: '777777777777777777777777' },
  { name: 'Reed', id: '888888888888888888888888' },
  { name: 'Terry', id: '999999999999999999999999' },
];

class InfluenceAFollower extends React.Component {
  static contextType = UserSession;
  static generateKey(index) {
    return (7 * index);
  }

  constructor(props) {
    super(props);
    this.state = { toNext: false };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillMount() {
    const user = this.context;
    // eslint-disable-next-line no-underscore-dangle
    if (typeof user === 'undefined' || typeof user._id === 'undefined') { // TMP
      user.name = user.name || 'Barney';
      user.loginType = user.loginType || 'email';
      user.login = user.login || `Barney${+new Date()}@aol.com`;
      UserSession.createUser(user);
    }
  }

  handleSelect(target) {
    this.context.targetId = target.id;
    this.context.targetName = target.name;
    this.setState({ toNext: true });
  }

  renderRedirect() {
    const { toNext } = this.state;

    if (toNext) {
      return <Redirect to="/selected-avatar" />;
    }
    return null;
  }

  renderSimilars() {
    let result = defaults;
    const { context } = this;
    const sims = context.getSimilars();
    if (sims && sims.length) {
      result = sims;
    }
    return result.slice(0,6);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderRedirect()}
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Typography component="h5" variant="h5" className="influence-a-follower"><strong>Influence a follower!</strong></Typography>
          <Typography component="p" variant="body1" className="community">Spectre has a global community of followers.</Typography>
          <Typography component="h5" variant="h5" className="choose-participant">Choose a participant:</Typography>
          <div className="follower-section">
            <div className="follower-circle">
              {this.renderSimilars().map((n, i) => (
                <AvatarComponent
                  handleClick={() => this.handleSelect(n)}
                  key={InfluenceAFollower.generateKey(i)}
                  target={{ name: n.name, image: `/profiles/${n.id}.jpg` }}
                />
              ))}
            </div>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceAFollower.propTypes = {
  classes: PropTypes.objectOf({}).isRequired,
};
//InfluenceAFollower.

export default withStyles(styles)(InfluenceAFollower);

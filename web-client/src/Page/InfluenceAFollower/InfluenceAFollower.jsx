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
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';

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

const defaults = [
  { "id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } },
  { "id": "222222222222222222222222", "name": "Bailey", "traits": { "openness": 0.10280703242247147, "conscientiousness": 0.6791763609042916, "extraversion": 0.6985730973994828, "agreeableness": 0.47335712795485274, "neuroticism": 0.32620076142720156 } },
  { "id": "333333333333333333333333", "name": "Devin", "traits": { "openness": 0.26472484195144963, "conscientiousness": 0.2892253599406023, "extraversion": 0.32397862254097665, "agreeableness": 0.8301260855442676, "neuroticism": 0.6126764672471925 } },
  { "id": "444444444444444444444444", "name": "Tyler", "traits": { "openness": 0.261833848989681, "conscientiousness": 0.19995491789138597, "extraversion": 0.6466838313828751, "agreeableness": 0.15648014141226163, "neuroticism": 0.37933032099722275 } },
  { "id": "555555555555555555555555", "name": "Fran", "traits": { "openness": 0.42866686430348433, "conscientiousness": 0.4582048165214141, "extraversion": 0.37864167613148236, "agreeableness": 0.40931183419981254, "neuroticism": 0.46558790819496987 } },
  { "id": "666666666666666666666666", "name": "Pat", "traits": { "openness": 0.7254487613475398, "conscientiousness": 0.3476980731832755, "extraversion": 0.9655087407390435, "agreeableness": 0.17024963297245255, "neuroticism": 0.6609212676018463 } },
  { "id": "777777777777777777777777", "name": "Sam", "traits": { "openness": 0.9725230338248465, "conscientiousness": 0.27205052534770147, "extraversion": 0.07632586533756269, "agreeableness": 0.15602596134535318, "neuroticism": 0.4848698832786795 } },
  { "id": "888888888888888888888888", "name": "Reed", "traits": { "openness": 0.2773518607894794, "conscientiousness": 0.8456532878428138, "extraversion": 0.4515471612661024, "agreeableness": 0.6249880747419794, "neuroticism": 0.6186244869965476 } },
  { "id": "999999999999999999999999", "name": "Terry", "traits": { "openness": 0.30426635874427355, "conscientiousness": 0.5341590821850326, "extraversion": 0.509056193557774, "agreeableness": 0.8109949037515642, "neuroticism": 0.4252958718086144 } }
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
    this.context.setTarget(target);
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
          <AvatarCircle>
            {this.renderSimilars().map((n, i) => (
              <AvatarComponent
                handleClick={() => this.handleSelect(n)}
                key={InfluenceAFollower.generateKey(i)}
                target={{ name: n.name, image: `/profiles/${n.id}.jpg` }}
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

export default withStyles(styles)(InfluenceAFollower);

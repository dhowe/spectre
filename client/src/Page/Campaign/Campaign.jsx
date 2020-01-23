import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import { Link } from 'react-router-dom';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {

};

class Campaign extends React.Component {
  constructor(props) {
    super(props, '/dark-ad');
    this.state = {
      targetName: '',
      targetInfluences: [],
      targetPronoun: ''
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['_id', 'name', 'adIssue', 'target', 'targetInfluences' ]);
    this.setState({
        targetName: user.target.name.ucf(),
        targetInfluences: user.targetInfluences,
        targetPronoun: (user.target.gender === 'male' ? 'he' : 'she')
      });
  }

  render() {
    const { classes } = this.props;
    let { targetInfluences, targetPronoun, targetName } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="copy">
            Now use a simple design tool to create a targeted Facebook ad.
          </p>
          <p className="copy-nextline">
            <strong>{targetName}</strong>'s OCEAN profile shows that {targetPronoun} can be influenced by:
          </p>
          <p className="copy-nextline">
            <strong>Images</strong> that contain {targetInfluences[0]}
          </p>
          <p className="copy">
            <strong>Slogans</strong> that contain {targetInfluences[1]}
          </p>
          <div className="link">
          <Link to="/dark-ad">
            <IconButton icon="next" text="Next" />
          </Link>
          </div>
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

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
import ComponentsStyles from '../../App.module.css';

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
      [/*'_id',*/ 'name', 'adIssue', 'target' ]);
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
          <h1 className="addSpacing">
            Create a targeted Facebook ad.
          </h1>
          <p className="normal-addSpacing">
            {targetName}'s <span>OCEAN profile</span> shows that {targetPronoun} can be influenced by:
          </p>
          <p className="normal-addSpacing">
            <span>Images</span> that contain {targetInfluences[0]}
          </p>
          <p className="normal-addSpacing">
            <span>Slogans</span> that contain {targetInfluences[1]}
          </p>
          <div className="link">
          <Link to="/dark-ad">
            <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
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

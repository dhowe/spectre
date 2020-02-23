import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import { Link } from 'react-router-dom';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import ComponentsStyles from '../../App.module.css';

const styles = {};

class Campaign extends React.Component {
  constructor(props) {
    super(props, '/dark-ad');
    this.state = {
      tname: '',
      themes: ['', ''],
      target: UserSession.oceanData(),
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'adIssue', 'target']);
    if (!user.target) throw Error('no target');
    this.setState({
      tname: user.target.name.ucf(),
      themes: user.target.influences[user.adIssue].themes,
      target: UserSession.oceanData(user.target),
    });
  }

  render() {
    const { classes } = this.props;
    let { themes, tname, target } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <OceanProfile target={target} />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1 className="addSpacing">
            Create a targeted <img src='/imgs/facebook.png' style={{'margin-top': 10, position: 'relative', top:15}} alt="facebook"/> ad.
          </h1>
          <p className="normal-addSpacing">
            {tname}'s <span>OCEAN profile</span> shows that {target.perspron} can be influenced by:
          </p>
          <p className="normal-addSpacing">
            <span>Images</span> that contain {themes[0]}
          </p>
          <p className="normal-addSpacing">
            <span>Slogans</span> that contain {themes[1]}
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

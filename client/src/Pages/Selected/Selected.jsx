import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '../../Components/IconButton/IconButton';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import ComponentsStyles from '../../App.module.css';

const styles = {};

class Selected extends React.Component {
  constructor(props) {
    super(props, '/insight-gender');
    this.state = {
      targetName: '',
      targetImage: UserSession.imageDir + 'default.jpg',
      targetUpdate: UserSession.epochDate
    };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'virtue', 'target']);
    this.setState({
      targetName: user.target.name,
      targetImage: UserSession.profileDir + user.targetImage(),
      targetUpdate: user.target.updatedAt
    })
  }

  render() {
    const { classes } = this.props;
    const { targetName, targetImage, targetUpdate } = this.state;
    return (
      <div className={`${classes.root} Selected`}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1>You selected:</h1>
          <div>
            <AvatarComponent target={{ name: targetName, image: targetImage, updatedAt: targetUpdate }} />
          </div>
          <p className="normal"><br />Let&apos;s start by verifying some of the basics to
            unlock<br /> insight into <span>{targetName}</span>. </p>
          <p className="normal"><br />Don’t worry, only you will see the results. </p>
          <div className="link">
            <Link to="/insight-gender">
              <IconButton enabled={true}
                className={ComponentsStyles.iconButtonStyle1}
                icon="tick" text="Dive in" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Selected.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Selected.contextType = UserSession;

export default withStyles(styles)(Selected);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
//import Countdown from 'react-countdown';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import ComponentsStyles from '../../App.module.css';

const styles = {};

class YourPower extends React.Component {

  constructor(props) {
    super(props, '/pick-your-side');
    this.state = {
      virtue: '',
      targetName: '',
      targetPronoun: '',
    }
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'gender', 'virtue', 'target']);
    this.setState({
      virtue: user.virtue,
      targetName: user.target.name,
      targetPronoun: UserSession.possPron(user.target)
    });
  }

  render() {

    const { classes } = this.props;
    const { virtue, targetName, targetPronoun } = this.state;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <h2>You now have the <span>{virtue}</span> to influence&nbsp;<span>{targetName}</span>.</h2>
          </Fade>
          <Fade in style={{ transitionDelay: '2000ms' }}>
            <h2>View <span>{targetName}'s OCEAN profile</span> to understand {targetPronoun} personality.</h2>
          </Fade>

          <Link to="/pick-your-side">
            <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

YourPower.propTypes = {
  classes: PropTypes.object.isRequired,
};
YourPower.contextType = UserSession;

export default withStyles(styles)(YourPower);

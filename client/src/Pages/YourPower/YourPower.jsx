import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
//import Countdown from 'react-countdown';
import Button from '@material-ui/core/Button';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import ComponentsStyles from '../../App.module.css';


const styles = {};

class YourPower extends React.Component {

  constructor(props) {
    super(props, '/pick-your-side');
    this.state = {
      virtue: '',
      activateProfile: false,
      target: UserSession.oceanData()
    }
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'virtue', 'target']);
    this.setState({
      virtue: user.virtue,
      target: UserSession.oceanData(user.target)
    });
  }

  handleActivateProfile() {
    this.setState({ activateProfile: true })
  }

  render() {

    const { classes } = this.props;
    const { virtue, target } = this.state;
    //console.log(this.state.activateProfile)

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        {this.state.activateProfile ? <OceanProfile target={ target }
          activateProfile={this.state.activateProfile} /> : null}
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms' }}>
            <h2>You now have the <span>{virtue}</span> to influence&nbsp;<span>{target.name}</span>.</h2>
          </Fade>
          <Fade in style={{ transitionDelay: '2000ms' }}>
            <h2 className="noSpacing">View <span>{target.name}'s OCEAN profile</span> to understand {target.pronoun} personality.</h2>
          </Fade>
          <Fade in={this.state.activateProfile} style={{ transitionDelay: '2000ms' }}>
            <Link to="/pick-your-side" style={this.state.activateProfile ? { visibility: 'visible' } : { visibility: 'hidden' }} >
              <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </Fade>
          <Fade in style={{ transitionDelay: '4000ms' }}>
            <div className={ComponentsStyles.buttonWrapper2} style={this.state.activateProfile ? { visibility: 'hidden' } : null}>
              <Button className={ComponentsStyles.button} variant="contained" color="primary"
                onClick={() => this.handleActivateProfile()}>Activate OCEAN profile</Button>
            </div>
          </Fade>
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

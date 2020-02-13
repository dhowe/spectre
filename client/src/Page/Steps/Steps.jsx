import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {
};

class Steps extends React.Component {
  constructor(props) {
    super(props, '/follower');
    this.state = { virtue: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['virtue', 'traits']);//, { update: true });
    this.setState({ virtue: user.virtue });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker setIdleTime={14} />
        <div className={classes.content + " content"}>
          <Fade in={true} >
            <h1>Find what you are looking for<br /> by following these three steps:</h1>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '1000ms' }}>
            <h2><strong>Step 1</strong> - influence a follower</h2>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '2000ms' }}>
            <h2><strong>Step 2</strong> - influence a nation</h2>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '3000ms' }}>
            <h2><strong>Step 3</strong> - influence a celebrity</h2>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '4000ms' }}>
            <h2 className="noSpacing">Get the data. Get the {this.state.virtue}.</h2>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '5000ms' }}>
            <h2 className="noSpacing"><span>Ready?</span></h2>
          </Fade>
          <div className="link">
            <Link to="/follower">
              <IconButton enabled={true} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
};
Steps.contextType = UserSession;

export default withStyles(styles)(Steps);

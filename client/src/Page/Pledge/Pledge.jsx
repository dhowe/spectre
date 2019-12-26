import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';


import colours from '../../colors.scss';
import './Pledge.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  strong: {
    color: colours.lightGrey,
    fontWeight: 500,
  },
};

class Pledge extends React.Component {
  constructor(props) {
    super(props, '/searching-for');
    this.state = { timeout: null };
  }

  componentDidMount() {
    //if (!this.context.name) this.context.name = 'Barney'; // TMP: remove
    const timeout = setTimeout(this.next, 7500);
    this.setState({ timeout });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div className="pledge">
            <Fade in timeout={1000}>
              <p className="copy">
                Welcome to the altar of&nbsp;
                <strong className={classes.strong}>Dataism.</strong>
              </p>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '2500ms' }}>
              <p className="copy">Our technologies can tell you things about yourself that you don’t know.</p>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '4500ms' }}>
              <p className="copy">In order for us to do this, first we need to get to know you a little bit.</p>
            </Fade>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Pledge.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Pledge.contextType = UserSession;

export default withStyles(styles)(Pledge);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
//import { Link } from 'react-router-dom';
//import IconButton from '../../Components/IconButton/IconButton';
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
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  componentDidMount() {
    if (!this.context.name) this.context.name = 'Barney'; // TMP: remove
  }

  goTo() {
    const { history } = this.props;
    history.push('/searching-for');
  }

  render() {
    setTimeout(this.goTo, 7500);
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

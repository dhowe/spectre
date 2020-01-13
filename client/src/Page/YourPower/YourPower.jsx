import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

const styles = {

};

class YourPower extends React.Component {

  constructor(props) {
    super(props, '/pick-your-side');
    this.state = { name: '', virtue: '' }
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['_id', 'name', 'login', 'gender', 'virtue']);
    this.setState({ name: user.name, virtue: user.virtue });
  }

  render() {

    const { classes } = this.props;
    const { name, virtue } = this.state;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Fade in style={{ transitionDelay: '200ms'}}>
            <p><strong>{name}</strong>, your {virtue} is growing </p>
          </Fade>
          <Fade in style={{ transitionDelay: '2000ms'}}>
            <p>Let's put it into practice.</p>
          </Fade>
          <Countdown
            onComplete={() => this.props.history.push('/pick-your-side')}
            date={Date.now() + 5000}
            renderer={() => null}
          />
        </div>
        <FooterLogo/>
      </div>
    );
  }
}

YourPower.propTypes = {
  classes: PropTypes.object.isRequired,
};
YourPower.contextType = UserSession;

export default withStyles(styles)(YourPower);

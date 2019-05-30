import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Countdown from 'react-countdown-now';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class InsightThankYou extends React.Component {
  goTo() {
    this.props.history.push('/insight-sexuality');
  }

  render() {
  const { classes } = this.props;
  const timer = ({ seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return null;
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
            <Typography component="h3" variant="h3">Great</Typography>
            <Typography component="h6" variant="h6">Now you are beginning to think like an algorithm.</Typography>
            <Typography component="h6" variant="h6">Just two more to go</Typography>
            <Countdown
              onComplete={this.goTo.bind(this)}
              date={Date.now() + 5000}
              renderer={timer}
            />
        </div>
        <FooterLogo />
    </div>
    );
  }
}

InsightThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightThankYou);

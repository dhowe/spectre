import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

function toAdjPhrase(virtue) {
  const content = {
    influence: 'To become more influencial',
    faith: 'To become more faithful',
    wealth: 'To become more wealthy',
    truth: 'To find more truth',
    power: 'To become more powerful',
  }
  return content[virtue]
}

class BelieveInDataism extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">{(toAdjPhrase(this.context.virtue)||"So")}, you need more data.</Typography>
          <Typography component="h6" variant="h6">We can help you believe in the {this.context.virtue} of dataism</Typography>
          <Link to="/steps">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

BelieveInDataism.propTypes = {
  classes: PropTypes.object.isRequired,
};
BelieveInDataism.contextType = UserSession;

export default withStyles(styles)(BelieveInDataism);

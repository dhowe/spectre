import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Steps from '../Steps/Steps';
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

function getContent(virtue) {
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
    return (
      <div className={this.props.classes.root}>
          <SpectreHeader colour="white" />
          <div className={this.props.classes.content + " content"}>
              <Typography component="h4" variant="h4">{getContent(this.context.virtue)}, you need more data.</Typography>
              <Typography component="h4" variant="h4">We can help you believe in the {this.context.virtue} of dataism</Typography>
              <Link component={Steps} to="/steps">
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

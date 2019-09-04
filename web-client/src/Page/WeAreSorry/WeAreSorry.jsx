import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import './WeAreSorry.scss';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class WeAreSorry extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
          <Typography className="username" component="h3" variant="h3" >We’re sorry {(this.context.name||'Remy')},<br/>
            <Typography className="normaltext" component="h3" variant="h3">we’re afraid you can’t do that.</Typography></Typography>
              <Link to="/goodbye" style={{ marginBottom: '270px'}}>
                  <IconButton icon="tick" text="Next" />
              </Link>
          </div >
          <FooterLogo />
      </div >
    );
  }
}

WeAreSorry.propTypes = {
  classes: PropTypes.object.isRequired,
};
WeAreSorry.contextType = UserSession;

export default withStyles(styles)(WeAreSorry);

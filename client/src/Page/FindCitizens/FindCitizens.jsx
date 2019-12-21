import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import QuickNav from '../QuickNav';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {

  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class FindCitizens extends QuickNav {
  constructor(props) {
    super(props, '/targets-found');
  }

  render() {
    const { classes } = this.props;
    let targetName = 'Remy';
    const user = this.context;
    if (user && user.getTarget) {
      const target = user.getTarget();
      if (target && target.name) {
        targetName = target.name;
      }
    }
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <div className={`${classes.content} content`}>
          <Typography component="h4" variant="h4"><strong>Excellent.</strong></Typography>
          <Typography component="h6" variant="h6">Now target UK citizens with a similar OCEAN profile to
            &nbsp;{targetName}!</Typography>
          <Typography component="h6" variant="h6">A silent army that could well tip the&nbsp;balance...</Typography>
          <Link to="/targets-found">
            <IconButton icon="next" text="Find them" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}
FindCitizens.contextType = UserSession;
FindCitizens.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindCitizens);

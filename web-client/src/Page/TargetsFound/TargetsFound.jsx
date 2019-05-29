import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  image: {
    height: '500px',
    width: '440px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

function TargetsFound(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
            <Typography component="h6" variant="h6">Analysing data sets and looking for patterns...</Typography>
            <Typography component="h6" variant="h6">Consumer..... Political........ Home........</Typography>
            <img className={classes.image} src="https://i.gyazo.com/2a4d9f74959da191656459877bb60d57.png" alt='targets' onClick={() => { this.context.adIssue = 'remain' }}></img>
            <Typography component="h3" variant="h3">Targets found: [1,095,405 ]</Typography>
            <Link to="/social-media">
                <IconButton icon="next" text="Next" />
            </Link>
        </div>
        <FooterLogo />
    </div>
  );
}

TargetsFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TargetsFound);

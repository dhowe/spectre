import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  },
  button: {
    borderRadius: '28px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    padding: '0 30% 25% 25%' //tmp
  },
  column: {
    flexDirection: 'column',
    display: 'flex',
  },
  icons: {
    marginBottom: "30px",
  }
};

function HomeData(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
            <SpectreHeader
        colour="white"
        progressActive={true}
        progressNumber="two"
      />
      <div className={classes.content + " content"}>
        <Typography component="h6" variant="h6">
          <strong>Choose 3 types of home data:</strong>
        </Typography>
          <div className="HomeDataIcons">
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButton enabled={false} icon="smartwatch" text="Smart Watch" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="wifi" text="Wifi Router" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="computers" text="Computers" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButton enabled={false} icon="mobile" text="Mobile Devices" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="smarttv" text="Smart TV" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="smartassistant" text="Smart Assistant" /></Grid>
              </Grid>
          </div>

          <Link to="/find-citizens" className="disabled">
            <IconButton enabled={false} icon="next" text="Next" />
          </Link>

      </div>
      <FooterLogo />
        </div >
  );
}

HomeData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeData);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  content: {
    paddingTop: "100px",
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
    paddingBottom: '500px'
  },
  column: {
    flexDirection: 'column',
    display: 'flex',
  }
};

function ConsumerData(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
            <Typography component="h3" variant="h3">Choose 5 types of data:</Typography>
            <Typography component="h3" variant="h3">CONSUMER DATA:</Typography>
            <div className={classes.row}>
                <div className={classes.column}>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Health
                        </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Finance
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Travel
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Biometrics
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Television
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            News and Magazines
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Store/Loyalty cards
                    </Button>
                    </Link>
                </div>
                <div className={classes.column}>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Vehicle GPS
                        </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Online Search History
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Shopping and Mail Order
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Location Data
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Spotify/iTunes
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Insurance
                </Button>
                    </Link>
                    <Link to="/political-data">
                        <Button className={classes.button} variant="contained" color="primary" >
                            Social Media
                </Button>
                    </Link>
                </div>
            </div>
        </div>
        <FooterLogo />
    </div>
  );
}

ConsumerData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsumerData);

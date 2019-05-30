import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import Button from '@material-ui/core/Button';

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
    padding: '0 30% 25% 25%' //tmp
  },
  column: {
    flexDirection: 'column',
    display: 'flex',
  }
};

function HomeData(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
            <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Last but not least</Typography>
                <Typography component="h3" variant="h3">HOME DATA:</Typography>
                <div className={classes.row}>
                    <div className={classes.column}>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart TV
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart fridge
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Wifi Router
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart Assistant
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Mobile Devices
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Computer
                    </Button>
                        </Link>
                    </div>
                    <div className={classes.column}>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Mobile Apps
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Thermostat
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart Watch
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Mobile Location Data
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart Home Hub
                    </Button>
                        </Link>
                        <Link to="/find-citizens">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Smart Lightbulbs
                    </Button>
                        </Link>
                    </div >
                </div >
            </div >
            <FooterLogo />
        </div >
  );
}

HomeData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeData);

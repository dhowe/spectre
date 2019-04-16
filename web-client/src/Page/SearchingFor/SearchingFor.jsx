import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DataIs from '../DataIs/DataIs'

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: '#F5FAFA',
        color: 'black'
    },
    content: {
        margin: "64px 0",
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function SearchingFor(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h6" variant="h5">Welcome [USERNAME]?</Typography>
                <Typography component="h6" variant="h5">What do you do out into the wilderness to behold?</Typography>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Power
                </Button>
                </Link>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Truth
                </Button>
                </Link>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Wealth
                </Button>
                </Link>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Knowledge
                </Button>
                </Link>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Faith
                </Button>
                </Link>
                <Link component={DataIs} to="/data-is">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Connection
                </Button>
                </Link>

            </div >

            <Footer>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Footer
                </Typography>
            </Footer>
        </div >
    );
}

SearchingFor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchingFor);

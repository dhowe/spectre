import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SearchingFor from '../SearchingFor/SearchingFor'

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

function Pledge(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h6" variant="h6">Spectre can help you in ways you don't expect. Spectre can see patterns you can't see.</Typography>
                <Typography component="h6" variant="h6">We can tell you things about yourself that you don't know.</Typography>
                <Typography component="h6" variant="h6">In order for you to know more, you must offer up something precious to you.</Typography>
                <Typography component="h6" variant="h5">Continue?</Typography>
                <Link component={SearchingFor} to="/searching-for">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Yes
                </Button>
                </Link>
                <Link component={SearchingFor} to="/searching-for">
                    <Button variant="contained" color="primary" className={classes.button}>
                        No
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

Pledge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pledge);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

function Steps(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h5" variant="h5">Follow our 3 simple steps to become more [powerful]</Typography>
                <Typography component="h6" variant="h6"><strong>Step 1</strong> - influence a follower</Typography>
                <Typography component="h6" variant="h6"><strong>Step 2</strong> - influence a nation</Typography>
                <Typography component="h6" variant="h6"><strong>Step 3</strong> - influence a politician of celebrity</Typography>
                <Typography component="h6" variant="h6"><strong>Step 4</strong> - influence evolution</Typography>
                <Typography component="h5" variant="h5">Get the data. Get the [power].</Typography>
                <Typography component="h4" variant="h4">Ready?</Typography>
                <Link component={Steps} to="/believe-in-dataism">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Maybe
                </Button>
                </Link>
                <Link component={Steps} to="/believe-in-dataism">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Yes
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

Steps.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Steps);

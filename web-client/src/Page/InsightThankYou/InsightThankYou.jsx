import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import InsightSexuality from '../InsightSexuality/InsightSexuality'

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        
        color: 'black'
    },
};

function InsightThankYou(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                </Typography>
            </Header>
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">InsightThankYou</Typography>
                <Link component={InsightSexuality} to="/insight-sexuality">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Next
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

InsightThankYou.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightThankYou);

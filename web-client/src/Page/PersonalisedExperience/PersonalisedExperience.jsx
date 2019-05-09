import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Game from '../Game/Game'

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
    glow: {
        color: '#ffd700'
    }
};

function PersonalisedExperience(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Excellent</Typography>
                <Typography component="h3" variant="h3">In order to create your</Typography>
                <Typography component="h3" variant="h3" className={classes.glow}><strong>personalised experience</strong></Typography>
                <Typography component="h4" variant="h4" >Tell us what you love, tell us what you hate...</Typography>
                <Link component={Game} to="/game">
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

PersonalisedExperience.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalisedExperience);

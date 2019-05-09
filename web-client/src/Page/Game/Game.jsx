import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ThankYou from '../ThankYou/ThankYou'
import P5Wrapper from 'react-p5-wrapper';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        
        color: 'black'
    },
    content: {
        paddingTop: "100px",
    },
};

function sketch(p) {
    let rotation = 0;

    p.setup = function () {
        p.createCanvas(600, 400, p.WEBGL);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation) {
            rotation = props.rotation * Math.PI / 180;
        }
    };

    p.draw = function () {
        p.background(100);
        p.noStroke();
        p.push();
        p.rotateY(rotation);
        p.box(100);
        p.pop();
    };
};

function Game(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h3" variant="h3">Game will go here</Typography>
                <P5Wrapper sketch={sketch} />
                <Link component={ThankYou} to="/thank-you">
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

Game.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);

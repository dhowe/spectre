import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Steps from '../Steps/Steps'
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent'
import Grid from '@material-ui/core/Grid';

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
    },
    glow: {
        color: '#ffd700'
    }
};

function InfluenceAFollower(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                </Typography>
            </Header>
            <div className={classes.content}>
                <Typography component="h3" variant="h3">Influence a follower!</Typography>
                <Typography component="h4" variant="h4" >Spectre has a community of devout followers willing to help you.</Typography>
                <Typography component="h5" variant="h5" >Choose one to influence</Typography>
                <Grid container justify="center" alignItems="center">
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                </Grid>
                <Link component={Steps} to="/steps">
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

InfluenceAFollower.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfluenceAFollower);

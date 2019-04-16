import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Video from "../../Components/Video/Video";
import { Link } from 'react-router-dom';
import Placeholder from '../Placeholder/Placeholder'

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundSize: 'cover',
        backgroundColor: '#F5FAFA',
    },
    content: {
        margin: "64px 0",
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function IntroVideo(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header>
                <Typography variant="h6" color="inherit" >
                    Header
                    </Typography>
            </Header>
            <div className={classes.content}>
                <Video></Video>
                <Link component={Placeholder} to="/placeholder">
                    <Typography>Skip</Typography>
                </Link>
            </div >

            <Footer>
                <Typography variant="h6" color="inherit">
                    Footer
                </Typography>
            </Footer>
        </div >
    );
}

IntroVideo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroVideo);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        color: 'black',
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

class OCEANReveal extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                <Typography component="h6" variant="h6">You've told us so much about yourself.</Typography>
                <Typography component="h6" variant="h6">We know you are the type of person that is X, Y, Z.</Typography>
                <Typography component="h6" variant="h6">We are going to make a video that will make you look [powerful]</Typography>
                    <Link to="/shallow-fake">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

OCEANReveal.propTypes = {
    classes: PropTypes.object.isRequired,
};
OCEANReveal.contextType = UserSession;

export default withStyles(styles)(OCEANReveal);

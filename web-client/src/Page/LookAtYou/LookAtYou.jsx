import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

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

class LookAtYou extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h4" variant="h4">LookAtYou</Typography>
                    <Link to="/OCEAN-reveal">
                        <img src="https://i.gyazo.com/1890ddef64e0bde795334a2e8564d3b1.png" alt='leave' ></img>
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

LookAtYou.propTypes = {
    classes: PropTypes.object.isRequired,
};
LookAtYou.contextType = UserSession;

export default withStyles(styles)(LookAtYou);

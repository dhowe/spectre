import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

class ShareOnSocialChoice extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h6" variant="h6">Share on social media?</Typography>
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/sharing-on-social-media">
                                <IconButton icon="tick" text="Yes" />
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/sharing-on-social-media">
                                <IconButton icon="next" text="No" />
                            </Link>
                        </Grid>
                    </Grid>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

ShareOnSocialChoice.propTypes = {
    classes: PropTypes.object.isRequired,
};
ShareOnSocialChoice.contextType = UserSession;

export default withStyles(styles)(ShareOnSocialChoice);

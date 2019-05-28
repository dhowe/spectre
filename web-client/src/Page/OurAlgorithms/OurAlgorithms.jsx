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

class OurAlgorithms extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                <Typography component="h6" variant="h6">Our algorithms know this type of content will make you more [powerful]</Typography>
                    <Link to="/share-on-social-choice">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

OurAlgorithms.propTypes = {
    classes: PropTypes.object.isRequired,
};
OurAlgorithms.contextType = UserSession;

export default withStyles(styles)(OurAlgorithms);

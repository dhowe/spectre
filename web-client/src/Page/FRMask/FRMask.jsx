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

class FRMask extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h4" variant="h4">FRMask</Typography>
                    <Link to="/generating-video">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

FRMask.propTypes = {
    classes: PropTypes.object.isRequired,
};
FRMask.contextType = UserSession;

export default withStyles(styles)(FRMask);

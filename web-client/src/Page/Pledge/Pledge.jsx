import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SearchingFor from '../SearchingFor/SearchingFor';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        color: 'black'
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

class Pledge extends React.Component {
    componentDidMount() {
        if (!this.context.name) this.context.name = 'Barney'; // TMP: remove
        console.log('User:', this.context);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h6" variant="h5">Welcome to the altar of dataism.</Typography>
                    <Typography component="h6" variant="h6">Our technologies can tell you things about yourself that you don’t know.</Typography>
                    <Typography component="h6" variant="h6">In order for us to do this, first we need to get to know you a little bit.</Typography>
                    <Link component={SearchingFor} to="/searching-for">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

Pledge.propTypes = {
    classes: PropTypes.object.isRequired,
};
Pledge.contextType = UserSession;

export default withStyles(styles)(Pledge);

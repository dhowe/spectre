import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

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

class PickASide extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h4" variant="h4">What’s your preference?</Typography>
                    <Link to="/campaign">
                        <img src="https://i.gyazo.com/1890ddef64e0bde795334a2e8564d3b1.png" alt='leave' onClick={() => { this.context.brexitChoice = 'leave' }}></img>
                    </Link>
                    <Link to="/campaign">
                        <img src="https://i.gyazo.com/de4447b86eac589133ad3ae0e399b5d4.png" alt='remain' onClick={() => { this.context.brexitChoice = 'remain' }}></img>
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

PickASide.propTypes = {
    classes: PropTypes.object.isRequired,
};
PickASide.contextType = UserSession;

export default withStyles(styles)(PickASide);

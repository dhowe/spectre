import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DataIs from '../DataIs/DataIs'
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        
        color: 'black'
    },
    content: {
        paddingTop: "100px",
    },
    clickToContinue: {
        margin: "20% 0",
    },
    button: {

        borderRadius: '28px',
        border: 'solid 3px #929391',
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        color: '#929391',
    },
    link: {
        display: 'block',
        marginBottom: '30px',
    }
};

function SearchingFor(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h6" variant="h5">Welcome [USERNAME]?</Typography>
                <Typography component="h6" variant="h5">What do you do out into the wilderness to behold?</Typography>
                <div>
                    <Link className={classes.link} component={DataIs} to="/data-is">
                        <Button variant="contained" color="primary" className={classes.button + ' spectreButton'} onClick={() => { props.set_key('virtue', 'power') }}>
                            Power
                        </Button>
                    </Link>
                    <Link className={classes.link} component={DataIs} to="/data-is">
                        <Button variant="contained" color="primary" className={classes.button + ' spectreButton'} onClick={() => { props.set_key('virtue', 'truth') }}>
                            Truth
                        </Button>
                    </Link>
                    <Link className={classes.link} component={DataIs} to="/data-is">
                        <Button variant="contained" color="primary" className={classes.button + ' spectreButton'} onClick={() => { props.set_key('virtue', 'wealth') }}>
                            Wealth
                        </Button>
                    </Link>
                    <Link className={classes.link} component={DataIs} to="/data-is">
                        <Button variant="contained" color="primary" className={classes.button + ' spectreButton'} onClick={() => { props.set_key('virtue', 'faith') }}>
                            Faith
                        </Button>
                    </Link>
                    <Link className={classes.link} component={DataIs} to="/data-is">
                        <Button variant="contained" color="primary" className={classes.button + ' spectreButton'} onClick={() => { props.set_key('virtue', 'influence') }}>
                            Influence
                        </Button>
                    </Link>
                </div>
            </div>
            <FooterLogo />
        </div>
    );
}

SearchingFor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchingFor);

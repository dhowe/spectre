import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import DataIs from '../DataIs/DataIs'
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

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
    }
};

class SearchingFor extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <SpectreHeader colour="white" />
                <div className={styles.content + " content"}>
                    <Typography component="h6" variant="h5">Welcome [USERNAME]?</Typography>
                    <Typography component="h6" variant="h5">What do you do out into the wilderness to behold?</Typography>
                    <div>
                        <Link component={DataIs} to="/data-is">
                            <Button variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                                Power
                        </Button>
                        </Link>
                        <Link component={DataIs} to="/data-is">
                            <Button variant="contained" color="primary" onClick={() => { this.context.virtue = 'truth' }}>
                                Truth
                        </Button>
                        </Link>
                        <Link component={DataIs} to="/data-is">
                            <Button variant="contained" color="primary" onClick={() => { this.context.virtue = 'wealth' }}>
                                Wealth
                        </Button>
                        </Link>
                        <Link component={DataIs} to="/data-is">
                            <Button variant="contained" color="primary" onClick={() => { this.context.virtue = 'faith' }}>
                                Faith
                        </Button>
                        </Link>
                        <Link component={DataIs} to="/data-is">
                            <Button variant="contained" color="primary" onClick={() => { this.context.virtue = 'influence' }}>
                                Influence
                        </Button>
                        </Link>
                    </div>
                </div>
                <FooterLogo />
            </div>
        );
    }
}


SearchingFor.propTypes = {
    classes: PropTypes.object.isRequired,
};

SearchingFor.contextType = UserSession;

export default withStyles(styles)(SearchingFor);

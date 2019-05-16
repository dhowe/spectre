import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PoliticalData from '../PoliticalData/PoliticalData'
import Button from '@material-ui/core/Button';
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

function ConsumerData(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Choose 5 types of data:</Typography>
                <Typography component="h3" variant="h3">CONSUMER DATA:</Typography>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Health
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Finance
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Travel
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Biometrics
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Television
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        News and Magazines
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Store/Loyalty cards
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Vehicle GPS
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Online Search History
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Shopping and Mail Order
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Location Data
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Spotify/iTunes
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Insurance
                    </Button>
                </Link>
                <Link component={PoliticalData} to="/political-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                        Social Media
                    </Button>
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

ConsumerData.propTypes = {
    classes: PropTypes.object.isRequired,
};
ConsumerData.contextType = UserSession;

export default withStyles(styles)(ConsumerData);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import HomeData from '../HomeData/HomeData'
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

function PoliticalData(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Choose 5 more!</Typography>
                <Typography component="h3" variant="h3">POLITICAL DATA:</Typography>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Voting Records' }}>
                        Voting Records
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Finance' }}>
                        Finance
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Data Brokers' }}>
                        Data Brokers
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Online Maps' }}>
                        Online Maps
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Political Party Member' }}>
                        Political Party Member
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Polls and Surveys' }}>
                        Polls and Surveys
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Political Consultants' }}>
                        Political Consultants
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Satellite Imagery' }}>
                        Satellite Imagery
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Group memberships' }}>
                        Group memberships
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Internet platforms' }}>
                        Internet platforms
                    </Button>
                </Link>
                <Link component={HomeData} to="/home-data">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.dataChoices.political = 'Government data sets' }}>
                        Government data sets
                    </Button>
                </Link>

            </div>
            <FooterLogo />
        </div>
    );
}

PoliticalData.propTypes = {
    classes: PropTypes.object.isRequired,
};
PoliticalData.contextType = UserSession;

export default withStyles(styles)(PoliticalData);

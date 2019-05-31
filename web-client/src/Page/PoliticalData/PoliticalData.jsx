import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
    },
    row: {
        flexDirection: 'row',
        display: 'flex',
        padding: '0 30% 25% 25%' //tmp
    },
    column: {
        flexDirection: 'column',
        display: 'flex',
    }
};

function PoliticalData(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Choose 5 more!</Typography>
                <Typography component="h3" variant="h3">POLITICAL DATA:</Typography>
                <div className={classes.row}>
                    <div className={classes.column}>

                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Voting Records
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Finance
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Data Brokers
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Online Maps
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Political Party Member
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Polls and Surveys
                    </Button>
                        </Link>
                    </div>
                    <div className={classes.column}>

                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary" >
                                Political Consultants
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary">
                                Satellite Imagery
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary">
                                Group memberships
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary">
                                Internet platforms
                    </Button>
                        </Link>
                        <Link to="/home-data">
                            <Button className={classes.button} variant="contained" color="primary">
                                Government data sets
                    </Button>
                        </Link>
                    </div>
                </div>
            </div >
            <FooterLogo />
        </div >
    );
}

PoliticalData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PoliticalData);

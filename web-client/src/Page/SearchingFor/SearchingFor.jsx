import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
        margin: '16px',
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

class SearchingFor extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h6" variant="h5">Welcome {this.context.name}</Typography>
                    <Typography component="h6" variant="h5">What are you searching for today?</Typography>
                    <div>
                        <Link to="/data-is">
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'power' }}>
                                Power
                        </Button>
                        </Link>
                        <Link to="/data-is">
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'truth' }}>
                                Truth
                        </Button>
                        </Link>
                        <Link to="/data-is">
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'wealth' }}>
                                Wealth
                        </Button>
                        </Link>
                        <Link to="/data-is">
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.context.virtue = 'influence' }}>
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

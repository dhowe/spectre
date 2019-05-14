import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import BelieveInDataism from '../BelieveInDataism/BelieveInDataism';
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

class DataIs extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <SpectreHeader colour="white" />
                <div className={styles.content + " content"}>
                    <Typography component="h4" variant="h4">DATA IS {this.context.virtue.toUpperCase()}</Typography>
                    <Link component={BelieveInDataism} to="/believe-in-dataism">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div>
                <FooterLogo />
            </div>
        );
    }
}

DataIs.propTypes = {
    classes: PropTypes.object.isRequired,
};

DataIs.contextType = UserSession;

export default withStyles(styles)(DataIs);

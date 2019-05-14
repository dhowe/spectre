import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ConsumerData from '../ConsumerData/ConsumerData'
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
};

class InfluenceANation extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <SpectreHeader colour="white" />
                <div className={styles.content + " content"}>
                    <Typography component="h3" variant="h3">Influence A Nation</Typography>
                    <Typography component="h4" variant="h4">Lets increase the {this.context.virtue} of your campaign to influence lots of people to vote [Leave] in the referendum.</Typography>
                    <Typography component="h4" variant="h4">We can show you how, but first, you must:</Typography>
                    <Link component={ConsumerData} to="/consumer-data">
                        <IconButton icon="next" text="Get more data" />
                    </Link>
                </div>
                <FooterLogo />
            </div>
        );
    }
}

InfluenceANation.propTypes = {
    classes: PropTypes.object.isRequired,
};
InfluenceANation.contextType = UserSession;
export default withStyles(styles)(InfluenceANation);

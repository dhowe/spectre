import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IntroOceanVideo from '../IntroOceanVideo/IntroOceanVideo';
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

class InsightComplete extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <SpectreHeader colour="white" />
                <div className={styles.content + " content"}>
                    <Typography component="h3" variant="h3">Congratulations {this.context.name} </Typography>
                    <Typography component="h3" variant="h3">Verification complete. </Typography>
                    <IconButton icon="next" />
                    <Typography component="h4" variant="h4">Our new behavioural products can create {this.context.adverb()} insights</Typography>
                    <Typography component="h4" variant="h4">As a reward for your belief in the {this.context.virtue} of data, we can share:</Typography>
                    <Typography component="h4" variant="h4">{this.props.selectedFollower.name}’s OCEAN profile</Typography>
                    <Link component={IntroOceanVideo} to="/intro-ocean-video">
                        <IconButton icon="next" text="WTF is OCEAN?" />
                    </Link>
                </div>
                <FooterLogo />
            </div >
        );
    }
}

InsightComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};
InsightComplete.contextType = UserSession;
export default withStyles(styles)(InsightComplete);

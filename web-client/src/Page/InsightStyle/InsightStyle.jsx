import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import InsightThankYou from '../InsightThankYou/InsightThankYou';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",

        color: 'black'
    },
};

class InsightStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: 'woman',
        };
    };
    handleRadioChange = event => {
        this.setState({ style: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h4" variant="h4">What’s {this.props.selectedFollower.name}‘s likely style category?</Typography>
                    <FormControl component="fieldset" >
                        <RadioGroup
                            aria-label="Style"
                            name="style"
                            value={this.state.value}
                            onChange={this.handleRadioChange}
                        >
                            <FormControlLabel value="classic" control={<Radio />} label="Classic - conservative and traditional " />
                            <FormControlLabel value="feminine" control={<Radio />} label="Feminine - soft, romantic, delicate" />
                            <FormControlLabel value="creative" control={<Radio />} label="Creative - creative, unique, fashionable " />
                            <FormControlLabel value="sporty" control={<Radio />} label="Sporty - casual, practical, easy " />
                            <FormControlLabel value="bold" control={<Radio />} label="Bold - eccentric, bold, theatrical" />
                        </RadioGroup>
                    </FormControl>
                    <Link component={InsightThankYou} to="/insight-thank-you">
                        <IconButton icon="next" text="Next" />
                    </Link>
                </div>
                <FooterLogo />
            </div>
        );
    }
}

InsightStyle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightStyle);

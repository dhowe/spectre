import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        color: 'black'
    },
    radioGroup: {
        alignItems: 'center'
    }
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
                    <AvatarComponent target={{ image: '/targets/target0.png' }} />
                    <FormControl className={classes.formControl} component="fieldset" >
                        <RadioGroup
                            aria-label="Style"
                            name="style"
                            value={this.state.value}
                            onChange={this.handleRadioChange}
                            className={classes.radioGroup}
                        >
                            <FormControlLabel value="classic" control={<Radio color='primary' />} label="Classic - conservative and traditional " />
                            <FormControlLabel value="feminine" control={<Radio color='primary' />} label="Feminine - soft, romantic, delicate" />
                            <FormControlLabel value="creative" control={<Radio color='primary' />} label="Creative - creative, unique, fashionable " />
                            <FormControlLabel value="sporty" control={<Radio color='primary' />} label="Sporty - casual, practical, easy " />
                            <FormControlLabel value="bold" control={<Radio color='primary' />} label="Bold - eccentric, bold, theatrical" />
                        </RadioGroup>
                    </FormControl>
                    <Link to="/insight-thank-you">
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

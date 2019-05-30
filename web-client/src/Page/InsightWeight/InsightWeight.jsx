import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from "../../Components/TextSliderText/TextSliderText";
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

function InsightWeight(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
            <Typography component="h6" variant="h6">What’s {props.selectedFollower.name}’s likely weight?</Typography>
            <AvatarComponent target={{ image: '/targets/target0.png' }}/>
            <TextSliderText leftText="Underweight" rightText="Overweight" />
            <Link to="/insight-skin">
                <IconButton icon="next" text="Next" />
            </Link>
        </div>
        <FooterLogo />
    </div>
  );
}

InsightWeight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsightWeight);

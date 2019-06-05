import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Slider from "@material-ui/lab/Slider";
import { ReactComponent as Openness } from "../../Icons/openness.svg";
import { ReactComponent as Conscientiousness } from "../../Icons/conscientiousness.svg";
import { ReactComponent as Extroversion } from "../../Icons/extroversion.svg";
import { ReactComponent as Agreeableness } from "../../Icons/agreeableness.svg";
import { ReactComponent as Neuroticism } from "../../Icons/neuroticism.svg";
//import { ReactComponent as Person } from "../../Icons/person.svg";
import { ReactComponent as Play } from "../../Icons/play.svg";
//import { ReactComponent as Question } from "../../Icons/question.svg";

import "./OceanProfile.scss";

function OceanProfile(props) {
  let traits = props.subject.traits;
  let tname = props.subject.name;
  return (
    <div className="OceanProfile">
      <div>
        <p><strong>{tname}'s OCEAN Profile</strong></p>
      </div>
      <Grid container alignItems="center">
        <div className="OceanSliders">
        <div className="">
          <div className="textSliderText">
            <Typography>{Math.round(traits.openness*100)}%</Typography>
            <div className="sliderContainer">
                <div className="slider">
                <Slider value={traits.openness*100} aria-labelledby="label" />
                </div>
            </div>
            <div className="iconText">
              <Openness/>
              <Typography>Openness</Typography>
            </div>
          </div>
        </div>
        <div className="">
          <div className="textSliderText">
            <Typography>{Math.round(traits.conscientiousness*100)}%</Typography>
            <div className="sliderContainer">
                <div className="slider">
                <Slider value={traits.conscientiousness*100} aria-labelledby="label" />
                </div>
            </div>
            <div className="iconText">
              <Conscientiousness/>
              <Typography>Conscientiousness</Typography>
            </div>
          </div>
        </div>
        <div className="">
          <div className="textSliderText">
            <Typography>{Math.round(traits.extraversion*100)}%</Typography>
            <div className="sliderContainer">
                <div className="slider">
                  <Slider value={traits.extraversion*100} aria-labelledby="label" />
                </div>
            </div>
            <div className="iconText">
              <Extroversion/>
              <Typography>Extroversion</Typography>
            </div>
          </div>
        </div>
        <div className="">
          <div className="textSliderText">
            <Typography>{Math.round(traits.agreeableness*100)}%</Typography>
            <div className="sliderContainer">
                <div className="slider">
                  <Slider value={traits.agreeableness*100} aria-labelledby="label" />
                </div>
            </div>
            <div className="iconText">
              <Agreeableness/>
              <Typography>Agreeableness</Typography>
            </div>
          </div>
        </div>
        <div className="">
          <div className="textSliderText">
            <Typography>{Math.round(traits.neuroticism*100)}%</Typography>
            <div className="sliderContainer">
                <div className="slider">
                  <Slider value={traits.neuroticism*100} aria-labelledby="label" />
                </div>
            </div>
            <div className="iconText">
              <Neuroticism/>
              <Typography>Neuroticism</Typography>
            </div>
          </div>
        </div>
        </div>
      </Grid>
    </div>
  );
}

OceanProfile.propTypes = {
  classes: PropTypes.object,
};

export default OceanProfile;

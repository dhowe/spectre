import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Slider from "@material-ui/core/Slider";

import "./OceanProfile.css";

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

              <img src="/imgs/openness.svg" alt="openness" />
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
            <img src="/imgs/conscientiousness.svg" alt="conscientiousness" />
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
            <img src="/imgs/extroversion.svg" alt="extraversion" />
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
            <img src="/imgs/agreeableness.svg" alt="agreeableness" />
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
            <img src="/imgs/neuroticism.svg" alt="neuroticism" />
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

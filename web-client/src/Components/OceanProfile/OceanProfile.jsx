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
import { ReactComponent as Person } from "../../Icons/person.svg";
import { ReactComponent as Play } from "../../Icons/play.svg";
import { ReactComponent as Question } from "../../Icons/question.svg";

import "./OceanProfile.scss";

function OceanProfile(props) {
  return (
    <div className="OceanProfile">
      <Grid container alignItems="center">
        <Grid className="OceanIcons" item>
          <div>
            <Person/>
          </div>
          <div>
            <Play/>
          </div>
          <div>
            <Question/>
          </div>
        </Grid>
        <Grid className="OceanText" item>
          <Typography component="h6" variant="h6">
            <strong>[USERNAME]’s OCEAN PROFILE</strong>
          </Typography>
          <Typography component="h6" variant="h6">
            [username] is the type of person that is not afraid to tell people
            how it is.
          </Typography>
          <Typography component="h6" variant="h6">
            They may appear argumentative, confrontational, insensitive,
            intimidating, and controlling.
          </Typography>
          <Typography component="h6" variant="h6">
            They can overwhelm others with their energy, intelligence, and
            desire to order the world around them.
          </Typography>
          <Typography component="h6" variant="h6">
            <strong>[Username] is most likely influenced by contributor 1, contributor 2
            and contributor 3</strong>
          </Typography>
        </Grid>
        <Grid className="OceanSliders" item>
          <Grid className="textSliderText" container alignItems="center">
            <Grid className="textSliderTextLeft" item xs={3}>
              <Openness/>
              <Typography>Openness</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider value={50} aria-labelledby="label" />
            </Grid>
            <Grid item xs={3}>
              <Typography>100%</Typography>
            </Grid>
          </Grid>
          <Grid className="textSliderText" container alignItems="center">
            <Grid className="textSliderTextLeft" item xs={3}>
              <Conscientiousness/>
              <Typography>Conscientiousness</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider value={50} aria-labelledby="label" />
            </Grid>
            <Grid item xs={3}>
              <Typography>100%</Typography>
            </Grid>
          </Grid>
          <Grid className="textSliderText" container alignItems="center">
            <Grid className="textSliderTextLeft" item xs={3}>
              <Extroversion/>
              <Typography>Extroversion</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider value={50} aria-labelledby="label" />
            </Grid>
            <Grid item xs={3}>
              <Typography>100%</Typography>
            </Grid>
          </Grid>
          <Grid className="textSliderText" container alignItems="center">
            <Grid className="textSliderTextLeft" item xs={3}>
              <Agreeableness/>
              <Typography>Agreeableness</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider value={50} aria-labelledby="label" />
            </Grid>
            <Grid item xs={3}>
              <Typography>100%</Typography>
            </Grid>
          </Grid>
          <Grid className="textSliderText" container alignItems="center">
            <Grid className="textSliderTextLeft" item xs={3}>
              <Neuroticism/>
              <Typography>Neuroticism</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider value={50} aria-labelledby="label" />
            </Grid>
            <Grid item xs={3}>
              <Typography>100%</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

OceanProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default OceanProfile;

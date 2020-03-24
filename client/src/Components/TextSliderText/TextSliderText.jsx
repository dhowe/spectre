import React from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

import "./TextSliderText.scss";

class TextSliderText extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: this.props.presetValue? this.props.presetValue: 50 };
  }

  handleChange = (e, value) => { this.setState({ value }) };

  render() {
    const { value } = this.state;
    return (
      <Grid className="textSliderText" container alignItems="center">
      <Grid item xs={2}>
      </Grid>
        <Grid item xs={2}>
          <p>{this.props.leftText}</p>
        </Grid>
        <Grid item xs={4}>
          <Slider
            color="primary"
            value={value}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <p>{this.props.rightText}</p>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        {this.props.middleText && (
          <Grid item xs={12}>
            <p>{this.props.middleText}</p>
          </Grid>
        )}
      </Grid>
    );
  }
}
export default TextSliderText;

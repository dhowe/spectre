import React from "react";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class TextSliderText extends React.Component {
  state = {
    value: 50
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography>{this.props.leftText}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Slider
            value={value}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography>{this.props.rightText}</Typography>
        </Grid>
        {this.props.middleText && (
          <Grid item xs={12}>
            <Typography>{this.props.middleText}</Typography>
          </Grid>
        )}
      </Grid>
    );
  }
}
export default TextSliderText;

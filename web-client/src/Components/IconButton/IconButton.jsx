import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import nextIcon from "../../Icons/next.svg";

import "./IconButton.scss";

const styles = {};

function IconButton(props) {
  const { classes } = props;
  return (
    <div className={"iconButton-" + props.colour + " iconButton"}>
      {props.icon === "next" && (
        <svg
          width="150"
          height="150"
          viewBox="0 0 5 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.18932 2.49515C3.18932 2.47573 3.17961 2.45631 3.16505 2.4466L2.60194 2.03398C2.59223 2.02427 2.57767 2.02427 2.56311 2.02427C2.55825 2.02427 2.5534 2.02427 2.54854 2.02427C2.54369 2.02427 2.53884 2.02427 2.53398 2.02913C2.51456 2.03884 2.5 2.06311 2.5 2.08253V2.34952H1.9466C1.86893 2.34952 1.80097 2.41262 1.80097 2.49515C1.80097 2.57282 1.86408 2.64078 1.9466 2.64078H2.5V2.90777C2.5 2.91262 2.5 2.91748 2.5 2.92233V2.92719C2.5 2.93204 2.50486 2.9369 2.50486 2.9369C2.50486 2.9369 2.50486 2.9369 2.50486 2.94175C2.50486 2.9466 2.50971 2.95146 2.51456 2.95146C2.51942 2.95631 2.52427 2.96117 2.52913 2.96117C2.54854 2.97088 2.57282 2.97088 2.59223 2.95631L3.15534 2.54369C3.1699 2.53398 3.17961 2.51457 3.17961 2.49515H3.18932Z"
            fill={props.colour === "white" ? "#ffffff" : "#21c0fc"}
          />
          <path
            d="M2.5 4C3.3301 4 4 3.32524 4 2.5C4 1.6699 3.32524 1 2.5 1C1.6699 1 1 1.67476 1 2.5C1 3.3301 1.67476 4 2.5 4Z"
            stroke={props.colour === "white" ? "#ffffff" : "#21c0fc"}
            stroke-width="0.1"
            stroke-linecap="round"
          />
        </svg>
      )}
      <div className="iconButtonText">{props.text}</div>
    </div>
  );
}

IconButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconButton);
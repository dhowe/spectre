import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ComponentStyles from '../../App.module.css';
import "./OceanProfileHelpModal.scss";
//import HeaderLogo from '../../Icons/headerlogo-colour.svg';
//import { Link } from 'react-router-dom';

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: "12px"
  },
  title: {
    textAlign: "left"
  },
  content: {
    textAlign: "left"
  }
});

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const { classes } = props;
  const content = props.content;
  const helpTitle = [];
  const helpText = [];
  const oceanHelp = [];

  content.forEach((item) => {
    for (var key in item) {
      helpTitle.push(key)
      helpText.push(item[key])
    }
  });

  for (const [index, value] of helpText.entries()) {
    oceanHelp.push(
      <div className="help-item" key={index}>
        <div className="icon">
          <img src={"/imgs/" + helpTitle[index].charAt(0).toLowerCase() + helpTitle[index].slice(1) + ".svg"} alt={index} />
          <h2 className="helper-title">{helpTitle[index]}</h2>
        </div>
        <div className="help-paragraph">
          <p>{value}</p>
        </div>
      </div>
    )
  }

  //  console.log(summary.contentHere.length === 0? setSummary({contentHere: props.summary}): setSummary({contentHere: props.summary}))
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <div style={modalStyle} className={classes.paper} id="help-title-div">
        <h2 className="help-main-title" >
          {props.title}
        </h2>
        <div id="help-content">
          <div className="split-l">
            {oceanHelp[0]}
            {oceanHelp[1]}
            {oceanHelp[2]}
          </div>
          <div className="split-r">
            {oceanHelp[3]}
            {oceanHelp[4]}
          </div>
        </div>
        <Button className={ComponentStyles.button}
          onClick={props.onClose} id="help-modal-button">X</Button>
      </div>
    </Modal>
  );
}

SimpleModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleModal);

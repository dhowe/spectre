import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import UserSession from '../../Components/UserSession/UserSession';

import ComponentStyles from '../../App.module.css';
import "./OceanProfileHelp.scss";

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

  console.log('openness: '+UserSession.oceanDesc['openness'].desc);
  const oceanHelp = UserSession.oceanTraits.map(trait => (
    <div className="help-item" key={trait}>
      <div className="icon">
        <img src={`/imgs/${trait}.svg`} alt={trait} />
        <h2 className="helper-title">{trait.ucf()}</h2>
      </div>
      <div className="help-paragraph">
        <p>{UserSession.oceanDesc[trait].desc}</p>
      </div>
    </div>
  ));

  return (
    <Modal open={props.isOpen} onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div style={modalStyle} className={props.classes.paper} id="help-title-div">
        <h2 className="help-main-title" >
          From these FIVE personality traits we can <em>scientifically</em> quantify every human being...
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleModal);

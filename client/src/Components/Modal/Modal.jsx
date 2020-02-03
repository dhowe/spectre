import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "./Modal.scss";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

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
  },
  htmlContent: "",
});

function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const { classes } = props;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.isOpen}
      onClose={props.onClose}

    >

      <div style={modalStyle} className={classes.paper} id="modal-title-div">
      <div id="modal-title-div-content">
        <Typography variant="h6" className={classes.title} id="modal-title">
          {props.title}
        </Typography>
        {props.content.length > 500 ?  <p id="tos-content">{props.content}</p> : <p
            variant="subtitle1"
            className={classes.content}
            id="simple-modal-description">{props.content}</p>}
                <div>{props.htmlContent}</div>
        <Button onClick={props.onClose} id="simple-modal-button">Close</Button>
      </div>

      </div>

    </Modal>
  );
}

SimpleModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  htmlContent: PropTypes.string,
};

export default withStyles(styles)(SimpleModal);

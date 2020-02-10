import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import HeaderLogo from '../../Icons/headerlogo-colour.svg';
import ComponentStyles from '../../App.module.css';
import { Link } from 'react-router-dom';
import "./TOSModal.scss";


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

});


function getSummaryStatus() {
  return {
    contentHere: "",
  };
}


function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const { classes } = props;

  const [summary,setSummary] = React.useState({
    showSummary : true, contentHere: props.summary});

  function handleClick() {
    if(summary.showSummary){
      setSummary({showSummary: false, contentHere: props.content});
    }else{
      setSummary({showSummary: true,contentHere: props.summary});
    }
    }
  //  console.log(summary.contentHere.length === 0? setSummary({contentHere: props.summary}): setSummary({contentHere: props.summary}))
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <div style={modalStyle} className={classes.paper} id="tos-title-div">
        <div className="tos-logo">
          <img alt="logo" src={HeaderLogo} />
        </div>
        <Typography variant="h6" className={classes.title} id="modal-title">
          {props.title}
        </Typography>
        <div id="tos-content">
          {summary.contentHere.length === 0? props.summary: summary.contentHere}
        </div>
        <div className={ComponentStyles.buttonWrapper2}>
          <Link to="/"><Button className={ComponentStyles.button} id="tos-modal-button">I DO NOT ACCEPT</Button></Link>
          <Button className={ComponentStyles.button} onClick={props.onClose} id="tos-modal-button">I ACCEPT</Button>
          <div onClick={handleClick}><Link className='tos' to='#here'>Terms of Service</Link></div>
        </div>
      </div>
    </Modal>
  );
}

SimpleModal.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleModal);

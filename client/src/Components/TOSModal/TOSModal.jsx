import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

function SimpleModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const { classes } = props;

  const [summary, setSummary] = React.useState({
    showSummary: true, contentHere: props.summary
  });

  const [showPage, setShowPage] = React.useState({
    pageOne: { display: 'block' }, pageTwo: { display: 'none' }
  });

  function handleClick() {
    if (summary.showSummary) {
      setSummary({ showSummary: false, contentHere: props.content });
                setShowPage({ pageOne: { display: 'none' }, pageTwo: { display: 'block' } });
    } else {
      setShowPage({ pageOne: { display: 'block' }, pageTwo: { display: 'none' } });
      setSummary({ showSummary: true, contentHere: <p className="small">{props.summary} </p>});
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
        <div style={showPage.pageOne}>
          <div className="tos-logo">
            <img alt="logo" src={HeaderLogo} />
          </div>
          <h3 className="title">
            {props.title}
          </h3>
          <div id="tos-content">
            {summary.contentHere.length === 0 ? <p className="small">{props.summary}</p> : summary.contentHere}
          </div>
          <div className="tos-buttons">

            <Link to="/">
              <Button className={ComponentStyles.button} id="tos-modal-button">I do not accept</Button></Link>
            <Button className={ComponentStyles.button} onClick={props.onClose} id="tos-modal-button">I accept</Button>
            <div onClick={handleClick}><Link className='tos-link' to='#here'>link to long policy</Link></div>
          </div>
        </div>
        <div style={showPage.pageTwo}>
          <h1 className="page2-title">
            Terms of service
          </h1>
          <div id="page2-tos-content">
            {summary.contentHere.length === 0 ? <p className="small">{props.summary}</p> : summary.contentHere}
          </div>
          <div id="page2-button">
          <Button className={ComponentStyles.button}
            onClick={e => handleClick(e)} id="help-modal-button">X</Button>
          </div>
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

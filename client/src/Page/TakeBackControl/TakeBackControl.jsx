import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/Grid';
//import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

//import colours from '../../colors.scss';
import './TakeBackControl.scss';

const styles = {

};

class TakeBackControl extends React.Component {

  constructor(props) {
    super(props, '/goodbye');
  }

  async componentDidMount() {
    await UserSession.ensure(this.context, ['_id', 'name', 'celebrity']);
  }

  handleClick = (choice) => {
    this.context.keepData = choice;
    this.props.history.push(choice ? "/goodbye" : "/we-are-sorry");
    UserSession.update(this.context); // no await
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="copy">Take back control?</p>
          <p className="copy">Delete your data from Spectre’s system?</p>
          <div className={ComponentsStyles.buttonWrapper}>

              <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick(true)}>Keep</Button>


              <Button className={ComponentsStyles.button} variant="contained" color="primary" onClick={() => this.handleClick(false)}>Delete</Button>

          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TakeBackControl.propTypes = {
  classes: PropTypes.object.isRequired,
};
TakeBackControl.contextType = UserSession;

export default withStyles(styles)(TakeBackControl);

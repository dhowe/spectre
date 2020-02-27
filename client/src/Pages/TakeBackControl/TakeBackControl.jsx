import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import ComponentsStyles from '../../App.module.css';
import './TakeBackControl.scss';

const styles = {};

class TakeBackControl extends React.Component {

  constructor(props) {
    super(props, '/goodbye');
  }

  async componentDidMount() {
    await UserSession.ensure(this.context, ['name', 'celebrity']);
  }

  handleClick = (choice) => {
    this.context.keepData = choice;
    this.context.goto(this.props, choice ? "/goodbye" : "/we-are-sorry");
    UserSession.update(this.context); // no await
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1 className="addSpacing"><span>Take back control</span></h1>
          <h2 className="normal-addSpacing">Delete your data from Spectre’s system?</h2>
          <div className={ComponentsStyles.buttonWrapper}>
              <Button  variant="outlined" color="secondary" onClick={() => this.handleClick(false)}>Delete</Button>
              <Button  variant="contained" color="primary" onClick={() => this.handleClick(true)}>Keep</Button>
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

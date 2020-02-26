import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import { withStyles } from '@material-ui/core/styles';
import ComponentsStyles from '../../App.module.css';
import './SearchingFor.scss';

const styles = {};

class SearchingFor extends React.Component {
  constructor(props) {
    super(props, '/data-is');
    this.clickDisabled = false;
    this.state = { name: '' };
  }

  async componentDidMount() {
    await UserSession.ensure(this.context, ['login', 'name']);
    this.setState({ name: this.context.name })
  }

  handleClick = async (virtue) => {
    if (!this.clickDisabled) {
      this.clickDisabled = true;
      this.context.virtue = virtue;
      await UserSession.update(this.context);
      this.context.goto(this.props, '/data-is');
    }
  }

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1 className="addSpacing"><span>{name}, </span>what are you<br />
            searching for today?</h1>
          <div className={ComponentsStyles.buttonWrapper}>
            <Button className={ComponentsStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('power')}>Power</Button>
            <Button className={ComponentsStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('truth')}>Truth</Button>
            <Button className={ComponentsStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('influence')}>Influence</Button>
            <Button className={ComponentsStyles.button} variant="outlined" color="primary"
              onClick={() => this.handleClick('wealth')}>Wealth</Button>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

SearchingFor.propTypes = {
  classes: PropTypes.object.isRequired,
};
SearchingFor.contextType = UserSession;

export default withStyles(styles)(SearchingFor);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import IconButton from '../../Components/IconButton/IconButton';
import IconButtonToggle from '../../Components/IconButton/IconButtonToggle';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import UserSession from '../../Components/UserSession/UserSession';

import ComponentsStyles from '../../App.module.css';

const styles = {};

class ConsumerData extends React.Component {
  constructor(props) {
    super(props, '/political-data');
    this.state = {
      count: 0,
      choices: []
    };
  }

  componentDidUpdate() {
    if (document.getElementsByClassName('iconEnabled').length !== this.state.count) {
      this.setState({ count: document.getElementsByClassName('iconEnabled').length });
    }
  }

  countAdd = () => {
    this.setState({ count: document.getElementsByClassName('iconEnabled').length });
  }

  dataCollect = () => {
    let choiceArray = [];
    document.querySelectorAll('.iconEnabled > .iconButtonText').forEach(choice => {
      choiceArray.push(choice.innerText);
    });
    this.setState({ choices: choiceArray }); // needed? data stored in User (this.context)
    this.context.dataChoices.consumer = choiceArray.join(',');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1>
            <span><br />Choose 3 types of consumer data:</span>
          </h1>
          <div onClick={this.countAdd} className="DataIcons">
            <Grid className={classes.icons} container>
              <Grid item sm={4}></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="health" text="Health" /></Grid>
              <Grid item sm={2}><IconButtonToggle enabled={false} icon="finance" text="Finance" /></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="biometrics" text="Biometrics" /></Grid>
              <Grid item sm={4}></Grid>
            </Grid>
            <Grid className={classes.icons} container>
              <Grid item sm={4}></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="online" text="Online Search History" /></Grid>
              <Grid item sm={2}><IconButtonToggle enabled={false} icon="shopping" text="Shopping &amp; Mail Order" /></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="insurance" text="Insurance" /></Grid>
              <Grid item sm={4}></Grid>
            </Grid>
            <Grid className={classes.icons} container>
              <Grid item sm={4}></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="social" text="Social Media" /></Grid>
              <Grid item sm={2}><IconButtonToggle enabled={false} icon="travel" text="Travel" /></Grid>
              <Grid item sm={1}><IconButtonToggle enabled={false} icon="location" text="Location" /></Grid>
            <Grid item sm={4}></Grid>
            </Grid>
          </div>
          <div className="link">
            <Link onClick={this.dataCollect} className={this.state.count >= 3 ? 'true' : 'disabled'} to="/political-data">
              <IconButton enabled={this.state.count >= 3} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

ConsumerData.propTypes = {
  classes: PropTypes.object.isRequired,
};
ConsumerData.contextType = UserSession;

export default withStyles(styles)(ConsumerData);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import IconButton from '../../Components/IconButton/IconButton';
import IconButtonToggle from '../../Components/IconButton/IconButtonToggle';

import './PoliticalData.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {
};

class PoliticalData extends React.Component {
  constructor(props) {
    super(props, '/home-data');
    this.state = { count: 0 };
  }

  componentDidUpdate() {
    if (document.getElementsByClassName("iconEnabled").length !== this.state.count) {
      this.setState({ count: document.getElementsByClassName("iconEnabled").length });
    }
  }

  countAdd = () => {
    this.setState({ count: document.getElementsByClassName("iconEnabled").length });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={classes.content + " content"}>
          <p className="copy">
            <strong>Choose 3 types of political data:</strong>
          </p>

          <div onClick={this.countAdd} className="DataIcons">
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="voting" text="Voting Records" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="finance" text="Financial Records" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="maps" text="Online Maps" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="political" text="Political Party" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="polls" text="Polls &amp; Surveys" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="consultants" text="SConsultants" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="bigdata" text="Big Data Sets" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="internet" text="Internet Platforms" /></Grid>
                <Grid item sm={4}><IconButtonToggle enabled={false} icon="group" text="Group Memberships" /></Grid>
              </Grid>
          </div>

          <Link className={this.state.count >= 3 ? "true" : "disabled"} to="/home-data">
            <IconButton enabled={this.state.count >= 3} icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

PoliticalData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PoliticalData);

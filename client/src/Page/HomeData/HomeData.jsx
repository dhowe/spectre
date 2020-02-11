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
import ComponentsStyles from '../../App.module.css';
import UserSession from '../../Components/UserSession/UserSession';


const styles = {
};

class HomeData extends React.Component {
  constructor(props) {
    super(props, '/find-citizens');
    this.state = {
      count: 0,
      choices: []
    };
  }

  componentDidUpdate() {
    if (document.getElementsByClassName("iconEnabled").length !== this.state.count) {
      this.setState({ count: document.getElementsByClassName("iconEnabled").length });
    }
  }

  countAdd = () => {
    this.setState({ count: document.getElementsByClassName("iconEnabled").length });
  }

  dataCollect = () => {
    let choiceArray = [];
    document.querySelectorAll('.iconEnabled > .iconButtonText').forEach(choice => {
      choiceArray.push(choice.innerText);
    });
    this.setState({ choices: choiceArray });
    this.context.dataChoices.homed = choiceArray.join(',');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={classes.content + " content"}>
          <p className="normal">
            <strong>Choose 2 types of home data:</strong>
          </p>

          <div onClick={this.countAdd} className="DataIcons">
            <Grid className={classes.icons} container>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="smartwatch" text="Smart Watch" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="wifi" text="Wifi Router" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="computers" text="Computers" /></Grid>
            </Grid>
            <Grid className={classes.icons} container>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="mobile" text="Mobile Devices" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="smarttv" text="Smart TV" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="smartassistant" text="Smart Assistant" /></Grid>
            </Grid>
            <Grid className={classes.icons} container>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="mobile" text="Mobile Devices" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="smarttv" text="Smart TV" /></Grid>
              <Grid item sm={4}><IconButtonToggle enabled={false} icon="smartassistant" text="Smart Assistant" /></Grid>
            </Grid>
          </div>
          <div className="link">
            <Link onClick={this.dataCollect} className={this.state.count >= 3 ? "true" : "disabled"} to="/find-citizens">
              <IconButton enabled={this.state.count >= 3} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

HomeData.propTypes = {
  classes: PropTypes.object.isRequired
};
HomeData.contextType = UserSession;


export default withStyles(styles)(HomeData);

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

import './HomeData.scss';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  button: {
    borderRadius: '28px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
  },
  link: {
    display: 'block',
    marginBottom: '30px',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    padding: '0 30% 25% 25%', //tmp
  },
  column: {
    flexDirection: 'column',
    display: 'flex',
  },
  item: {
    flexDirection: 'column',
    display: 'flex',
    padding: '30px',
  },
  icons: {
    marginBottom: '30px',
  },
};

class HomeData extends React.Component {
  constructor(props) {
    super(props, '/find-citizens');
    this.state = { count: 0 };

    this.countAdd = this.countAdd.bind(this);
  }

  componentDidUpdate() {
    if (document.getElementsByClassName("iconEnabled").length !== this.state.count) {
      this.setState({ count: document.getElementsByClassName("iconEnabled").length });
    }
  }

  countAdd() {
    this.setState({ count: document.getElementsByClassName("iconEnabled").length });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">
            <strong>Choose 2 types of home data:</strong>
          </Typography>

          <div onClick={this.countAdd} className="HomeDataIcons">
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
          </div>

          <Link className={this.state.count >= 2 ? "true" : "disabled"} to="/find-citizens">
            <IconButton enabled={this.state.count >= 2} icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

HomeData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeData);

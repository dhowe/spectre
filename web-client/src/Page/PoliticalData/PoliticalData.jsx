import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        color: 'black'
    },
    clickToContinue: {
        margin: "20% 0",
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
        padding: '0 30% 25% 25%' //tmp
    },
    column: {
        flexDirection: 'column',
        display: 'flex',
    },
    icons: {
        marginBottom: "30px",
    }
};

function PoliticalData(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader
        colour="white"
        progressActive={true}
        progressNumber="two"
      />
      <div className={classes.content + " content"}>
        <Typography component="h6" variant="h6">
          <strong>Choose 3 types of political data:</strong>
        </Typography>

          <div className="PoliticalDataIcons">
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButton enabled={false} icon="voting" text="Voting Records" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="finance" text="Financial Records" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="maps" text="Online Maps" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButton enabled={false} icon="political" text="Political Party" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="polls" text="Polls &amp; Surveys" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="consultants" text="SConsultants" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={4}><IconButton enabled={false} icon="bigdata" text="Big Data Sets" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="internet" text="Internet Platforms" /></Grid>
                <Grid item sm={4}><IconButton enabled={false} icon="group" text="Group Memberships" /></Grid>
              </Grid>
          </div>

          <Link to="/home-data" className="disabled">
            <IconButton enabled={false} icon="next" text="Next" />
          </Link>
      </div>
      <FooterLogo />
        </div >
    );
}

PoliticalData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PoliticalData);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid/Grid";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import IconButton from "../../Components/IconButton/IconButton";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: "black"
  },
  clickToContinue: {
    margin: "20% 0"
  },
  button: {
    borderRadius: "28px",
    border: "solid 3px #929391",
    backgroundColor: "#ffffff",
    boxShadow: "none",
    color: "#929391"
  },
  link: {
    display: "block",
    marginBottom: "30px"
  },
  row: {
    flexDirection: "row",
    display: "flex",
    padding: "0 30% 25% 25%" //tmp
  },
  column: {
    flexDirection: "column",
    display: "flex"
  },
  item: {
    flexDirection: "column",
    display: "flex",
    padding: "30px"
  },
  icons: {
    marginBottom: "30px",
  }
};

function ConsumerData(props) {
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
          <strong>Choose 3 types of consumer data:</strong>
        </Typography>

          <div className="ConsumerDataIcons">
              <Grid className={classes.icons} container>
                <Grid item sm={3}><IconButton enabled={false} icon="health" text="Health" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="finance" text="Finance" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="travel" text="Travel" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="biometrics" text="Biometrics" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={3}><IconButton enabled={false} icon="television" text="Television" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="news" text="News &amp; Magazines" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="store" text="Store &amp; Loyaty Cards" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="vehicle" text="Vehicle GPS" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={3}><IconButton enabled={false} icon="online" text="Online Search History" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="shopping" text="Shopping &amp; Mail Order" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="location" text="Location" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="music" text="Spotify / ITunes" /></Grid>
              </Grid>
              <Grid className={classes.icons} container>
                <Grid item sm={3}><IconButton enabled={false} icon="insurance" text="Insurance" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="social" text="Social Media" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="education" text="Education" /></Grid>
                <Grid item sm={3}><IconButton enabled={false} icon="payment" text="Payment" /></Grid>
              </Grid>
          </div>

          <Link to="/political-data" className="disabled">
            <IconButton enabled={false} icon="next" text="Next" />
          </Link>
      </div>
      <FooterLogo />
    </div>
  );
}

ConsumerData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConsumerData);

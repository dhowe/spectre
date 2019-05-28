import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Grid from '@material-ui/core/Grid';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  },
  glow: {
    color: '#ffd700'
  }
};

class InfluenceAFollower extends React.Component {
  constructor(props) {
    super(props);
    this.names = ['Remy', 'Bailey', 'Devin', 'Tyler', 'Fran', 'Pat', 'Sam', 'Reed'];
  }
  componentWillMount() {
    let user = this.context;
    console.log('USER|', user);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h3" variant="h3">Influence a follower!</Typography>
          <Typography component="h4" variant="h4" >Spectre has a global community of followers.</Typography>
          <Typography component="h5" variant="h5" >Choose a participant.</Typography>
          <Grid container justify="center" alignItems="center">
            {this.names.map((n, i) => <AvatarComponent key={i}
              target={{ name: n, image: '/targets/target' + i + '.png' }} />)}
          </Grid>
          <Link to="/selected-avatar">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceAFollower.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceAFollower.contextType = UserSession;

export default withStyles(styles)(InfluenceAFollower);

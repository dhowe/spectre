import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Grid from '@material-ui/core/Grid';
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

const defaults = [{ name: 'Remy', id: '111111111111111111111111' }, { name: 'Bailey', id: '222222222222222222222222' }, { name: 'Devin', id: '333333333333333333333333' }, { name: 'Tyler', id: '444444444444444444444444' }, { name: 'Fran', id: '555555555555555555555555' }, { name: 'Pat', id: '666666666666666666666666' }, { name: 'Sam', id: '777777777777777777777777' }, { name: 'Reed', id: '888888888888888888888888' }, { name: 'Terry', id: '999999999999999999999999' }];

class InfluenceAFollower extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toNext: false };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    let user = this.context;
    if (typeof user === 'undefined' || typeof user._id === 'undefined') { // TMP
      user.name = user.name || 'Barney';
      user.loginType = user.loginType || 'email';
      user.login = user.login || 'Barney' + (+new Date()) + '@aol.com';
      UserSession.createUser(user);
    }
  }
  renderSimilars() {
    let result = defaults;
    let sims = this.context.getSimilars();
    if (sims && sims.length) result = sims;
    return result;
  }
  renderRedirect() {
    if (this.state.toNext) {
      return <Redirect to='/selected-avatar' />
    }
  }
  handleSelect(target) {
    this.context.targetId = target.id;
    this.context.targetName = target.name;
    this.setState({ toNext: true });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderRedirect()}
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
          <Typography component="h5" variant="h5"><strong>Influence a follower!</strong></Typography>
          <Typography component="h6" variant="h6" >Spectre has a global community of followers.</Typography>
          <Typography component="h5" variant="h5" >Choose a participant.</Typography>
          <Grid container justify="center" alignItems="center">
            {this.renderSimilars().map((n, i) => <AvatarComponent handleClick={() => this.handleSelect(n)}
              key={i} target={{ name: n.name, image: '/profiles/' + n.id + '.jpg' }} />)}
          </Grid>
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

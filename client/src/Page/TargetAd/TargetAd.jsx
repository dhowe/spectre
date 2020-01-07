import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class TargetAd extends React.Component {
  constructor(props) {
    super(props, '/success-ad');
    this.state = { targetName: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'target']);
    this.setState({ targetName: user.target.name });
  }

  render() {
    const { classes } = this.props;
    const { targetName } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <br />
          <Typography component="h6" variant="h6">
            Share your targeted ad with <strong>{targetName}</strong>?
          </Typography>
          <Grid container justify="center">
            <Grid item>
              <Link to="/success-ad">
                <IconButton icon="tick" text="Yes" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/success-ad"> {/* see issue #262 */}
                <IconButton icon="next" text="No" />
              </Link>
            </Grid>
          </Grid>
          <br />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TargetAd.contextType = UserSession;
TargetAd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TargetAd);

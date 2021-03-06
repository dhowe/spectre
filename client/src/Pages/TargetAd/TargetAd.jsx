import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {};

class TargetAd extends React.Component {
  constructor(props) {
    super(props, '/success-ad');
    this.state = { targetName: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['target']);
    this.setState({ targetName: user.target.name });
    UserSession.update(user); // no await
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
          <p>
            Share your targeted ad with <strong>{targetName}</strong>?
          </p>
          <Grid container justify="center">
            <Grid item>
              <Link to="/success-ad">
                <IconButton icon="tick" text="Yes" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/success-ad"> {/* see issue #478 */}
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

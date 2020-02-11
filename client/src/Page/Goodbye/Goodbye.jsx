import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';


const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class Goodbye extends React.Component {
  constructor(props) {
    super(props, '/');
    this.state = { celebrity: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'celebrity']);
    console.log('ensure done', 'celeb='+user.celebrity);
    this.setState({ celebrity: user.celebrity });
  }

  componentWillUnmount() {
    UserSession.clear();
  }

  render() {
    const { classes } = this.props;
    const { celebrity } = this.state;

    let videoPlaceholder = celebrity.length ? (
      <Video className={classes.video}
        movie={`https://spectreknows.me/video/goodbye_${celebrity}.mp4`} key="34345871"
        onComplete={() => this.props.history.push('/')}
      />) : <br />;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + ' content'}>
          {videoPlaceholder}
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Goodbye.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Goodbye.contextType = UserSession;

export default withStyles(styles)(Goodbye);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
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

class OCEANReveal extends React.Component {
  constructor(props) {
    super(props);

    this.video = React.createRef(); // NOTE: should be `/video/wrapup_${this.context.celebrity}.mp4`
    this.state = { movie: `/video/wrapup/wrapup_${this.context.celeb}.mp4` };
    this.showVideo = this.showVideo.bind(this);
  }

  showVideo() {
    this.video.play();
  }

  render() {
    const { movie } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three" />
        <div className={classes.content + ' content'}>
          <Typography component="h6" variant="h6">
            A little data and a little tech goes a long way, doesn&apos;t it?
          </Typography>
          <Typography component="h6" variant="h6">
            For example, we haven&apos;t known you very long, but already we know that...
          </Typography>
          <Link to="" onClick={this.showVideo}>
            <Video ref={this.video} movie={movie} onComplete={() => { window.location.assign('/take-back-control'); }}/>
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

OCEANReveal.propTypes = {
  classes: PropTypes.object.isRequired,
};
OCEANReveal.contextType = UserSession;

export default withStyles(styles)(OCEANReveal);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import AvatarCircle from '../../Components/AvatarCircle/AvatarCircle';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
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

class InfluenceACelebrity extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.state = { video: null };
    this.celebs = [];
  }

  stop() {
    this.setState({ video: null });
  }

  play(index) {
    const celeb = this.celebs[index];
    const user = this.context;
    this.setState({ video: `/video/virtue/${user.virtue}_${celeb}.mp4` });
  }

  render() {
    const { classes } = this.props;
    const { video } = this.state;
    const user = this.context;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="three"/>
        <div className={classes.content + ' content'}>
          <Typography component="h6" variant="h6">
            Spectre has&nbsp;
            <strong>many</strong>
            <br />
            famous followers.
          </Typography>
          <Typography component="h6" variant="h6">
            Select one below to hear their confession
            on&nbsp;
            {user.virtue || 'power'}
            :
          </Typography>

          {/* Add Circle of Clickable Celebrity Images Here */}
          {video && <Video autoPlay onComplete={this.stop} movie={video} />}
          <AvatarCircle>
            {this.celebs
              .map((n, i) => (
                <AvatarComponent
                  handleClick={() => this.play(n)}
                  key={AvatarComponent.generateKey(i)}
                  target={{ name: n.name, image: `/profiles/${n.id}.jpg` }}
                />
              ))}
          </AvatarCircle>

          <Link to="/OCEAN-reveal">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InfluenceACelebrity.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluenceACelebrity.contextType = UserSession;

export default withStyles(styles)(InfluenceACelebrity);

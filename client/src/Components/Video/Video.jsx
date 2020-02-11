import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  video: {
    backgroundColor: '#000000d1',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
  },
};

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldShow: props.autoPlay };
    this.videoPlayer = React.createRef();
  }

  componentDidMount = () => {
    document.addEventListener("keyup", this.props.onKeyUp, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keyup", this.props.onKeyUp, false);
  }

  errorRender = (e) => {
    console.error(`Cannot open file ${e.currentTarget.currentSrc}`);
    console.error(`Playback error: ${e.currentTarget.error}`);
    this.props.onComplete(this);
  }

  stop = () => {
    this.videoPlayer.current.currentTime = Number.MAX_SAFE_INTEGER;
  }

  play = () => {
    this.setState({ shouldShow: true });
  }

  close = () => {
    this.setState({ shouldShow: false });
  }

  render = () => {
    const { onComplete, movie, className, style } = this.props;
    const { shouldShow } = this.state;
    const overlay = !(className || style);
    const ended = () => onComplete(this);

    return (
      shouldShow && (
        <div
          style={overlay ? styles.video : style}
          className={className}
          onTouchEnd={this.stop}>
          <video ref={this.videoPlayer}
            onError={this.errorRender}
            onEnded={ended}
            width={'100%'}
            autoPlay>
            <source src={movie} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    );
  }
}


Video.defaultProps = {
  onComplete: (video) => video.close(),
  onKeyUp: (e) => {},
  autoPlay: true,
  className: null,
  style: null,
};

Video.propTypes = {
  movie: PropTypes.node.isRequired,
  onComplete: PropTypes.func,
  onKeyUp: PropTypes.func,
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Video;

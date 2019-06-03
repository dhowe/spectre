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

    this.state = {
      shouldShow: props.autoPlay,
    };
  }

  render() {
    const { onComplete, movie } = this.props;
    const { shouldShow } = this.state;
    return (
      shouldShow && (
        <div style={styles.video}>
          <video
            onEnded={() => onComplete(this)}
            width={window.innerWidth}
            autoPlay
          >
            <source src={movie} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      )
    );
  }

  play() {
    this.setState({ shouldShow: true });
  }

  close() {
    this.setState({ shouldShow: false });
  }
}


Video.defaultProps = {
  onComplete: (video) => {
    video.close();
  },
  autoPlay: true,
};
Video.propTypes = {
  // classes: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  movie: PropTypes.node.isRequired,
  autoPlay: PropTypes.bool,
};

export default Video;

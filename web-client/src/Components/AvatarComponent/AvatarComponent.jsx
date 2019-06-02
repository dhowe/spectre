import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
    border: 'solid #9c9da1 5px',
  },
  targeted: {
    margin: 10,
    width: 60,
    height: 60,
    border: '5px solid #378685',
  },
  active: {
    margin: 10,
    width: 60,
    height: 60,
    border: '5px solid #4FAE50',
  },
  targeted_text: {
    color: '#378685',
  },
};

class AvatarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { className: props.className };
  }

  render() {
    const { handleClick, target } = this.props;
    const { className } = this.state;
    return (
      <div onClick={handleClick}>
        <Grid container justify="center" alignItems="center">
          <Avatar
            alt={target.name}
            src={target.image}
            style={(className === 'active' ? styles.active : styles.bigAvatar)}
            onError={() => { this.src = '/profiles/default.jpg'; }}
          />
        </Grid>
        <Typography style={className === 'targeted' ? styles.targeted_text : null}>{target.name}</Typography>
      </div>
    );
  }
}

AvatarComponent.defaultProps = {
  target: {
    name: 'Remy Sharp',
    image: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  className: null,
  handleClick: () => {},
};
AvatarComponent.propTypes = {
  handleClick: PropTypes.func,
  target: PropTypes.object,
  className: PropTypes.string,
};

export default AvatarComponent;

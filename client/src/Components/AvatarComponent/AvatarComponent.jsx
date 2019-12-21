import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserSession from '../../Components/UserSession/UserSession';
import User from '../../Components/User/User';
import PropTypes from 'prop-types';

import './AvatarComponent.scss';

const styles = {
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
  static generateKey(index) {
    return (7 * index);
  }

  constructor(props) {
    super(props);
    this.state = { className: props.className };
  }

  render() {
    const { handleClick, target, active } = this.props;
    const { className } = this.state;

    return (
      <div onClick={handleClick}>
        <Grid container justify="center" alignItems="center">
          <Avatar
            alt={target.name}
            src={target.image}
            className={(active || className !== 'active') ? 'avatar-image' : null}
            style={(active ? styles.active : null)}
            onError={() => { this.src = User.profileDir + 'default.jpg'; }}
          />
        </Grid>
        <Typography className="avatar-name" style={className === 'targeted' ?
          styles.targeted_text : null}>{target.name}</Typography>
      </div>
    );
  }
}

const defaultTarget = {
  image: User.profileDir + UserSession.defaults[0]._id + '.jpg',
  name: UserSession.defaults[0].name
}
AvatarComponent.defaultProps = {
  active: false,
  className: null,
  target: defaultTarget,
  handleClick: () => { },
};
AvatarComponent.propTypes = {
  handleClick: PropTypes.func,
  target: PropTypes.object,
  className: PropTypes.string,
  active: PropTypes.bool,
};

export default AvatarComponent;

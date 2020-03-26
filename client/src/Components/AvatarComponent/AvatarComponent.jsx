import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import UserSession from '../UserSession/UserSession';
import PropTypes from 'prop-types';

import './AvatarComponent.scss';

const styles = {
  targeted: {
    margin: 10,
    width: 100,
    height: 100,
    border: '5px solid #378685',
  },
  active: {
  },
  targeted_text: {
    color: '#378685',
  }
};

const liveUserInterval = 1 * (1000 * 60); // 1 minutes

class AvatarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { className: props.className };
  }

  isActive = (target) => {
    if ((typeof target.updatedAt === 'undefined')
      || (!(target.updatedAt instanceof Date))) {
      console.error('[AVATAR] Expecting date, got ' + typeof target.updatedAt
        + ' /isDate:' + (target.updatedAt instanceof Date));
      target.updatedAt = new Date(); // set a default value of now
      return false;
    }
    const inActiveMs = (Date.now() - target.updatedAt.getTime())
    const targetActive = inActiveMs < liveUserInterval;
    if (targetActive) console.log('[AVATAR] ' + target.name + ' inactive for '
      + Math.round(inActiveMs / 1000) + 's :: live: ' + targetActive);
    return targetActive;
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
          />
          <div className="active-div" style={(this.isActive(target) ?
            { display: 'block' } : { display: 'none' })}>
            <span className="activeDot"></span>
            <span className="activeDotText">LIVE</span>
          </div>
        </Grid>
        <p className="avatar-name" style={className === 'targeted' ?
          styles.targeted_text : null}>{target.name}</p>
      </div>
    );
  }
}

AvatarComponent.defaultProps = {
  active: false,
  className: null,
  target: {
    name: '',
    image: '',
    updatedAt: UserSession.epochDate
  },
  handleClick: () => { },
};
AvatarComponent.propTypes = {
  handleClick: PropTypes.func,
  target: PropTypes.object,
  className: PropTypes.string,
  active: PropTypes.bool,
};

export default AvatarComponent;

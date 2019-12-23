import React from 'react';
import PropTypes from 'prop-types';
import './AvatarCircle.scss';

function AvatarCircle({ children }) {
  return (
    <div className="circle-section">
      <div className="avatar-circle">
        {children}
      </div>
    </div>
  );
}

AvatarCircle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default AvatarCircle;

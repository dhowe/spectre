import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import wordsToNumbers from 'words-to-numbers';

import './Progress.scss';

const styles = {};
const cached = {};

function cachedWordsToNumbers(word) {
  const local = cached[word];

  if (local !== undefined) {
    return local;
  }

  const convert = wordsToNumbers(word);
  cached[word] = convert;

  return convert;
}

function Header({ active, progressNumber }) {
  if (!active) {
    return null;
  }

  const stages = [];

  for (let i = 1; i <= 3; i += 1) {
    stages.push(<Position key={i} position={i} progress={cachedWordsToNumbers(progressNumber)} />);
  }

  return (
    <div className={`progress progress-${progressNumber}`}>
      { stages }
    </div>
  );
}

Header.defaultProps = {
  active: false,
  progressNumber: '0',
};
Header.propTypes = {
  progressNumber: PropTypes.string,
  active: PropTypes.bool,
};


function Position({ position, progress }) {
  return <span className={progress === position ? 'active' : null}><div>{ position }</div></span>;
}

Position.propTypes = {
  position: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

export default withStyles(styles)(Header);

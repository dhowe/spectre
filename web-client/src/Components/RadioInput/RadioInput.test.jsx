import React from 'react';
import ReactDOM from 'react-dom';
import RadioInput from './RadioInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RadioInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});

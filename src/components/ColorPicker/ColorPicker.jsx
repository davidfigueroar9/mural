import React from 'react';
import PropTypes from 'prop-types';
import colors from './colors.json';

import './styles.css';

const ColorPicker = ({ onPick }) => (
  <div className="ColorPicker">
    <header>Select the color</header>
    <div className="content">
      {
        colors.map(color => (
          <div
            key={color}
            role="presentation"
            onClick={() => onPick(color)}
            className="color-item"
            style={{ backgroundColor: color }}
          />
        ))
      }
    </div>
  </div>
);

ColorPicker.propTypes = {
  onPick: PropTypes.func.isRequired,
};

export default ColorPicker;

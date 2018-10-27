import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ButtonHeader = ({ icon, onClick }) => (
  <div role="button" tabIndex="0" className="ButtonHeader" onClick={onClick}>
    <i className="material-icons">{ icon }</i>
  </div>
);

ButtonHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonHeader;

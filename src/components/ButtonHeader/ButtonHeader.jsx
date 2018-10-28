import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ButtonHeader = ({ icon, onClick, children }) => (
  <div role="button" tabIndex="0" className="ButtonHeader" onClick={onClick}>
    <i className="material-icons">{ icon }</i>
    {
      children && (
        <p>{children}</p>
      )
    }
  </div>
);

ButtonHeader.defaultProps = {
  children: '',
  onClick: null,
};

ButtonHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default ButtonHeader;

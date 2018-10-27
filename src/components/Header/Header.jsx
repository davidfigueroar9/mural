import React from 'react';
import logo from '../../images/logo.svg';
import './styles.css';

const ButtonHeader = ({ icon }) => (
  <div className="btn">
    <i className="material-icons">{ icon }</i>
  </div>
);

const Header = () => (
  <header className="Header">
    <img src={logo} alt="logo" />
    <div className="toolbar">
      <ButtonHeader icon="add" />
      <ButtonHeader icon="palette" />
      <ButtonHeader icon="dashboard" />
      <ButtonHeader icon="delete" />
    </div>
  </header>
);

export default Header;

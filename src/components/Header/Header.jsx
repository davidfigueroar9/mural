import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonHeader from '../ButtonHeader';
import ColorPicker from '../ColorPicker';
import Instructions from '../Instructions';
import logo from '../../images/logo.svg';
import './styles.css';


class Header extends PureComponent {
  state = {
    openColorPicker: false,
    openInstructions: false,
  }

  onToggleColorPicker = () => {
    this.setState(state => ({
      openColorPicker: !state.openColorPicker,
      openInstructions: false,
    }));
  }

  onToggleInstructions = () => {
    this.setState(state => ({
      openInstructions: !state.openInstructions,
      openColorPicker: false,
    }));
  }

  render() {
    const {
      onDelete,
      selected,
      onOrder,
      onChangeColor,
    } = this.props;

    const { openColorPicker, openInstructions } = this.state;

    return (
      <header
        role="presentation"
        className="Header"
        onClick={event => event.stopPropagation()}
        onDoubleClick={event => event.stopPropagation()}
      >
        <img src={logo} alt="logo" />
        <div className="toolbar">
          {
            selected !== 0 && (
              <Fragment>
                <ButtonHeader icon="check_circle">
                  { `${selected} selected` }
                </ButtonHeader>
                <ButtonHeader icon="dashboard" onClick={onOrder} />
                <ButtonHeader icon="palette" onClick={this.onToggleColorPicker} />
                <ButtonHeader icon="delete" onClick={onDelete} />
              </Fragment>
            )
          }
          <ButtonHeader icon="info" onClick={this.onToggleInstructions} />
          {
            openColorPicker && selected !== 0 && (
              <ColorPicker onPick={onChangeColor} />
            )
          }

          {
            openInstructions && (
              <Instructions />
            )
          }
        </div>
      </header>
    );
  }
}


Header.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  onChangeColor: PropTypes.func.isRequired,
};

export default Header;

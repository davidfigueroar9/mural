import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonHeader from '../ButtonHeader';
import ColorPicker from '../ColorPicker';
import logo from '../../images/logo.svg';
import './styles.css';


class Header extends PureComponent {
  state = {
    openColorPicker: false,
  }

  onToggleColorPicker = () => {
    this.setState(state => ({
      openColorPicker: !state.openColorPicker,
    }));
  }

  render() {
    const {
      onDelete,
      selected,
      onOrder,
      onChangeColor,
    } = this.props;

    const { openColorPicker } = this.state;

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
                <ButtonHeader icon="dashboard" onClick={onOrder} />
                <ButtonHeader icon="palette" onClick={this.onToggleColorPicker} />
                <ButtonHeader icon="delete" onClick={onDelete} />
              </Fragment>
            )
          }
          <ButtonHeader icon="help" onClick={() => {}} />
          {
            openColorPicker && selected !== 0 && (
              <ColorPicker onPick={onChangeColor} />
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

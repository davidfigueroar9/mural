/* eslint-disable jsx-a11y/no-autofocus */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Note extends PureComponent {
  static propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    text: PropTypes.string.isRequired,
    onUpdateNote: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelectedNote: PropTypes.func.isRequired,
  };

  state = {
    editMode: false,
  };

  toogleEditMode = (event) => {
    event.stopPropagation();
    this.setState(state => ({ editMode: !state.editMode }));
  };

  onChangeText = (event) => {
    const newText = event.target.value;

    const { id, onUpdateNote } = this.props;

    onUpdateNote(id, { text: newText });
  }

  onSelectedNote = (event) => {
    event.stopPropagation();
    const { id, onSelectedNote } = this.props;
    onSelectedNote(id);
  }

  render() {
    const { position, text, selected } = this.props;
    const { editMode } = this.state;

    const styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
    };

    const contentNote = !editMode ? (
      <p>{ text }</p>
    ) : (
      <textarea
        autoFocus
        onBlur={this.toogleEditMode}
        onChange={this.onChangeText}
        defaultValue={text}
      />
    );

    return (

      <div className="Note" style={styles}>
        <div className={`select ${selected ? 'selected' : ''}`}>
          <div
            role="presentation"
            onClick={this.onSelectedNote}
            className="content"
            onDoubleClick={this.toogleEditMode}
          >
            { contentNote }
          </div>
        </div>
      </div>
    );
  }
}

export default Note;

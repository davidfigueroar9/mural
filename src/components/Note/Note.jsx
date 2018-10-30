/* eslint-disable jsx-a11y/no-autofocus */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../../context';
import './styles.css';

const NoteWithContext = props => (
  <NotesContext.Consumer>
    {({ getNoteById, onUpdateNote }) => {
      const note = getNoteById(props.id);
      return (
        <Note
          {...props}
          {...note}
          onUpdateNote={onUpdateNote}
        />
      );
    }}
  </NotesContext.Consumer>
);

class Note extends PureComponent {
  static propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    text: PropTypes.string.isRequired,
    onUpdateNote: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelectedNote: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
  };

  state = {
    editMode: false,
    isDragging: false,
  };

  previousLeft = 0;

  previousTop = 0;

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


  onDown = (event) => {
    this.setState({ isDragging: true });
    this.isClick = true;
    event.target.setPointerCapture(event.pointerId);
    this.extractPositionDelta(event);
  };


  onUp = () => {
    this.setState({ isDragging: false });
  };


  onMove = (event) => {
    const { isDragging } = this.state;
    if (!isDragging) {
      return;
    }
    const { position, onUpdateNote, id } = this.props;

    const { x, y } = this.extractPositionDelta(event);
    const newPosition = {
      x: position.x + x,
      y: position.y + y,
    };
    onUpdateNote(id, { position: newPosition });
  };


  extractPositionDelta = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    const delta = {
      x: x - this.previousLeft,
      y: y - this.previousTop,
    };
    this.previousLeft = x;
    this.previousTop = y;
    return delta;
  };

  render() {
    const {
      position,
      text,
      selected,
      color,
    } = this.props;
    const { editMode, isDragging } = this.state;

    const styles = {
      transform: `translate(${position.x}px, ${position.y}px)`,
    };

    const colorStyle = {
      backgroundColor: color,
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
      <div
        role="presentation"
        onPointerDown={this.onDown}
        onPointerMove={this.onMove}
        onPointerUp={this.onUp}
        onPointerCancel={this.onUp}
        onKeyDown={this.onKeyDown}
      >
        <div className={`Note ${isDragging ? 'dragging' : ''}`} style={styles}>
          <div className={`select ${selected ? 'selected' : ''}`}>
            <div
              role="presentation"
              onClick={this.onSelectedNote}
              className="content"
              style={colorStyle}
              onDoubleClick={this.toogleEditMode}
            >
              { contentNote }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export { Note };
export default NoteWithContext;

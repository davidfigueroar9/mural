import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../../context';
import Note from '../Note';
import Header from '../Header';
import './styles.css';


const BoardWithContext = () => (
  <NotesContext.Consumer>
    {({
      notesIds,
      onAddNote,
      unSelectAll,
      onSelectedNote,
      onCopy,
      onPaste,
    }) => (
      <Board
        notes={notesIds}
        onAddNote={onAddNote}
        unSelectAll={unSelectAll}
        onSelectedNote={onSelectedNote}
        onCopy={onCopy}
        onPaste={onPaste}
      />
    )}
  </NotesContext.Consumer>
);


class Board extends PureComponent {
  static propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddNote: PropTypes.func.isRequired,
    unSelectAll: PropTypes.func.isRequired,
    onSelectedNote: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onPaste: PropTypes.func.isRequired,
  };

  multiple = false;

  mousePosition = {};

  onKeyDown = (event) => {
    const { onPaste, onCopy } = this.props;
    this.multiple = event.shiftKey || event.metaKey;
    if ((event.ctrlKey && event.keyCode === 67) || (event.metaKey && event.keyCode === 67)) {
      onCopy();
    } else if ((event.ctrlKey && event.keyCode === 86) || (event.metaKey && event.keyCode === 86)) {
      onPaste(this.mousePosition);
    }
  }

  onMouseMove = (event) => {
    this.mousePosition = { x: event.pageX, y: event.pageY };
  }

  onKeyUp = () => {
    this.multiple = false;
  }

  onSelectedNote = (id) => {
    const { onSelectedNote } = this.props;
    onSelectedNote(id, this.multiple);
  }

  render() {
    const { onAddNote, notes, unSelectAll } = this.props;

    const renderNotes = notes.map(note => (
      <Note key={note} id={note} onSelectedNote={this.onSelectedNote} />
    ));

    return (
      <div
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        role="button"
        className="Board"
        onDoubleClick={onAddNote}
        onClick={unSelectAll}
        onMouseMove={this.onMouseMove}
      >
        <Header />
        { renderNotes }
      </div>
    );
  }
}

export { Board };
export default BoardWithContext;

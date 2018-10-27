import React, { Component } from 'react';
import Note from '../Note';
import './styles.css';

class Board extends Component {
  state = {
    notes: [],
  }

  onAddNote = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    this.setState(state => ({
      notes: [
        ...state.notes,
        {
          id: state.notes.length + 1,
          text: '',
          selected: false,
          position: {
            x: x - 90,
            y: y - 100,
          },
        },
      ],
    }));
  }

  unSelectAll = () => {
    const { notes } = this.state;
    const newNotes = notes.map(note => ({ ...note, selected: false }));
    this.setState({ notes: newNotes });
  }

  onUpdateNote = (id, body) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.id === id ? { ...note, ...body } : note
    ));
    this.setState({ notes: newNotes });
  };

  render() {
    const { notes } = this.state;
    return (
      <div role="presentation" className="Board" onDoubleClick={this.onAddNote} onClick={this.unSelectAll}>
        {
          notes.map(note => (
            <Note
              id={note.id}
              text={note.text}
              position={note.position}
              key={note.id}
              selected={note.selected}
              onUpdateNote={this.onUpdateNote}
            />
          ))
        }
      </div>
    );
  }
}

export default Board;

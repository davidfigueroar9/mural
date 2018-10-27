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
          text: 'Hola',
          position: {
            x,
            y,
          },
        },
      ],
    }));
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="Board" onDoubleClick={this.onAddNote}>
        {
          notes.map(note => (
            <Note id={note.id} text={note.text} position={note.position} key={note.id} />
          ))
        }
      </div>
    );
  }
}

export default Board;

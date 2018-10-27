import React, { Component } from 'react';
import Note from '../Note';
import './styles.css';

class Board extends Component {
  state = {
    notes: [],
  }

  onAddNote = (event) => {
    console.log(event);
    this.setState(state => ({
      notes: [
        ...state.notes,
        {
          id: state.notes.length + 1,
          text: 'Hola',
        },
      ],
    }));
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="Board" onDoubleClick={this.onAddNote}>
        {
          notes.map(note => <Note key={note.id} />)
        }
      </div>
    );
  }
}

export default Board;

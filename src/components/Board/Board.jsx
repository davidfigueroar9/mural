import React, { Component } from 'react';
import Note from '../Note';
import './styles.css';

class Board extends Component {
  state = {
    notes: [],
  }

  multiple = false;

  onAddNote = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const { notes } = this.state;
    const newNote = {
      id: notes.length + 1,
      text: '',
      selected: false,
      position: {
        x: x - 90,
        y: y - 100,
      },
    };
    this.setState(state => ({
      notes: [
        ...state.notes,
        newNote,
      ],
    }));
  }

  unSelectAll = () => {
    const { notes } = this.state;
    const newNotes = notes.map(note => ({ ...note, selected: false }));
    this.setState({ notes: newNotes });
  }

  onSelectedNote = (id) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.id === id
        ? { ...note, selected: true }
        : { ...note, selected: this.multiple ? note.selected : false }
    ));
    this.setState({ notes: newNotes });
  }

  onUpdateNote = (id, body) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.id === id ? { ...note, ...body } : note
    ));
    this.setState({ notes: newNotes });
  };

  onCheckMultiple = (event) => {
    this.multiple = event.shiftKey || event.keyCode === 93 || event.keyCode === 91;
  }

  onKeyUp = () => {
    this.multiple = false;
  }

  render() {
    const { notes } = this.state;

    const renderNotes = notes.map(note => (
      <Note
        id={note.id}
        text={note.text}
        position={note.position}
        key={note.id}
        selected={note.selected}
        onUpdateNote={this.onUpdateNote}
        onSelectedNote={this.onSelectedNote}
      />
    ));

    return (
      <div
        tabIndex="0"
        onKeyDown={this.onCheckMultiple}
        onKeyUp={this.onKeyUp}
        role="button"
        className="Board"
        onDoubleClick={this.onAddNote}
        onClick={this.unSelectAll}
      >
        { renderNotes }
      </div>
    );
  }
}

export default Board;

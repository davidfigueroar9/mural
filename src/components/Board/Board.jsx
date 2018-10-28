import React, { Component } from 'react';
import cuid from 'cuid';
import Note from '../Note';
import Header from '../Header';
import './styles.css';

class Board extends Component {
  state = {
    notes: [],
  }

  multiple = false;

  mousePosition = {};

  clipboard = [];

  onAddNote = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const newNote = {
      id: cuid(),
      text: '',
      selected: false,
      color: '#FFFFFF',
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

  onPasteNotes = () => {
    const { x, y } = this.mousePosition;
    const newNotes = this.clipboard.map(note => ({
      ...note,
      id: cuid(),
      selected: false,
      position: {
        x: x - 90,
        y: y - 100,
      },
    }));
    this.setState(state => ({
      notes: [
        ...state.notes,
        ...newNotes,
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

  onKeyDown = (event) => {
    this.multiple = event.shiftKey || event.metaKey;
    if ((event.ctrlKey && event.keyCode === 67) || (event.metaKey && event.keyCode === 67)) {
      const { notes } = this.state;
      this.clipboard = notes.filter(note => note.selected);
    } else if ((event.ctrlKey && event.keyCode === 86) || (event.metaKey && event.keyCode === 86)) {
      this.onPasteNotes();
    }
  }

  onMouseMove = (event) => {
    this.mousePosition = { x: event.pageX, y: event.pageY };
  }

  onKeyUp = () => {
    this.multiple = false;
  }

  onDelete = () => {
    const { notes } = this.state;
    this.setState({ notes: notes.filter(note => !note.selected) });
  }

  onChangeColor = (color) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.selected
        ? { ...note, color }
        : { ...note }
    ));
    this.setState({ notes: newNotes });
  }

  onOrder = () => {
    const { notes } = this.state;
    let notesSeleted = notes.filter(note => note.selected);
    const notesUnSeleted = notes.filter(note => !note.selected);

    notesSeleted = notesSeleted.map((note, index) => ({
      ...note,
      position: {
        y: 50,
        x: 10 + (180 * index),
      },
    }));

    this.setState({ notes: [...notesUnSeleted, ...notesSeleted].sort((a, b) => a.id > b.id) });
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
        color={note.color}
      />
    ));

    return (
      <div
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        role="button"
        className="Board"
        onDoubleClick={this.onAddNote}
        onClick={this.unSelectAll}
        onMouseMove={this.onMouseMove}
      >
        <Header
          onDelete={this.onDelete}
          onOrder={this.onOrder}
          selected={notes.filter(note => note.selected).length}
          onChangeColor={this.onChangeColor}
        />
        { renderNotes }
      </div>
    );
  }
}

export default Board;

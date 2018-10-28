import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

const NotesContext = createContext();
const emptyNotes = [];

class NotesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    notes: this.props.notes || emptyNotes,
  };

  clipboard = emptyNotes;

  onAddNote = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const { notes } = this.state;
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
    const newNotes = [
      ...notes,
      newNote,
    ];
    this.setNotesState({ notes: newNotes });
  }

  onUpdateNote = (id, body) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.id === id ? { ...note, ...body } : note
    ));
    this.setNotesState({ notes: newNotes });
  };

  getNoteById = (id) => {
    const { notes } = this.state;
    return notes.find(note => note.id === id);
  };

  unSelectAll = () => {
    const { notes } = this.state;
    const newNotes = notes.map(note => ({ ...note, selected: false }));
    this.setNotesState({ notes: newNotes });
  }

  onSelectedNote = (id, multiple) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.id === id
        ? { ...note, selected: true }
        : { ...note, selected: multiple ? note.selected : false }
    ));
    this.setNotesState({ notes: newNotes });
  }

  onChangeColor = (color) => {
    const { notes } = this.state;
    const newNotes = notes.map(note => (
      note.selected
        ? { ...note, color }
        : { ...note }
    ));
    this.setNotesState({ notes: newNotes });
  }

  onDelete = () => {
    const { notes } = this.state;
    this.setNotesState({ notes: notes.filter(note => !note.selected) });
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
    this.setNotesState({ notes: [...notesUnSeleted, ...notesSeleted] });
  }

  onCopy = () => {
    const { notes } = this.state;
    this.clipboard = notes.filter(note => note.selected);
  }

  onPaste = ({ x, y }) => {
    const newNotes = this.clipboard.map((note, index) => ({
      ...note,
      id: cuid(),
      selected: false,
      position: {
        x: (x - 90) + (180 * index),
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

  setNotesState = (state) => {
    this.setState(() => ({
      ...state,
    }), () => localStorage.setItem('muralInitialState', JSON.stringify(this.state)));
  }

  render() {
    const { notes } = this.state;
    const { children } = this.props;
    const selected = notes.filter(n => n.selected).length;
    const ids = notes.map(n => n.id).sort((a, b) => {
      const value = a > b ? 1 : -1;
      return (value);
    });
    return (
      <NotesContext.Provider
        value={{
          notesIds: ids,
          getNoteById: this.getNoteById,
          onAddNote: this.onAddNote,
          onSelectedNote: this.onSelectedNote,
          onUpdateNote: this.onUpdateNote,
          unSelectAll: this.unSelectAll,
          onChangeColor: this.onChangeColor,
          selected,
          onDelete: this.onDelete,
          onOrder: this.onOrder,
          onCopy: this.onCopy,
          onPaste: this.onPaste,
        }}
      >
        {children}
      </NotesContext.Provider>
    );
  }
}

export { NotesProvider };
export default NotesContext;

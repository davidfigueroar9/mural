import React from 'react';
import { NotesProvider } from './context';
import Board from './components/Board';

const state = localStorage.getItem('muralInitialState')
  ? JSON.parse(localStorage.getItem('muralInitialState'))
  : {};

const App = () => (
  <NotesProvider notes={state.notes}>
    <Board />
  </NotesProvider>
);

export default App;

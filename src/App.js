import React from 'react';
import { NotesProvider } from './context';
import Board from './components/Board';

const App = () => (
  <NotesProvider>
    <Board />
  </NotesProvider>
);

export default App;

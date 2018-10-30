import React from 'react';
import { NotesProvider } from './context';
import MainBoard from './components/Board';

const state = localStorage.getItem('muralInitialState')
  ? JSON.parse(localStorage.getItem('muralInitialState'))
  : {};

const App = () => (
  <NotesProvider notes={state.notes}>
    <MainBoard />
  </NotesProvider>
);

export default App;

import React from 'react';

import './styles.css';

const Instructions = () => (
  <div className="Instructions">
    <header>Instructions</header>
    <div className="content">
      <p>
        Add note:
        <code>Double click</code>
      </p>
      <p>
        Edit note:
        <code>Double click</code>
      </p>
      <p>
        Select Note:
        <code>Click</code>
      </p>
      <p>
        Select multiple:
        <code>Shift + click</code>
      </p>
      <p>
        Copy:
        <code>Ctrl + C</code>
      </p>
      <p>
        Paste:
        <code>Ctrl + V</code>
      </p>
    </div>
  </div>
);


export default Instructions;

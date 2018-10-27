import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Note = ({ position }) => {
  const styles = {
    position: 'absolute',
    transform: `translate(${position.x}px, ${position.y}px)`,
  };
  return (
    <div style={styles} className="Note" />
  );
};

Note.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default Note;

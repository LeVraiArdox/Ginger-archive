import React from 'react';

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ginger Archive</h2>
        <p>Auteur: Adrian Arjoca [ardox@axos-project.com]</p>
        <p>&copy; 2024 Ardox</p>
        <p>
          GitHub: <a href="https://github.com/LeVraiArdox" target="_blank" rel="noopener noreferrer">LeVraiArdox</a>
        </p>
        <button className="close-button" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default AboutModal;

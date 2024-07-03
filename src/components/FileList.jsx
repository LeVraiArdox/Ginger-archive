import React from 'react';
import '../styles.css'; // Assurez-vous d'importer vos styles CSS

function FileList({ files, onFileClick, onDeleteClick }) {
  return (
    <div className="file-list">
      {files.map((file, index) => (
        <div key={index} className="file-item" onClick={() => onFileClick(file)}>
          {file}
          <button className='delete-button' onClick={() => onDeleteClick(file)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default FileList;

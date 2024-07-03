import React from 'react';
import '../styles.css'; // Assurez-vous d'importer vos styles CSS

function FileList({ files, onFileClick }) {
  return (
    <div className="file-list">
      {files.map((file, index) => (
        <div key={index} className="file-item" onClick={() => onFileClick(file)}>
          {file}
        </div>
      ))}
    </div>
  );
}

export default FileList;

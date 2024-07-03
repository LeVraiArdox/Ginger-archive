import React from 'react';
import '../styles.css'; // Importer vos styles CSS

function FileUpload({ onUpload }) {
  const handleUpload = () => {
    // Gestion de l'upload ici
    onUpload();
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleUpload} />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;

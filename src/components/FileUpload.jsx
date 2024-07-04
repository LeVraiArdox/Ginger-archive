import React, { useState } from 'react';

function FileUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          onUpload(result.file);
          setSelectedFile(null);  // Clear the selected file after upload
        } else {
          alert('Failed to upload file');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload file');
      }
    }
  };

  return (
    <div>
    <div className="file-upload">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
      Importer
      <input type="file" onChange={handleFileChange} />
    </div>
    {selectedFile && (
        <div>
          <p>Fichier choisi: {selectedFile.name}</p>
          <button onClick={handleUpload}>Confirmer</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

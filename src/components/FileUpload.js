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
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={handleUpload}>Confirmer</button>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

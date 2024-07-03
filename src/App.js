import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/files');
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const files = await response.json();
      setFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUpload = () => {
    fetchFiles();  // Refresh the file list after upload
    setSelectedFile(null);
  };

  const handleFileClick = (file) => {
    // Ouvrir le fichier PDF dans un nouvel onglet
    window.open(`http://localhost:5000/${file}`, '_blank');
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="app">
      <h1>PDF Archive</h1>
      <FileUpload onUpload={handleUpload} />
      <FileList files={files} onFileClick={handleFileClick} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import SearchBar from './components/SearchBar';
import AboutModal from './components/AboutModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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

  const handleFileDeletion = (file) => {
    // Supprimer le fichier du serveur
    try {
      const response = fetch(`http://localhost:5000/delete/${file}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete file ${file}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="app">
        <Toaster position="top-center" reverseOrder={false} />
        <h1>Ginger Archive</h1>
        <FileUpload onUpload={handleUpload} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="app2">
        <FileList files={filteredFiles} onFileClick={handleFileClick} onDeleteClick={handleFileDeletion} />
      </div>
      <button className="about-button" onClick={() => setIsAboutOpen(true)}>A propos</button>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}

export default App;

import React from 'react';

function FileList({ files, onFileClick }) {
  return (
    <div className="file-list">
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => onFileClick(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;

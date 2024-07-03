import React from 'react';

function PdfLink({ file }) {
  return (
    <div className="pdf-link">
      <a href={`http://localhost:5000/${file}`} target="_blank" rel="noopener noreferrer">
        Ouvrir le PDF
      </a>
    </div>
  );
}

export default PdfLink;

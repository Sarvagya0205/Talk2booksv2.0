import { useState } from 'react';
import './UploadModal.css';

export default function UploadModal({ isOpen, onClose, onUpload }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !file) return;
    setLoading(true);
    try {
      await onUpload(title, author, file);
      setTitle('');
      setAuthor('');
      setFile(null);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="modal-content glass-card animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Upload a Book</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="upload-title">Title</label>
            <input
              id="upload-title"
              type="text"
              className="input-field"
              placeholder="Enter book title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="upload-author">Author</label>
            <input
              id="upload-author"
              type="text"
              className="input-field"
              placeholder="Enter author name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>PDF File</label>
            <div
              className={`file-drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              {file ? (
                <div className="file-info">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{file.name}</span>
                </div>
              ) : (
                <div className="file-placeholder">
                  <span className="drop-icon">📁</span>
                  <p>Drag & drop a PDF here or <span className="browse-link">browse</span></p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary modal-submit"
            disabled={loading || !title || !author || !file}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>📤 Upload Book</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

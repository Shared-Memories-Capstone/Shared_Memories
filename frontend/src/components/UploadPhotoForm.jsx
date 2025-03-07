import { useState } from 'react';
import { uploadPhoto } from '../services/uploadPhoto';
import './UploadPhotoForm.css';

const UploadPhotoForm = ({ eventId, onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    try {
      setIsUploading(true);
      const result = await uploadPhoto(file, eventId);
      onUploadSuccess?.(result);
      setPreview(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-photo-container" data-testid="upload-form">
      <h3 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>Share Your Photos ✨</h3>
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            {isUploading && (
              <div className="upload-overlay">
                <div className="upload-progress">Uploading...</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="upload-icon">📸</div>
            <p className="mb-3">Drag and drop your photo here</p>
            <p className="text-muted mb-3">or</p>
            <label className="upload-button">
              Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPhotoForm;

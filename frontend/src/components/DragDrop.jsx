import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { API_URL } from "../services/auth";
const fileTypes = ["JPG", "PNG", "GIF"];

// Drag and drop box, plugging this into the access code card for now until having a page for it?
function DragDrop({ eventId }) {
  const [file, setFile] = useState(null);

  const handleChange = async (file) => {
    setFile(file);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('event', 1);
    formData.append('uploaded_by', 'User'); // You'll want to get this from your auth context
    formData.append('original_file_name', file.name);

    try {
      const response = await axios.post(`${API_URL}/upload-photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}

export default DragDrop;
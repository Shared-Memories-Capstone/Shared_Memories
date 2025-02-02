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
    formData.append('event', 1); // for now we set 1 here just for testing, phase II will include event specific upload
    formData.append('uploaded_by', 'User'); // for now we set User here, idk if we will even need uploaded_by or if we want it to be an ip address??
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
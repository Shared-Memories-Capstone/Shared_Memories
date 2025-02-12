import axios from 'axios';

export const uploadPhoto = async (file, eventId, uploadedBy = 'Guest') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('event', eventId);
  formData.append('uploaded_by', uploadedBy);
  formData.append('original_file_name', file.name);

  try {
    const response = await axios.post(
      'http://localhost:8000/api/upload-photo/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload photo');
  }
};

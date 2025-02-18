import axios from 'axios';
// Use Vite's env variable (make sure it’s prefixed with VITE_)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const uploadPhoto = async (file, eventId, uploadedBy = 'Guest') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('event', eventId);
    formData.append('uploaded_by', uploadedBy);
    formData.append('original_file_name', file.name);

    try {
        const response = await axios.post(
            `${API_URL}/upload-photo/`,
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

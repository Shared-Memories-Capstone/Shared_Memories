import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; //  Get query string values
import axios from 'axios'; //  Use axios for API request
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import UploadPhotoForm from './UploadPhotoForm.jsx';
export default function EventPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); //  Get query params from URL
  const eventId = searchParams.get("event"); //  Extract `event` from query string
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]); //  Store fetched photos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchEventAndPhotos();
  }, [eventId]);

  // Add new useEffect for success message timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000); // Message will disappear after 3 seconds
      
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [success]);
  
    const fetchEventAndPhotos = async () => {
      try {
        if (!eventId) {
          navigate('/');
          return;
        }
        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:8000/api/events/${eventId}/`);
        setEvent(eventResponse.data);
        
        // Fetch photos
        const photosResponse = await axios.get(`http://localhost:8000/api/photos/?event=${eventId}`);
        setPhotos(photosResponse.data);
      } catch (error) {
        setError("Unable to load event content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

  const handleUploadSuccess = () => {
    fetchEventAndPhotos();
    setSuccess("Photo uploaded successfully!");
  };

  if (loading) return <div className="text-center mt-5">Loading event...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!event) return <div className="text-center mt-5">Event not found</div>;

  return (
    <MDBContainer className="py-5">
      <MDBRow className="mb-3">
        <MDBCol className="text-start">
          <h1 className="display-4 mb-3">Welcome to {event.event_title}</h1>
          <h2 className="text-muted mb-4">
          {new Date(event.event_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h2>
        <p className="lead text-muted" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {event.event_description}
        </p>
      </MDBCol>
        <MDBCol>
          {success && <div className="text-center text-success">{success}</div>}
          <UploadPhotoForm eventId={eventId} onUploadSuccess={handleUploadSuccess} />
        </MDBCol>
      </MDBRow>
      {photos.length === 0 ? (
        <div className="text-center mt-4">No photos have been shared yet.</div>
      ) : (
        <MDBRow className="g-4">
          {photos.map((photo, index) => (
            <MDBCol lg={4} md={6} key={photo.photo_id || index}>
              <img
                src={photo.image_url}
                className="w-100 shadow-1-strong rounded"
                alt={photo.original_file_name}
                style={{ 
                  height: '300px', 
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
              />
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
}

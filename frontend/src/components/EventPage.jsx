import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; //  Get query string values
import axios from 'axios'; //  Use axios for API request
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function EventPage() {
  const [searchParams] = useSearchParams(); //  Get query params from URL
  const eventId = searchParams.get("event"); //  Extract `event` from query string

  const [photos, setPhotos] = useState([]); //  Store fetched photos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (!eventId) {
          throw new Error("No event ID provided in query string.");
        }
        const response = await axios.get(`http://localhost:8000/api/photos/?event=${eventId}`);
        setPhotos(response.data); //  Set photos from API response
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [eventId]);

  return (
    <MDBContainer>
      <h1 className="text-center mt-4">Event Gallery</h1>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && photos.length === 0 && <p>No images found for this event.</p>}

      {!loading && !error && photos.length > 0 && (
        <MDBRow>
          {photos.map((photo, index) => (
            <MDBCol lg={4} md={6} sm={12} key={index} className="mb-4">
              <img
                src={photo.url}
                className="w-100 shadow-1-strong rounded"
                alt={photo.alt || `Event Image ${index + 1}`}
              />
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
}

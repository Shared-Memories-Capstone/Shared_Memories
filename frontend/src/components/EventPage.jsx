import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get event ID from URL
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function EventPage() {
  const { eventId } = useParams(); // Get event ID from URL params
  const [images, setImages] = useState([]); // Store fetched images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`http://localhost:8000/api/events/${eventId}/images/`); // Replace with your backend API URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data); // Assuming the API returns an array of image objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [eventId]);

  return (
    <MDBContainer>
      <h1 className="text-center mt-4">Event Gallery</h1>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <MDBRow>
          {images.map((image, index) => (
            <MDBCol lg={4} md={6} sm={12} key={index} className="mb-4">
              <img
                src={image.url} // Make sure the backend sends the correct image URL
                className="w-100 shadow-1-strong rounded"
                alt={image.alt || `Event Image ${index + 1}`}
              />
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
}

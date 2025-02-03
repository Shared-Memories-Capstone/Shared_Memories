import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import PropTypes from 'prop-types';

function GalleryCarousel({eventId = 1}) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/photos/?event=${eventId}`);
        setPhotos(response.data); // set the photos to the response data
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [eventId]);

  return (
    <div className="container">
      <h1>Gallery</h1>
      {/* if the photos length is greater than 0 then show be the photos, else show no photos found */}
      {photos.length > 0 ? (
        <Carousel data-bs-theme="dark">
          {photos.map((photo) => (
            <Carousel.Item key={photo.photo_id}>
          <img 
            src={photo.image_url}
            alt={photo.original_file_name}
            style={{ maxHeight: '500px', width: 'auto', margin: 'auto' }}
          />
          <Carousel.Caption>
            <p>{photo.original_file_name}</p>
          </Carousel.Caption>
          </Carousel.Item>
        ))}
          </Carousel>
        ) : (
          <p>No photos found</p>
        )}
    </div>
  );
}

GalleryCarousel.propTypes = {
  eventId: PropTypes.number.isRequired
};

export default GalleryCarousel;
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function GalleryCarousel() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/photos/');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
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
  );
}

export default GalleryCarousel;
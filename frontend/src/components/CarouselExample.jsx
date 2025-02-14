import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';

export default function CarouselExample() {
  // Array of local images
  const photos = [
    { url: image1, alt: 'Image 1' },
    { url: image2, alt: 'Image 2' },
    { url: image3, alt: 'Image 3' },
    { url: image4, alt: 'Image 4' },
  ];

  return (
    <MDBContainer>
      <h1 className="text-center mt-4">Local Image Gallery</h1>

      {photos.length === 0 && <p>No images found.</p>}

      {photos.length > 0 && (
        <MDBRow>
          {photos.map((photo, index) => (
            <MDBCol lg={4} md={6} sm={12} key={index} className="mb-4">
              <img
                src={photo.url}
                className="w-100 shadow-1-strong rounded"
                alt={photo.alt || `Image ${index + 1}`}
              />
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
}

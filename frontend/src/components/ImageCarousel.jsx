import { Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({ show, onHide, photos }) => {
  return (
    <Modal show={show} onHide={onHide} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'var(--primary-color)' }}>
          ✨ Slideshow
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-dark">
        <Carousel 
          interval={3000} 
          className="image-carousel" 
          controls={true}
          indicators={true}
          autoPlay={true}
        >
          {photos.map((photo, index) => (
            <Carousel.Item key={photo.photo_id || index}>
              <div style={{
                height: '90vh',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={photo.image_url}
                  alt={photo.original_file_name}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default ImageCarousel; 
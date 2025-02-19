import { Modal, Carousel } from 'react-bootstrap';

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
          fade
          interval={3000}
          defaultActiveIndex={0}
          controls={true}
          indicators={true}
          pause={false}
          wrap={true}
          className="image-carousel"
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
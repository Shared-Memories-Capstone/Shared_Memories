import Carousel from 'react-bootstrap/Carousel';
import firstSlide from '../assets/1.png';
import secondSlide from '../assets/2.png';
import thirdSlide from '../assets/3.png';

function CarouselExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img src={firstSlide}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={secondSlide}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={thirdSlide} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselExample;

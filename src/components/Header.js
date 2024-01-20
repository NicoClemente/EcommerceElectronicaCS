 
import React from 'react';
import { Container, Carousel } from 'react-bootstrap';


const Header = () => {
  return (
    <div>
      <Carousel interval={5000} className="mb-5 ">
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.pcfactory.cl/public/foto/imbatible/6_2817.jpg"
            alt="Primera diapositiva"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.pcfactory.cl/public/foto/imbatible/1_2909.png"
            alt="Segunda diapositiva"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.pcfactory.cl/public/foto/imbatible/10_6219.jpg"
            alt="Tercedra diapositiva"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.pcfactory.cl/public/foto/imbatible/8_5174.jpg"
            alt="Cuarta diapositiva"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://www.pcfactory.cl/public/foto/imbatible/5_8984.jpg"
            alt="Quinta diapositiva"
          />
        </Carousel.Item>
      </Carousel>

      <div className="custom-welcome-section text-center">
        <Container>
          <h1 className="display-4 fw-bold text-dark">Bienvenido a ElectrónicaCS</h1>
          <p className="lead">
          Somos tu destino de confianza para encontrar lo mejor en tecnología y electrónica. Descubre nuestra cuidadosa selección de productos de vanguardia, diseñada para brindarte experiencias excepcionales. ¡Explora ahora y lleva a casa la innovación que estabas buscando!
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Header;

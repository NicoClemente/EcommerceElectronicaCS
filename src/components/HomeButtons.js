import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeButtons = () => {
  const buttonStyle = {
    height: '200px',
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <Container className="mt-5 my-5 d-flex justify-content-center">
      <Row>
        <Col xs={12} md={4} className="mb-3">
          <Button as={Link} to="/shop" variant="primary" className='bg-dark' style={buttonStyle}>
            <span role="img" aria-label="Shop" style={{ fontSize: '4em' }}>
              🛍️
            </span>
            <span style={{ marginTop: '10px' }}>Shop</span>
          </Button>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Button as={Link} className='bg-dark' to="/contacto" variant="primary" style={buttonStyle}>
            <span role="img" aria-label="Contacto" style={{ fontSize: '4em' }}>
              📒
            </span>
            <span style={{ marginTop: '10px' }}>Contactanos</span>
          </Button>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Button as={Link} className='bg-dark' to="/login" variant="primary" style={buttonStyle}>
            <span role="img" aria-label="Log In" style={{ fontSize: '4em' }}>
              🙋
            </span>
            <span style={{ marginTop: '10px' }}>Log In</span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeButtons;
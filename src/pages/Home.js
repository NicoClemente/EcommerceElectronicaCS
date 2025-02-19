import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import HomeButtons from '../components/HomeButtons';

const Home = () => {
  return (
    <Container className="mb-4">
      <Header />
      <HomeButtons />
    </Container>
  );
};

export default Home;
import React from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import ProfileEditForm from '../components/ProfileEditForm';
import PasswordChangeForm from '../components/PasswordChangeForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Perfil = () => {
  const { user } = useAuth();

  // Redirecciona si no hay usuario autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h2 className="h5 mb-0">Mi Perfil</h2>
            </Card.Header>
            <Card.Body>
              <Tabs defaultActiveKey="profile" className="mb-4">
                <Tab eventKey="profile" title="Información Personal">
                  <ProfileEditForm />
                </Tab>
                <Tab eventKey="password" title="Cambiar Contraseña">
                  <PasswordChangeForm />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
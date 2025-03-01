import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import HomeButtons from '../components/HomeButtons';
import { Link } from 'react-router-dom';

const Home = () => {
  // Podemos agregar algunas secciones adicionales para modernizar la página principal
  
  // Categorías destacadas
  const featuredCategories = [
    {
      name: 'Smartphones',
      image: '/images/category-smartphones.jpg',
      description: 'Los últimos modelos de las mejores marcas con garantía oficial.'
    },
    {
      name: 'Computadoras',
      image: '/images/category-computers.jpg',
      description: 'Portátiles y de escritorio con las mejores configuraciones.'
    },
    {
      name: 'Electrodomésticos',
      image: '/images/category-appliances.jpg',
      description: 'Todo lo que necesitas para equipar tu hogar con tecnología de punta.'
    },
    {
      name: 'Audio',
      image: '/images/category-audio.jpg',
      description: 'Sumérgete en una experiencia sonora excepcional.'
    }
  ];
  
  // Productos destacados (estos deberían venir de tu API en un caso real)
  const featuredProducts = [
    {
      id: '1',
      title: 'Smartphone Galaxy S23',
      image: '/images/product-smartphone.jpg',
      price: 250000,
      category: 'Smartphones'
    },
    {
      id: '2',
      title: 'Notebook Lenovo ThinkPad',
      image: '/images/product-laptop.jpg',
      price: 450000,
      category: 'Computadoras'
    },
    {
      id: '3',
      title: 'Televisor Smart 55"',
      image: '/images/product-tv.jpg',
      price: 320000,
      category: 'Televisores'
    },
    {
      id: '4',
      title: 'Auriculares Bluetooth',
      image: '/images/product-headphones.jpg',
      price: 35000,
      category: 'Audio'
    }
  ];

  return (
    <div className="home-page">
      {/* Header mejorado con carrusel y sección de bienvenida */}
      <Header />
      
      {/* Sección de botones de navegación mejorada */}
      <HomeButtons />
      
      {/* Nueva sección: Categorías destacadas */}
      <section className="featured-categories py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 position-relative pb-3">
            Categorías Destacadas
            <span className="position-absolute start-50 translate-middle-x" style={{
              bottom: 0,
              height: '4px',
              width: '80px',
              backgroundColor: '#0d6efd',
              borderRadius: '2px'
            }}></span>
          </h2>
          
          <Row className="g-4">
            {featuredCategories.map((category, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-sm category-card">
                  <div className="category-img-container">
                    <Card.Img 
                      variant="top" 
                      src={category.image} 
                      alt={category.name}
                      className="category-img"
                    />
                    <div className="category-overlay">
                      <h4 className="category-title mb-0">{category.name}</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <p className="card-text">{category.description}</p>
                    <Link 
                      to="/shop" 
                      className="stretched-link text-decoration-none"
                    >
                      Ver productos <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* Nueva sección: Productos destacados */}
      <section className="featured-products py-5">
        <Container>
          <h2 className="text-center mb-5 position-relative pb-3">
            Productos Destacados
            <span className="position-absolute start-50 translate-middle-x" style={{
              bottom: 0,
              height: '4px',
              width: '80px',
              backgroundColor: '#0d6efd',
              borderRadius: '2px'
            }}></span>
          </h2>
          
          <Row className="g-4">
            {featuredProducts.map((product, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0 shadow-sm product-card">
                  <div className="product-badge">
                    {index === 0 && <span className="badge bg-danger">Nuevo</span>}
                    {index === 1 && <span className="badge bg-success">Oferta</span>}
                  </div>
                  <div className="product-img-container">
                    <Card.Img 
                      variant="top" 
                      src={product.image} 
                      alt={product.title}
                      className="product-img"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <span className="text-muted small mb-1">{product.category}</span>
                    <Card.Title className="mb-2">{product.title}</Card.Title>
                    <div className="product-rating mb-2">
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-half text-warning"></i>
                      <small className="ms-1 text-muted">(4.5)</small>
                    </div>
                    <div className="product-price mt-auto mb-3">
                      <h5 className="mb-0 text-primary">${product.price.toLocaleString()}</h5>
                    </div>
                    <div className="d-grid">
                      <Button variant="outline-primary">Ver Detalles</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="text-center mt-5">
            <Button 
              as={Link}
              to="/shop"
              variant="primary"
              size="lg"
              className="px-5"
            >
              Ver Todos los Productos
            </Button>
          </div>
        </Container>
      </section>
      
      {/* Nueva sección: Banner promocional */}
      <section className="promo-banner my-5">
        <div className="banner-container">
          <div className="banner-bg">
            <Container>
              <Row className="align-items-center">
                <Col lg={6} className="py-5">
                  <h2 className="banner-title mb-3">¡Ofertas especiales!</h2>
                  <p className="banner-text mb-4">
                    Hasta 30% de descuento en productos seleccionados.
                    No te pierdas estas increíbles promociones por tiempo limitado.
                  </p>
                  <Button 
                    as={Link}
                    to="/shop"
                    variant="light"
                    size="lg"
                    className="banner-btn"
                  >
                    Ver Ofertas
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
      
      {/* Estilos CSS para la página Home */}
      <style jsx="true">{`
        /* Categorías destacadas */
        .category-img-container {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        
        .category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .category-card:hover .category-img {
          transform: scale(1.1);
        }
        
        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 15px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
          color: white;
        }
        
        .category-title {
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        /* Productos destacados */
        .product-card {
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .product-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
        }
        
        .product-img-container {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .product-img {
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        
        /* Banner promocional */
        .promo-banner {
          position: relative;
        }
        
        .banner-container {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
        
        .banner-bg {
          background: linear-gradient(45deg, #0d6efd, #0dcaf0);
          color: white;
          min-height: 300px;
          position: relative;
        }
        
        .banner-bg::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background-image: url('/images/promo-banner-bg.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
        }
        
        .banner-title {
          font-size: 2.5rem;
          font-weight: 700;
        }
        
        .banner-text {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .banner-btn {
          padding: 0.75rem 2rem;
          font-weight: 500;
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .category-img-container {
            height: 150px;
          }
          
          .product-img-container {
            height: 180px;
          }
          
          .banner-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
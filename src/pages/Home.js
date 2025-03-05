import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import Header from '../components/Header';
import HomeButtons from '../components/HomeButtons';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../services/api';

const Home = ({ agregarAlCarrito }) => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductosDestacados = async () => {
      try {
        setLoading(true);
        const productos = await obtenerProductos();
        const destacados = productos.filter(producto => producto.destacado);
        setProductosDestacados(destacados.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar productos destacados:', error);
        setLoading(false);
      }
    };

    cargarProductosDestacados();
  }, []);

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

  return (
    <div className="home-page">
      <Header />
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

      {/* Sección de productos destacados actualizada para usar datos de la API */}
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

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando productos destacados...</p>
            </div>
          ) : productosDestacados.length > 0 ? (
            <Row className="g-4">
              {productosDestacados.map((product, index) => (
                <Col md={6} lg={3} key={product._id || index}>
                  <Card className="h-100 border-0 shadow-sm product-card">
                    <div className="product-badge">
                      {index === 0 && <span className="badge bg-danger">Nuevo</span>}
                      {index === 1 && <span className="badge bg-success">Oferta</span>}
                    </div>
                    <div className="product-img-container">
                      <Card.Img
                        variant="top"
                        src={product.imagen}
                        alt={product.titulo}
                        className="product-img"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <span className="text-muted small mb-1">{product.categoria}</span>
                      <Card.Title className="mb-2">{product.titulo}</Card.Title>
                      <div className="product-price mt-auto mb-3">
                        <h5 className="mb-0 text-primary">${Number(product.precio).toLocaleString()}</h5>
                      </div>
                      <div className="d-flex flex-column">
                        <Button
                          variant="outline-primary"
                          className="w-100 mb-2"
                          as={Link}
                          to={`/shop?product=${product._id}`}
                        >
                          Ver Detalles
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => agregarAlCarrito && agregarAlCarrito(product)}
                          className="w-100"
                        >
                          <i className="bi bi-cart-plus me-2"></i>Agregar al Carrito
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No hay productos destacados actualmente</p>
            </div>
          )}

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
        /* Los estilos CSS se mantienen iguales */
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
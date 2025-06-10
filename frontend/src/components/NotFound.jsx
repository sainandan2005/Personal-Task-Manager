import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body className="py-5 px-4">
              <div className="mb-4" style={{ opacity: 0.9 }}>
                <i className="bi bi-exclamation-triangle-fill display-1" style={{ color: 'var(--priority-high)' }}></i>
              </div>
              <h1 className="display-5 mb-3" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Page Not Found</h1>
              <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Button 
                as={Link} 
                to="/" 
                variant="primary" 
                size="lg" 
                className="px-4 py-2 mt-2"
                style={{ boxShadow: '0 4px 12px rgba(100, 160, 255, 0.3)' }}
              >
                <i className="bi bi-house-door me-2"></i> Return Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

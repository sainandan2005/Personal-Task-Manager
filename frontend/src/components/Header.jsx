import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" className="mb-4 py-3" style={{
      position: 'relative',
      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0% 100%)',
      zIndex: 1000
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          <div style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'rgba(100, 160, 255, 0.15)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}></div>
            <i className="bi bi-check2-circle text-primary" style={{
              fontSize: "1.5rem",
              position: 'relative',
              zIndex: 1
            }}></i>
          </div>
          <span className="fs-4" style={{ position: 'relative' }}>
            <span className="text-light" style={{ fontWeight: 700 }}>Task</span>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>Manager</span>
            {/* Small geometric accent */}
            <div style={{
              position: 'absolute',
              right: '-12px',
              top: '0',
              width: '10px',
              height: '10px',
              background: 'rgba(100, 160, 255, 0.3)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}></div>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Link 
            to="/tasks/create" 
            className="btn-geometric px-3 py-2"
            style={{ minWidth: 'auto', marginTop: 0 }}
            onClick={(e) => {
              // Add ripple effect on click
              const button = e.currentTarget;
              const ripple = document.createElement('span');
              const rect = button.getBoundingClientRect();
              
              ripple.className = 'ripple';
              ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
              ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px';
              ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px';
              
              button.appendChild(ripple);
              
              setTimeout(() => ripple.remove(), 600);
            }}
          >New Task
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

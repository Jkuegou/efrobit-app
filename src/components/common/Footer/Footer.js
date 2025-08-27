import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Radio, Heart, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <div className="footer-brand">
              <Radio size={24} className="me-2" />
              <span>AfroBiteFM</span>
            </div>
            <p className="footer-description">
              Your ultimate destination for live radio streaming and podcast listening.
              Discover amazing content from talented hosts around the world.
            </p>
          </Col>
          
          <Col md={4} className="mb-4">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/direct">Live Radio</a></li>
              <li><a href="/podcasts">Podcasts</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>
          
          <Col md={4} className="mb-4">
            <h6 className="footer-title">Contact Info</h6>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} className="me-2" />
                <span>contact@AfroBiteFM.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="me-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            
            <div className="social-links mt-3">
              <a href="#" className="social-link">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col className="text-center">
            <p className="copyright">
              © 2025 AfroBiteFM. Made with <Heart size={14} className="text-danger" /> by our team.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
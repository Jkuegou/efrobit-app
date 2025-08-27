import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-bootstrap/LinkContainer';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { Radio, User, LogOut, Settings } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="brand">
            <Radio size={24} className="me-2" />
            AfroBiteFM
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>{t('nav.home')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/direct">
              <Nav.Link>{t('nav.direct')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/podcasts">
              <Nav.Link>{t('nav.podcasts')}</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="align-items-center">
            <NavDropdown title="Language" id="language-dropdown" className="me-3">
              <NavDropdown.Item onClick={() => changeLanguage('en')}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('fr')}>
                Français
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('es')}>
                Español
              </NavDropdown.Item>
            </NavDropdown>

            {user ? (
              <NavDropdown
                title={
                  <span>
                    <User size={16} className="me-1" />
                    {user.name}
                  </span>
                }
                id="user-dropdown"
              >
                {user.role === 'admin' && (
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>
                      <Settings size={16} className="me-2" />
                      {t('nav.admin')}
                    </NavDropdown.Item>
                  </LinkContainer>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <LogOut size={16} className="me-2" />
                  {t('nav.logout')}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="auth-buttons">
                <LinkContainer to="/login">
                  <Button variant="outline-light" size="sm" className="me-2">
                    {t('nav.login')}
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="primary" size="sm">
                    {t('nav.register')}
                  </Button>
                </LinkContainer>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
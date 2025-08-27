import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Login from '../../components/auth/Login/Login';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await login(formData.email, formData.password);
      toast.success(t('auth.loginSuccess'));
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || t('auth.loginError');
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="auth-card">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="auth-title">{t('auth.login')}</h2>
                <p className="text-muted">Welcome back! Please sign in to your account.</p>
              </div>
              
              <Login onSubmit={handleLogin} loading={loading} error={error} />
              
              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="auth-link">
                    {t('auth.register')}
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
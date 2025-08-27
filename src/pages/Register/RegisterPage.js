import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Register from '../../components/auth/Register/Register';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await register(formData.name, formData.email, formData.password);
      toast.success(t('auth.registerSuccess'));
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || t('auth.registerError');
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
                <h2 className="auth-title">{t('auth.register')}</h2>
                <p className="text-muted">Create your account to get started.</p>
              </div>
              
              <Register onSubmit={handleRegister} loading={loading} error={error} />
              
              <div className="text-center mt-4">
                <p className="text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="auth-link">
                    {t('auth.login')}
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

export default RegisterPage;
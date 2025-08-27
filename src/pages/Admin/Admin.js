import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Settings, Radio, Headphones, Calendar, Users } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const AdminDashboard = () => (
    <div className="admin-dashboard">
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Radio size={32} className="text-primary me-3" />
                <div>
                  <h3 className="mb-0">12</h3>
                  <small className="text-muted">Active Shows</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Headphones size={32} className="text-success me-3" />
                <div>
                  <h3 className="mb-0">156</h3>
                  <small className="text-muted">Total Episodes</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Users size={32} className="text-info me-3" />
                <div>
                  <h3 className="mb-0">1,234</h3>
                  <small className="text-muted">Total Users</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Calendar size={32} className="text-warning me-3" />
                <div>
                  <h3 className="mb-0">24</h3>
                  <small className="text-muted">Scheduled Shows</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const ShowsManagement = () => (
    <div className="shows-management">
      <Card>
        <Card.Header>
          <h5 className="mb-0">Shows Management</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">Manage your radio shows here.</p>
          <div className="text-center py-5">
            <Radio size={48} className="text-muted mb-3" />
            <p>Shows management functionality coming soon...</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  const EpisodesManagement = () => (
    <div className="episodes-management">
      <Card>
        <Card.Header>
          <h5 className="mb-0">Episodes Management</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">Manage your episodes here.</p>
          <div className="text-center py-5">
            <Headphones size={48} className="text-muted mb-3" />
            <p>Episodes management functionality coming soon...</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  const ScheduleManagement = () => (
    <div className="schedule-management">
      <Card>
        <Card.Header>
          <h5 className="mb-0">Schedule Management</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">Manage your broadcasting schedule here.</p>
          <div className="text-center py-5">
            <Calendar size={48} className="text-muted mb-3" />
            <p>Schedule management functionality coming soon...</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  const UsersManagement = () => (
    <div className="users-management">
      <Card>
        <Card.Header>
          <h5 className="mb-0">Users Management</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">Manage your users here.</p>
          <div className="text-center py-5">
            <Users size={48} className="text-muted mb-3" />
            <p>Users management functionality coming soon...</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="admin-page">
      <Container fluid>
        <Row className="py-4">
          <Col>
            <div className="page-header">
              <h1 className="page-title">
                <Settings size={32} className="me-3" />
                {t('admin.title')}
              </h1>
              <p className="page-subtitle">Manage your radio platform</p>
            </div>
          </Col>
        </Row>

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row>
            <Col lg={3} className="mb-4">
              <Card className="admin-nav-card">
                <Card.Body>
                  <Nav variant="pills" className="flex-column admin-nav">
                    <Nav.Item>
                      <Nav.Link eventKey="dashboard">
                        <Settings size={18} className="me-2" />
                        Dashboard
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="shows">
                        <Radio size={18} className="me-2" />
                        {t('admin.shows')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="episodes">
                        <Headphones size={18} className="me-2" />
                        {t('admin.episodes')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="schedule">
                        <Calendar size={18} className="me-2" />
                        {t('admin.schedule')}
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="users">
                        <Users size={18} className="me-2" />
                        {t('admin.users')}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  <AdminDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="shows">
                  <ShowsManagement />
                </Tab.Pane>
                <Tab.Pane eventKey="episodes">
                  <EpisodesManagement />
                </Tab.Pane>
                <Tab.Pane eventKey="schedule">
                  <ScheduleManagement />
                </Tab.Pane>
                <Tab.Pane eventKey="users">
                  <UsersManagement />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Admin;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, Play } from 'lucide-react';
import { showService } from '../../services/showService';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import './Show.css';

const Show = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        setLoading(true);
        const [showData, episodesData] = await Promise.all([
          showService.getShowBySlug(slug),
          showService.getShowEpisodes(slug)
        ]);
        setShow(showData);
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching show data:', error);
        setError('Show not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchShowData();
    }
  }, [slug]);

  if (loading) {
    return <LoadingSpinner message="Loading show..." />;
  }

  if (error || !show) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Show Not Found</h2>
          <p className="text-muted">The show you're looking for doesn't exist.</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="show-page">
      <Container>
        {/* Show Header */}
        <Row className="py-5">
          <Col lg={4} className="mb-4">
            {show.image && (
              <img
                src={show.image}
                alt={show.title}
                className="show-image img-fluid rounded"
              />
            )}
          </Col>
          <Col lg={8}>
            <div className="show-info">
              <div className="mb-3">
                {show.category && (
                  <Badge bg="primary" className="category-badge">
                    {show.category}
                  </Badge>
                )}
              </div>
              
              <h1 className="show-title">{show.title}</h1>
              
              <div className="show-meta mb-4">
                {show.host && (
                  <div className="meta-item">
                    <User size={16} className="me-2" />
                    <span>Hosted by {show.host}</span>
                  </div>
                )}
                {show.duration && (
                  <div className="meta-item">
                    <Clock size={16} className="me-2" />
                    <span>{show.duration} minutes per episode</span>
                  </div>
                )}
                {show.schedule && (
                  <div className="meta-item">
                    <Calendar size={16} className="me-2" />
                    <span>{show.schedule}</span>
                  </div>
                )}
              </div>
              
              <p className="show-description">{show.description}</p>
              
              {show.tags && show.tags.length > 0 && (
                <div className="show-tags">
                  {show.tags.map((tag, index) => (
                    <Badge key={index} bg="secondary" className="me-2 mb-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Episodes Section */}
        <Row>
          <Col>
            <div className="episodes-section">
              <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <h3>{t('shows.episodes')} ({episodes.length})</h3>
              </div>
              
              {episodes.length > 0 ? (
                <Row>
                  {episodes.map((episode) => (
                    <Col lg={4} md={6} key={episode._id} className="mb-4">
                      <EpisodeCard episode={episode} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Card>
                  <Card.Body className="text-center py-5">
                    <Play size={48} className="mb-3 text-muted opacity-50" />
                    <h5>No Episodes Yet</h5>
                    <p className="text-muted">
                      This show hasn't published any episodes yet. Check back later!
                    </p>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Show;
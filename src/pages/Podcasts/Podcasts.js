import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Search, Filter, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { showService } from '../../services/showService';
import { episodeService } from '../../services/episodeService';
import ShowCard from '../../components/ShowCard/ShowCard';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import './Podcasts.css';

const Podcasts = () => {
  const { t } = useTranslation();
  const [shows, setShows] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('shows');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showsData, episodesData] = await Promise.all([
          showService.getAllShows(),
          episodeService.getAllEpisodes()
        ]);
        setShows(showsData);
        setEpisodes(episodesData);
        setFilteredShows(showsData);
        setFilteredEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching podcasts data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterContent = () => {
      if (!searchTerm) {
        setFilteredShows(shows);
        setFilteredEpisodes(episodes);
        return;
      }

      const term = searchTerm.toLowerCase();
      
      const filteredS = shows.filter(show =>
        show.title.toLowerCase().includes(term) ||
        show.description?.toLowerCase().includes(term) ||
        show.host?.toLowerCase().includes(term)
      );
      
      const filteredE = episodes.filter(episode =>
        episode.title.toLowerCase().includes(term) ||
        episode.description?.toLowerCase().includes(term) ||
        episode.show?.title?.toLowerCase().includes(term)
      );
      
      setFilteredShows(filteredS);
      setFilteredEpisodes(filteredE);
    };

    filterContent();
  }, [searchTerm, shows, episodes]);

  if (loading) {
    return <LoadingSpinner message="Loading podcasts..." />;
  }

  return (
    <div className="podcasts-page">
      <Container>
        <Row className="py-5">
          <Col>
            <div className="page-header text-center mb-5">
              <h1 className="page-title">
                <Headphones size={40} className="me-3" />
                {t('nav.podcasts')}
              </h1>
              <p className="page-subtitle">
                Discover amazing shows and episodes from our content library
              </p>
            </div>
          </Col>
        </Row>

        {/* Search and Filter */}
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <InputGroup size="lg">
              <Form.Control
                type="text"
                placeholder="Search shows, episodes, hosts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Button variant="primary">
                <Search size={20} />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Tabs */}
        <Row className="mb-4">
          <Col>
            <div className="content-tabs">
              <Button
                variant={activeTab === 'shows' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('shows')}
                className="tab-btn"
              >
                Shows ({filteredShows.length})
              </Button>
              <Button
                variant={activeTab === 'episodes' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('episodes')}
                className="tab-btn"
              >
                Episodes ({filteredEpisodes.length})
              </Button>
            </div>
          </Col>
        </Row>

        {/* Content */}
        <Row>
          {activeTab === 'shows' ? (
            <>
              {filteredShows.map((show) => (
                <Col lg={4} md={6} key={show._id} className="mb-4">
                  <ShowCard show={show} />
                </Col>
              ))}
              {filteredShows.length === 0 && (
                <Col>
                  <div className="text-center text-muted py-5">
                    <Headphones size={48} className="mb-3 opacity-50" />
                    <div>No shows found matching your search</div>
                  </div>
                </Col>
              )}
            </>
          ) : (
            <>
              {filteredEpisodes.map((episode) => (
                <Col lg={4} md={6} key={episode._id} className="mb-4">
                  <EpisodeCard episode={episode} />
                </Col>
              ))}
              {filteredEpisodes.length === 0 && (
                <Col>
                  <div className="text-center text-muted py-5">
                    <Headphones size={48} className="mb-3 opacity-50" />
                    <div>No episodes found matching your search</div>
                  </div>
                </Col>
              )}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Podcasts;
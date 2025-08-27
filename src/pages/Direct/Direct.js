import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Play, Radio } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { episodeService } from '../../services/episodeService';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import ScheduleTable from '../../components/ScheduleTable/ScheduleTable';
import './Direct.css';

const Direct = () => {
  const { t } = useTranslation();
  const { changeTrack, toggle, isPlaying, isLive } = usePlayer();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await episodeService.getSchedule();
        setSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleListenLive = () => {
    if (isLive) {
      toggle();
    } else {
      changeTrack(process.env.REACT_APP_LIVE_URL, true);
    }
  };

  return (
    <div className="direct-page">
      <Container>
        <Row className="py-5">
          <Col>
            <div className="page-header text-center mb-5">
              <h1 className="page-title">
                <Radio size={40} className="me-3" />
                {t('nav.direct')}
              </h1>
              <p className="page-subtitle">
                Listen to our live radio stream 24/7
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mb-4">
            <Card className="live-player-card">
              <Card.Body className="text-center">
                <div className="live-indicator mb-3">
                  <span className="live-dot"></span>
                  <span className="live-text">{t('player.live')}</span>
                </div>
                
                <h3 className="mb-4">Live Radio Stream</h3>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleListenLive}
                  className="live-play-btn"
                >
                  <Play size={24} className="me-2" />
                  {isLive && isPlaying ? t('player.pause') : t('player.play')} Live
                </Button>
                
                <div className="stream-info mt-4">
                  <p className="text-muted">
                    High quality audio stream • 128 kbps
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} className="mb-4">
            <NowPlaying className="sticky-top" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Today's Schedule</h4>
              </Card.Header>
              <Card.Body>
                <ScheduleTable schedule={schedule} loading={loading} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Direct;
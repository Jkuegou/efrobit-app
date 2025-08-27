import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Play, Clock, Calendar } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useTranslation } from 'react-i18next';

const EpisodeCard = ({ episode }) => {
  const { t } = useTranslation();
  const { changeTrack } = usePlayer();

  const handlePlay = () => {
    if (episode.audioUrl) {
      changeTrack(episode.audioUrl, false, {
        title: episode.title,
        artist: episode.show?.title,
        duration: episode.duration
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="episode-card h-100">
      {episode.image && (
        <Card.Img
          variant="top"
          src={episode.image}
          alt={episode.title}
          className="episode-image"
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="episode-title">
          {episode.title}
        </Card.Title>
        
        {episode.show && (
          <div className="show-link mb-2">
            <small className="text-primary">
              {episode.show.title}
            </small>
          </div>
        )}
        
        <Card.Text className="episode-description flex-grow-1">
          {episode.description}
        </Card.Text>
        
        <div className="episode-meta mb-3">
          <div className="meta-item">
            <Calendar size={14} className="me-1" />
            <small className="text-muted">
              {formatDate(episode.publishedAt)}
            </small>
          </div>
          {episode.duration && (
            <div className="meta-item">
              <Clock size={14} className="me-1" />
              <small className="text-muted">
                {formatDuration(episode.duration)}
              </small>
            </div>
          )}
        </div>
        
        {episode.audioUrl && (
          <Button
            variant="primary"
            size="sm"
            onClick={handlePlay}
            className="play-btn"
          >
            <Play size={16} className="me-2" />
            {t('player.play')}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default EpisodeCard;
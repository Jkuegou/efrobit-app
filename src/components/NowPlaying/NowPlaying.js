import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Music, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { episodeService } from '../../services/episodeService';
import io from 'socket.io-client';

const NowPlaying = ({ className = '' }) => {
  const { t } = useTranslation();
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await episodeService.getNowPlaying();
        setNowPlaying(data);
      } catch (error) {
        console.error('Error fetching now playing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();

    // Setup Socket.IO connection
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

    socket.on('now:update', (data) => {
      setNowPlaying(data);
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <Card className={`now-playing-card ${className}`}>
        <Card.Body className="text-center">
          <div className="spinner-border text-primary" />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={`now-playing-card ${className}`}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <Radio className="me-2 text-primary" size={20} />
          <h6 className="mb-0">{t('player.nowPlaying')}</h6>
        </div>
        
        {nowPlaying ? (
          <div className="now-playing-content">
            <div className="d-flex align-items-center">
              <div className="track-icon me-3">
                <Music size={24} className="text-muted" />
              </div>
              <div className="track-details flex-grow-1">
                <div className="track-title fw-bold">
                  {nowPlaying.title || 'Unknown Track'}
                </div>
                {nowPlaying.artist && (
                  <div className="track-artist text-muted">
                    {nowPlaying.artist}
                  </div>
                )}
                {nowPlaying.show && (
                  <div className="show-name text-primary">
                    {nowPlaying.show}
                  </div>
                )}
              </div>
            </div>
            
            {nowPlaying.album && (
              <div className="mt-2 text-muted small">
                Album: {nowPlaying.album}
              </div>
            )}
            
            {nowPlaying.duration && (
              <div className="mt-2 text-muted small">
                Duration: {formatDuration(nowPlaying.duration)}
              </div>
            )}
            
            <div className="mt-2 text-muted small">
              Last updated: {new Date(nowPlaying.updatedAt).toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">
            <Music size={48} className="mb-2 opacity-50" />
            <div>No information available</div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default NowPlaying;
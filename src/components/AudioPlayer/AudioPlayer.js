// import React, { useEffect, useRef, useState } from 'react';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
// import { usePlayer } from '../../context/PlayerContext';
// import { useTranslation } from 'react-i18next';
// import Hls from 'hls.js';
// import './AudioPlayer.css';

// const AudioPlayer = () => {
//   const { t } = useTranslation();
//   const {
//     isPlaying,
//     currentSrc,
//     volume,
//     muted,
//     isLive,
//     currentTrack,
//     toggle,
//     toggleMute,
//     changeVolume,
//     setAudioRef,
//     setIsPlaying
//   } = usePlayer();

//   const audioRef = useRef(null);
//   const hlsRef = useRef(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     setAudioRef(audio);
//     audio.volume = volume;
//     audio.muted = muted;

//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleError = (e) => {
//       setError('Failed to load audio stream');
//       setLoading(false);
//     };
//     const handleLoadStart = () => {
//       setLoading(true);
//       setError(null);
//     };
//     const handleLoadedData = () => {
//       setLoading(false);
//     };

//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('error', handleError);
//     audio.addEventListener('loadstart', handleLoadStart);
//     audio.addEventListener('loadeddata', handleLoadedData);

//     return () => {
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('error', handleError);
//       audio.removeEventListener('loadstart', handleLoadStart);
//       audio.removeEventListener('loadeddata', handleLoadedData);
//     };
//   }, [setAudioRef, setIsPlaying, volume, muted]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !currentSrc) return;

//     // Clean up previous HLS instance
//     if (hlsRef.current) {
//       hlsRef.current.destroy();
//       hlsRef.current = null;
//     }

//     // Check if HLS is supported and if the stream is HLS
//     if (Hls.isSupported() && currentSrc.includes('.m3u8')) {
//       const hls = new Hls({
//         enableWorker: false,
//         lowLatencyMode: true,
//         backBufferLength: 90
//       });
      
//       hlsRef.current = hls;
//       hls.loadSource(currentSrc);
//       hls.attachMedia(audio);
      
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         setError(null);
//       });
      
//       hls.on(Hls.Events.ERROR, (event, data) => {
//         if (data.fatal) {
//           setError('HLS stream error');
//           console.error('HLS Error:', data);
//         }
//       });
//     } else {
//       // Fallback to native HTML5 audio
//       audio.src = currentSrc;
//     }

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//         hlsRef.current = null;
//       }
//     };
//   }, [currentSrc]);

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     changeVolume(newVolume);
//   };

//   if (!currentSrc) return null;

//   return (
//     <div className="audio-player-container">
//       <audio ref={audioRef} preload="none" />
//       <Container fluid>
//         <Row className="align-items-center">
//           <Col xs={12} md={4}>
//             <div className="track-info">
//               {isLive && <span className="live-indicator">{t('player.live')}</span>}
//               <div className="track-title">
//                 {currentTrack?.title || t('player.nowPlaying')}
//               </div>
//               {currentTrack?.artist && (
//                 <div className="track-artist">{currentTrack.artist}</div>
//               )}
//             </div>
//           </Col>
//           <Col xs={12} md={4} className="text-center">
//             <div className="player-controls">
//               <Button
//                 variant="primary"
//                 size="lg"
//                 onClick={toggle}
//                 disabled={loading}
//                 className="play-pause-btn"
//               >
//                 {loading ? (
//                   <div className="spinner-border spinner-border-sm" />
//                 ) : isPlaying ? (
//                   <Pause size={24} />
//                 ) : (
//                   <Play size={24} />
//                 )}
//               </Button>
//               {error && <div className="error-message">{error}</div>}
//             </div>
//           </Col>
//           <Col xs={12} md={4}>
//             <div className="volume-controls">
//               <Button
//                 variant="outline-secondary"
//                 size="sm"
//                 onClick={toggleMute}
//                 className="mute-btn"
//               >
//                 {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//               </Button>
//               <Form.Range
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={muted ? 0 : volume}
//                 onChange={handleVolumeChange}
//                 className="volume-slider"
//               />
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default AudioPlayer;

import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useTranslation } from 'react-i18next';

const AudioPlayer = () => {
  const { t } = useTranslation();
  const {
    isPlaying,
    currentTrack,
    isLive,
    volume,
    muted,
    loading,
    error,
    play,
    pause,
    toggle,
    toggleMute,
    changeVolume
  } = usePlayer();

  if (!currentTrack && !isLive) {
    return null; // N'afficher le lecteur que s'il y a quelque chose à jouer
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };

  return (
    <Card className="audio-player fixed-bottom m-3" style={{ zIndex: 1050 }}>
      <Card.Body className="py-2">
        <div className="d-flex align-items-center">
          {/* Bouton Play/Pause */}
          <Button
            variant={isPlaying ? "outline-primary" : "primary"}
            size="sm"
            onClick={toggle}
            disabled={loading}
            className="me-3"
          >
            {loading ? (
              <div 
                className="spinner-border spinner-border-sm" 
                role="status"
                style={{ width: '16px', height: '16px' }}
              />
            ) : isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </Button>

          {/* Informations de la piste */}
          <div className="flex-grow-1 me-3">
            <div className="d-flex align-items-center">
              {isLive && <Radio size={14} className="me-2 text-primary" />}
              <div>
                <div className="fw-bold small">
                  {currentTrack?.title || (isLive ? t('player.liveRadio') : 'Audio')}
                </div>
                {currentTrack?.artist && (
                  <div className="text-muted small">
                    {currentTrack.artist}
                  </div>
                )}
                {error && (
                  <div className="text-danger small">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contrôles de volume */}
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleMute}
              className="me-2"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </Button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="form-range"
              style={{ width: '80px' }}
            />
          </div>
        </div>

        {/* Barre de progression pour le live */}
        {isLive && isPlaying && (
          <div className="mt-2">
            <ProgressBar 
              animated 
              now={100} 
              variant="primary" 
              style={{ height: '2px' }}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AudioPlayer;
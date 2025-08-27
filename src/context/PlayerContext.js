// import React, { createContext, useContext, useState, useRef } from 'react';

// const PlayerContext = createContext();

// export const usePlayer = () => {
//   const context = useContext(PlayerContext);
//   if (!context) {
//     throw new Error('usePlayer must be used within a PlayerProvider');
//   }
//   return context;
// };

// export const PlayerProvider = ({ children }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentSrc, setCurrentSrc] = useState(process.env.REACT_APP_LIVE_URL);
//   const [volume, setVolume] = useState(0.7);
//   const [muted, setMuted] = useState(false);
//   const [isLive, setIsLive] = useState(true);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const audioRef = useRef(null);

//   const play = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const pause = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const toggle = () => {
//     if (isPlaying) {
//       pause();
//     } else {
//       play();
//     }
//   };

//   const changeTrack = (src, isLiveStream = false, trackInfo = null) => {
//     setCurrentSrc(src);
//     setIsLive(isLiveStream);
//     setCurrentTrack(trackInfo);
//     setIsPlaying(false);
//   };

//   const setAudioRef = (ref) => {
//     audioRef.current = ref;
//   };

//   const toggleMute = () => {
//     setMuted(!muted);
//     if (audioRef.current) {
//       audioRef.current.muted = !muted;
//     }
//   };

//   const changeVolume = (newVolume) => {
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };

//   const value = {
//     isPlaying,
//     currentSrc,
//     volume,
//     muted,
//     isLive,
//     currentTrack,
//     play,
//     pause,
//     toggle,
//     changeTrack,
//     setAudioRef,
//     toggleMute,
//     changeVolume,
//     setIsPlaying
//   };

//   return (
//     <PlayerContext.Provider value={value}>
//       {children}
//     </PlayerContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(process.env.REACT_APP_LIVE_URL);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  // Créer l'élément audio une seule fois
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = volume;
      audio.muted = muted;
      
      // Gérer les événements audio
      audio.onloadstart = () => {
        setLoading(true);
        setError(null);
      };
      
      audio.oncanplay = () => {
        setLoading(false);
      };
      
      audio.onplay = () => {
        setIsPlaying(true);
      };
      
      audio.onpause = () => {
        setIsPlaying(false);
      };
      
      audio.onerror = (e) => {
        setLoading(false);
        setIsPlaying(false);
        setError('Erreur de lecture audio');
        console.error('Audio error:', e);
      };
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audioRef.current = audio;
      
      // Charger l'URL initiale
      if (currentSrc) {
        audio.src = currentSrc;
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Mettre à jour le volume quand il change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Mettre à jour le mute quand il change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const play = async () => {
    if (audioRef.current && currentSrc) {
      try {
        setError(null);
        await audioRef.current.play();
      } catch (error) {
        console.error('Play error:', error);
        setError('Impossible de lire l\'audio');
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const changeTrack = async (src, isLiveStream = false, trackInfo = null) => {
    if (!src) {
      console.error('Aucune URL fournie pour changeTrack');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      
      // Arrêter la lecture actuelle
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = src;
        audioRef.current.load(); // Force le rechargement
      }
      
      setCurrentSrc(src);
      setIsLive(isLiveStream);
      setCurrentTrack(trackInfo);
      setIsPlaying(false);
      
      // Démarrer automatiquement la lecture
      setTimeout(() => {
        play();
      }, 100);
      
    } catch (error) {
      console.error('Error changing track:', error);
      setError('Erreur lors du changement de piste');
      setLoading(false);
    }
  };

  const setAudioRef = (ref) => {
    // Cette fonction est maintenant optionnelle car on gère l'audio en interne
    if (ref) {
      audioRef.current = ref;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const changeVolume = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
  };

  const value = {
    isPlaying,
    currentSrc,
    volume,
    muted,
    isLive,
    currentTrack,
    loading,
    error,
    play,
    pause,
    toggle,
    changeTrack,
    setAudioRef,
    toggleMute,
    changeVolume,
    setIsPlaying
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
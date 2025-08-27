// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { Play, Headphones } from 'lucide-react';
// import { showService } from '../../services/showService';
// import { episodeService } from '../../services/episodeService';
// import { usePlayer } from '../../context/PlayerContext';
// import ShowCard from '../../components/ShowCard/ShowCard';
// import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
// import NowPlaying from '../../components/NowPlaying/NowPlaying';
// import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
// import './Home.css';

// const Home = () => {
//   const { t } = useTranslation();
//   const { changeTrack } = usePlayer();
//   const [featuredShows, setFeaturedShows] = useState([]);
//   const [latestEpisodes, setLatestEpisodes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [showsData, episodesData] = await Promise.all([
//           showService.getAllShows(),
//           episodeService.getLatestEpisodes(6)
//         ]);
//         setFeaturedShows(showsData.slice(0, 6));
//         setLatestEpisodes(episodesData);
//       } catch (error) {
//         console.error('Error fetching home data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleListenLive = () => {
//     changeTrack(process.env.REACT_APP_LIVE_URL, true);
//   };

//   if (loading) {
//     return <LoadingSpinner message="Loading home page..." />;
//   }

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <Container>
//           <Row className="align-items-center min-vh-50">
//             <Col lg={6}>
//               <div className="hero-content">
//                 <h1 className="hero-title">{t('home.title')}</h1>
//                 <p className="hero-subtitle">{t('home.subtitle')}</p>
//                 <div className="hero-buttons">
//                   <Button
//                     variant="primary"
//                     size="lg"
//                     onClick={handleListenLive}
//                     className="me-3"
//                   >
//                     <Play size={20} className="me-2" />
//                     {t('nav.direct')}
//                   </Button>
//                   <Link to="/podcasts">
//                     <Button variant="outline-light" size="lg">
//                       <Headphones size={20} className="me-2" />
//                       {t('nav.podcasts')}
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </Col>
//             <Col lg={6}>
//               <div className="hero-widget">
//                 <NowPlaying />
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Featured Shows Section */}
//       <section className="featured-section">
//         <Container>
//           <Row>
//             <Col>
//               <h2 className="section-title">{t('home.featuredShows')}</h2>
//               <Row>
//                 {featuredShows.map((show) => (
//                   <Col lg={4} md={6} key={show._id} className="mb-4">
//                     <ShowCard show={show} />
//                   </Col>
//                 ))}
//               </Row>
//               {featuredShows.length === 0 && (
//                 <div className="text-center text-muted py-5">
//                   No featured shows available
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Latest Episodes Section */}
//       <section className="episodes-section">
//         <Container>
//           <Row>
//             <Col>
//               <h2 className="section-title">{t('home.latestEpisodes')}</h2>
//               <Row>
//                 {latestEpisodes.map((episode) => (
//                   <Col lg={4} md={6} key={episode._id} className="mb-4">
//                     <EpisodeCard episode={episode} />
//                   </Col>
//                 ))}
//               </Row>
//               {latestEpisodes.length === 0 && (
//                 <div className="text-center text-muted py-5">
//                   No episodes available
//                 </div>
//               )}
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play, Headphones } from 'lucide-react';
import { showService } from '../../services/showService';
import { episodeService } from '../../services/episodeService';
import { usePlayer } from '../../context/PlayerContext';
import ShowCard from '../../components/ShowCard/ShowCard';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';

import ProgramSchedule from '../../components/ProgramSchedule';

import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const { changeTrack, error: playerError } = usePlayer();
  const [featuredShows, setFeaturedShows] = useState([]);
  const [latestEpisodes, setLatestEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Vérifier si les variables d'environnement sont définies
        if (!process.env.REACT_APP_API_URL) {
          console.warn('REACT_APP_API_URL non définie, utilisation de http://localhost:5000');
        }
        
        const [showsData, episodesData] = await Promise.all([
          showService.getAllShows().catch(err => {
            console.warn('Erreur lors du chargement des émissions:', err);
            return []; // Retourner un tableau vide en cas d'erreur
          }),
          episodeService.getLatestEpisodes(6).catch(err => {
            console.warn('Erreur lors du chargement des épisodes:', err);
            return []; // Retourner un tableau vide en cas d'erreur
          })
        ]);
        
        setFeaturedShows(Array.isArray(showsData) ? showsData.slice(0, 6) : []);
        setLatestEpisodes(Array.isArray(episodesData) ? episodesData : []);
        
      } catch (error) {
        console.error('Error fetching home data:', error);
        setError('Erreur lors du chargement des données. Vérifiez votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleListenLive = () => {
    const liveUrl = process.env.REACT_APP_LIVE_URL;
    
    if (!liveUrl) {
      setError('URL de diffusion en direct non configurée. Vérifiez vos variables d\'environnement.');
      return;
    }
    
    console.log('Démarrage du direct avec URL:', liveUrl);
    changeTrack(liveUrl, true, {
      title: t('player.liveRadio') || 'Radio en direct',
      artist: 'Votre Radio'
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading home page..." />;
  }

  return (
    <div className="home-page">
      {/* Affichage des erreurs */}
      {(error || playerError) && (
        <Container>
          <Alert variant="danger" className="mt-3">
            {error || playerError}
          </Alert>
        </Container>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">{t('home.title')}</h1>
                <p className="hero-subtitle">{t('home.subtitle')}</p>
                <div className="hero-buttons">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleListenLive}
                    className="me-3"
                  >
                    <Play size={20} className="me-2" />
                    {t('nav.direct') || 'Écouter en direct'}
                  </Button>
                  <Link to="/podcasts">
                    <Button variant="outline-light" size="lg">
                      <Headphones size={20} className="me-2" />
                      {t('nav.podcasts') || 'Podcasts'}
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-widget">
                <NowPlaying />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Shows Section */}
      <section className="featured-section">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">
                {t('home.featuredShows') || 'Émissions à la une'}
              </h2>
              <Row>
                {featuredShows.map((show) => (
                  <Col lg={4} md={6} key={show._id || show.id} className="mb-4">
                    <ShowCard show={show} />
                  </Col>
                ))}
              </Row>
              {featuredShows.length === 0 && (
                <div className="text-center text-muted py-5">
                  <p>Aucune émission disponible</p>
                  <small>
                    Vérifiez que votre API backend est démarrée et accessible à l'adresse : 
                    <code>{process.env.REACT_APP_API_URL || 'http://localhost:5000'}</code>
                  </small>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest Episodes Section */}
      <section className="episodes-section">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">
                {t('home.latestEpisodes') || 'Derniers épisodes'}
              </h2>
              <Row>
                {latestEpisodes.map((episode) => (
                  <Col lg={4} md={6} key={episode._id || episode.id} className="mb-4">
                    <EpisodeCard episode={episode} />
                  </Col>
                ))}
              </Row>
              {latestEpisodes.length === 0 && (
                <div className="text-center text-muted py-5">
                  <p>Aucun épisode disponible</p>
                  <small>
                    Vérifiez que votre API backend est démarrée et contient des épisodes
                  </small>
                </div>
              )}
            </Col>
          </Row>
<section className="schedule-section">
  <Container>
    <ProgramSchedule />
  </Container>
</section>
        </Container>
      </section>
    </div>
  );
};

export default Home;
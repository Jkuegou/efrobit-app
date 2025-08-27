import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Tab, Tabs } from 'react-bootstrap';
import { Clock, Calendar, Play, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { showService } from '../services/showService';
import { usePlayer } from '../context/PlayerContext';

const ProgramSchedule = () => {
  const { t } = useTranslation();
  const { changeTrack } = usePlayer();
  const [currentProgram, setCurrentProgram] = useState(null);
  const [nextProgram, setNextProgram] = useState(null);
  const [weekSchedule, setWeekSchedule] = useState({});
  const [activeTab, setActiveTab] = useState('today');

  const dayNames = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 
    'Jeudi', 'Vendredi', 'Samedi'
  ];

  useEffect(() => {
    // Charger les données des programmes
    const loadScheduleData = () => {
      setCurrentProgram(showService.getCurrentProgram());
      setNextProgram(showService.getNextProgram());
      setWeekSchedule(showService.getWeekSchedule());
    };

    loadScheduleData();
    
    // Mettre à jour toutes les minutes
    const interval = setInterval(loadScheduleData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleListenLive = () => {
    const liveUrl = process.env.REACT_APP_LIVE_URL;
    if (liveUrl) {
      changeTrack(liveUrl, true, {
        title: currentProgram ? currentProgram.title : 'Radio en direct',
        artist: currentProgram ? currentProgram.host : 'Votre Radio'
      });
    }
  };

  const ProgramCard = ({ program, isCurrent = false, isNext = false }) => (
    <Card className={`program-card mb-3 ${isCurrent ? 'border-primary current-program' : ''} ${isNext ? 'border-warning' : ''}`}>
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={program.image || `https://via.placeholder.com/150x100/007bff/ffffff?text=${encodeURIComponent(program.title)}`}
            alt={program.title}
            className="img-fluid rounded-start program-image"
            style={{ height: '100px', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-md-9">
          <Card.Body className="py-2">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <Card.Title className="h6 mb-1">
                  {program.title}
                  {isCurrent && <Badge bg="success" className="ms-2">EN DIRECT</Badge>}
                  {isNext && <Badge bg="warning" className="ms-2">À SUIVRE</Badge>}
                </Card.Title>
                
                <div className="program-meta mb-2">
                  <div className="d-flex align-items-center text-muted small mb-1">
                    <Clock size={12} className="me-1" />
                    <span className="me-3">{program.schedule.time}</span>
                    <User size={12} className="me-1" />
                    <span>{program.host}</span>
                  </div>
                  <Badge bg="secondary" className="me-2">{program.category}</Badge>
                </div>
                
                <Card.Text className="small text-muted mb-2">
                  {program.description}
                </Card.Text>
              </div>
              
              {isCurrent && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleListenLive}
                  className="ms-2"
                >
                  <Play size={14} className="me-1" />
                  Écouter
                </Button>
              )}
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );

  const DaySchedule = ({ programs, day }) => (
    <div>
      <h5 className="mb-3 d-flex align-items-center">
        <Calendar size={20} className="me-2" />
        {dayNames[day]} ({programs.length} programme{programs.length > 1 ? 's' : ''})
      </h5>
      
      {programs.length === 0 ? (
        <Card className="text-center text-muted py-4">
          <Card.Body>
            Aucun programme prévu ce jour
          </Card.Body>
        </Card>
      ) : (
        programs.map(program => (
          <ProgramCard
            key={program.id}
            program={program}
            isCurrent={currentProgram?.id === program.id}
            isNext={nextProgram?.id === program.id}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="program-schedule">
      {/* Programme actuel et suivant */}
      <Row className="mb-4">
        <Col>
          <Card className="current-next-programs">
            <Card.Header>
              <h4 className="mb-0">Programmes en cours</h4>
            </Card.Header>
            <Card.Body>
              {currentProgram ? (
                <div className="mb-3">
                  <h6 className="text-success mb-2">
                    <Badge bg="success" className="me-2">MAINTENANT</Badge>
                    {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </h6>
                  <ProgramCard program={currentProgram} isCurrent={true} />
                </div>
              ) : (
                <div className="text-center text-muted py-3">
                  <p>Aucun programme en cours</p>
                  <small>Musique en continu</small>
                </div>
              )}

              {nextProgram && (
                <div>
                  <h6 className="text-warning mb-2">
                    <Badge bg="warning" className="me-2">À SUIVRE</Badge>
                    {nextProgram.schedule.time}
                  </h6>
                  <ProgramCard program={nextProgram} isNext={true} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Grille des programmes */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4 className="mb-0">Grille des programmes</h4>
            </Card.Header>
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={setActiveTab}
                className="mb-3"
              >
                <Tab eventKey="today" title="Aujourd'hui">
                  <DaySchedule 
                    programs={weekSchedule[new Date().getDay()] || []} 
                    day={new Date().getDay()}
                  />
                </Tab>
                
                {dayNames.map((dayName, index) => (
                  <Tab 
                    key={index} 
                    eventKey={`day-${index}`} 
                    title={dayName}
                  >
                    <DaySchedule 
                      programs={weekSchedule[index] || []} 
                      day={index}
                    />
                  </Tab>
                ))}
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProgramSchedule;
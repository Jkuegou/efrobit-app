import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';

const ShowCard = ({ show }) => {
  return (
    <Card className="show-card h-100">
      {show.image && (
        <Card.Img
          variant="top"
          src={show.image}
          alt={show.title}
          className="show-image"
        />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {show.category && (
            <Badge bg="primary" className="mb-2">
              {show.category}
            </Badge>
          )}
        </div>
        
        <Card.Title className="show-title">
          <Link to={`/show/${show.slug}`} className="text-decoration-none">
            {show.title}
          </Link>
        </Card.Title>
        
        <Card.Text className="show-description flex-grow-1">
          {show.description}
        </Card.Text>
        
        <div className="show-meta">
          {show.host && (
            <div className="meta-item">
              <Users size={14} className="me-1" />
              <small className="text-muted">Host: {show.host}</small>
            </div>
          )}
          {show.duration && (
            <div className="meta-item">
              <Clock size={14} className="me-1" />
              <small className="text-muted">{show.duration} min</small>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShowCard;
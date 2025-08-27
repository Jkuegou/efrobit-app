import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ScheduleTable = ({ schedule, loading }) => {
  const { t } = useTranslation();

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isCurrentShow = (startTime, endTime) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    return currentTime >= startTime && currentTime <= endTime;
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!schedule.length) {
    return (
      <div className="text-center py-4 text-muted">
        <Clock size={48} className="mb-3 opacity-50" />
        <div>No schedule available for today</div>
      </div>
    );
  }

  return (
    <Table responsive hover className="schedule-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Show</th>
          <th>Host</th>
          <th>Category</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((item, index) => (
          <tr
            key={index}
            className={isCurrentShow(item.startTime, item.endTime) ? 'current-show' : ''}
          >
            <td>
              <div className="d-flex align-items-center">
                <Clock size={14} className="me-2 text-muted" />
                <span className="fw-bold">
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                </span>
              </div>
            </td>
            <td>
              <div className="show-info">
                <div className="fw-bold">{item.show?.title || item.title}</div>
                {item.description && (
                  <small className="text-muted">{item.description}</small>
                )}
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <User size={14} className="me-2 text-muted" />
                {item.host || item.show?.host || 'Unknown'}
              </div>
            </td>
            <td>
              {item.category && (
                <Badge bg="secondary">{item.category}</Badge>
              )}
            </td>
            <td>
              {isCurrentShow(item.startTime, item.endTime) ? (
                <Badge bg="success">Live Now</Badge>
              ) : (
                <Badge bg="outline-secondary">Scheduled</Badge>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScheduleTable;
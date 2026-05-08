import React from 'react';
import { Event } from '../types';
import { CATEGORY_LABELS } from '../hooks/useEvents';

interface EventCardProps {
  event: Event;
  onEdit: (e: Event) => void;
  onDelete: (id: number) => void;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr + 'T12:00').toLocaleDateString('es-MX', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const today = new Date().toISOString().slice(0, 10);
  const isPast = event.date < today;

  return (
    <article className={`event-card ${isPast ? 'event-past' : ''}`} aria-label={`Evento: ${event.name}`}>
      <div className={`event-accent accent-${event.cat}`} aria-hidden="true" />
      <div className="event-body">
        <div className="event-title">{event.name}</div>
        <div className="event-meta">
          <span className="meta-item">
            <span aria-hidden="true">📅</span>
            {formatDate(event.date)}
          </span>
          {event.time && (
            <span className="meta-item">
              <span aria-hidden="true">🕐</span>
              {event.time}
            </span>
          )}
          {event.loc && (
            <span className="meta-item">
              <span aria-hidden="true">📍</span>
              {event.loc}
            </span>
          )}
        </div>
        {event.desc && <p className="event-desc">{event.desc}</p>}
        <span className={`event-badge badge-${event.cat}`}>
          {CATEGORY_LABELS[event.cat]}
        </span>
        {isPast && <span className="badge-past">Pasado</span>}
      </div>
      <div className="event-actions">
        <button className="btn-icon" onClick={() => onEdit(event)} aria-label={`Editar ${event.name}`} title="Editar">
          ✏️
        </button>
        <button className="btn-icon danger" onClick={() => onDelete(event.id)} aria-label={`Eliminar ${event.name}`} title="Eliminar">
          🗑
        </button>
      </div>
    </article>
  );
};

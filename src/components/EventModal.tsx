import React, { useState, useEffect, useRef } from 'react';
import { Event, FormData, Category } from '../types';
import { CATEGORY_OPTIONS } from '../hooks/useEvents';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

const EMPTY_FORM: FormData = {
  name: '', date: '', time: '', cat: 'work', loc: '', desc: '',
};

export const EventModal: React.FC<EventModalProps> = ({ event, onClose, onSave }) => {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [error, setError] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (event) {
      setForm({ name: event.name, date: event.date, time: event.time, cat: event.cat, loc: event.loc, desc: event.desc });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
    setTimeout(() => nameRef.current?.focus(), 50);
  }, [event]);

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.name.trim()) { setError('El nombre es obligatorio.'); return; }
    if (!form.date) { setError('La fecha es obligatoria.'); return; }
    setError('');
    onSave(form);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} onKeyDown={handleKey} role="dialog" aria-modal="true" aria-label={event ? 'Editar evento' : 'Nuevo evento'}>
      <div className="modal">
        <div className="modal-header">
          <h2>{event ? 'Editar evento' : 'Nuevo evento'}</h2>
          <button className="btn-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="form-group">
          <label htmlFor="f-name">Nombre del evento *</label>
          <input ref={nameRef} id="f-name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej: Reunión de equipo" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="f-date">Fecha *</label>
            <input id="f-date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="f-time">Hora</label>
            <input id="f-time" type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="f-cat">Categoría</label>
          <select id="f-cat" value={form.cat} onChange={(e) => set('cat', e.target.value as Category)}>
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="f-loc">Ubicación</label>
          <input id="f-loc" type="text" value={form.loc} onChange={(e) => set('loc', e.target.value)} placeholder="Ej: Sala de conferencias A" />
        </div>

        <div className="form-group">
          <label htmlFor="f-desc">Descripción</label>
          <textarea id="f-desc" rows={3} value={form.desc} onChange={(e) => set('desc', e.target.value)} placeholder="Detalles del evento..." />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSave}>
            <span>✓</span> Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

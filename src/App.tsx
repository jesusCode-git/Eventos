import React, { useState } from 'react';
import { Event, Filters, FormData } from './types';
import { useEvents, filterAndSort, getStats } from './hooks/useEvents';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventModal } from './components/EventModal';
import { ConfirmDialog } from './components/ConfirmDialog';

const DEFAULT_FILTERS: Filters = {
  query: '', cat: '', from: '', to: '', sort: 'date-asc',
};

const App: React.FC = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useEvents();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = filterAndSort(events, filters);
  const stats = getStats(events);
  const deleteTarget = deleteId !== null ? events.find((e) => e.id === deleteId) : null;

  const openCreate = () => { setEditingEvent(null); setModalOpen(true); };
  const openEdit = (e: Event) => { setEditingEvent(e); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingEvent(null); };

  const handleSave = (data: FormData) => {
    if (editingEvent) updateEvent(editingEvent.id, data);
    else createEvent(data);
    closeModal();
  };

  const handleDelete = (id: number) => setDeleteId(id);
  const confirmDelete = () => { if (deleteId !== null) deleteEvent(deleteId); setDeleteId(null); };
  const cancelDelete = () => setDeleteId(null);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-icon" aria-hidden="true">📅</span>
          <h1>Mis Eventos</h1>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <span aria-hidden="true">+</span> Nuevo evento
        </button>
      </header>

      <main className="app-main">
        <StatsBar {...stats} />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />

        <div className="events-list" role="list" aria-label="Lista de eventos">
          {filtered.length === 0 ? (
            <div className="empty-state" role="status">
              <span className="empty-icon" aria-hidden="true">🗓</span>
              <p>No se encontraron eventos</p>
              <span>Intenta ajustar los filtros o crea un nuevo evento.</span>
            </div>
          ) : (
            filtered.map((e) => (
              <EventCard key={e.id} event={e} onEdit={openEdit} onDelete={handleDelete} />
            ))
          )}
        </div>
      </main>

      {modalOpen && (
        <EventModal
          event={editingEvent}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          eventName={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default App;

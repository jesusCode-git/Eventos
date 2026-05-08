import { useState, useEffect, useCallback } from 'react';
import { Event, Filters, FormData, Category } from '../types';

const STORAGE_KEY = 'events-app-data';

const SAMPLE_EVENTS: Event[] = [
  {
    id: 1, name: 'Reunión de diseño de islas', date: '2026-05-08', time: '10:00',
    cat: 'work', loc: 'Sala Einstein', desc: 'Revisión de prototipos', createdAt: Date.now(),
  },
  {
    id: 2, name: 'Cita con ginecologo Juan Vera', date: '2026-05-12', time: '09:30',
    cat: 'health', loc: 'Hospital Angeles', desc: 'Revisión diaria', createdAt: Date.now(),
  },
  {
    id: 3, name: 'Cumpleaños de Virus', date: '2026-05-15', time: '19:00',
    cat: 'social', loc: 'Restaurante El 67', desc: 'Celebración con gays', createdAt: Date.now(),
  },
  {
    id: 4, name: 'Sprint planning', date: '2026-05-20', time: '11:00',
    cat: 'work', loc: 'Zoom', desc: 'Planificación del sprint 1400', createdAt: Date.now(),
  },
  {
    id: 5, name: 'Yoga matutino', date: '2026-05-22', time: '07:00',
    cat: 'health', loc: 'Parque de la petro', desc: 'Sesión semAnal', createdAt: Date.now(),
  },
];

function loadFromStorage(): Event[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Event[];
  } catch {
    
  }
  return SAMPLE_EVENTS;
}

function saveToStorage(events: Event[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(loadFromStorage);
  const [nextId, setNextId] = useState<number>(() => {
    const stored = loadFromStorage();
    return stored.length > 0 ? Math.max(...stored.map((e) => e.id)) + 1 : 1;
  });

  useEffect(() => {
    saveToStorage(events);
  }, [events]);

  const createEvent = useCallback((data: FormData): void => {
    const newEvent: Event = { ...data, id: nextId, createdAt: Date.now() };
    setEvents((prev) => [...prev, newEvent]);
    setNextId((n) => n + 1);
  }, [nextId]);

  const updateEvent = useCallback((id: number, data: FormData): void => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e))
    );
  }, []);

  const deleteEvent = useCallback((id: number): void => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { events, createEvent, updateEvent, deleteEvent };
}

export function filterAndSort(events: Event[], filters: Filters): Event[] {
  const q = filters.query.toLowerCase();

  let result = events.filter((e) => {
    if (q && !e.name.toLowerCase().includes(q) &&
        !e.desc.toLowerCase().includes(q) &&
        !e.loc.toLowerCase().includes(q)) return false;
    if (filters.cat && e.cat !== filters.cat) return false;
    if (filters.from && e.date < filters.from) return false;
    if (filters.to && e.date > filters.to) return false;
    return true;
  });

  if (filters.sort === 'date-asc') {
    result.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  } else if (filters.sort === 'date-desc') {
    result.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
  } else {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function getStats(events: Event[]) {
  const today = new Date().toISOString().slice(0, 10);
  const thisMonth = today.slice(0, 7);
  return {
    total: events.length,
    thisMonth: events.filter((e) => e.date.startsWith(thisMonth)).length,
    upcoming: events.filter((e) => e.date >= today).length,
  };
}

export const CATEGORY_LABELS: Record<string, string> = {
  work: 'Trabajo',
  personal: 'Personal',
  social: 'Social',
  health: 'Salud',
  otro: 'Otro',
};

export const CATEGORY_OPTIONS: Array<{ value: Category; label: string }> = [
  { value: 'work', label: 'Trabajo' },
  { value: 'personal', label: 'Personal' },
  { value: 'social', label: 'Social' },
  { value: 'health', label: 'Salud' },
  { value: 'otro', label: 'Otro' },
];

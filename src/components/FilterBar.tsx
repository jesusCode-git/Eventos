import React from 'react';
import { Filters, Category, SortOption } from '../types';
import { CATEGORY_OPTIONS } from '../hooks/useEvents';

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange, onClear }) => {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.query !== '' ||
    filters.cat !== '' ||
    filters.from !== '' ||
    filters.to !== '';

  return (
    <div className="filter-bar">
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          value={filters.query}
          onChange={(e) => set('query', e.target.value)}
          placeholder="Buscar por nombre, descripción o lugar..."
          aria-label="Buscar eventos"
        />
        {filters.query && (
          <button className="search-clear" onClick={() => set('query', '')} aria-label="Limpiar búsqueda">✕</button>
        )}
      </div>

      <div className="filter-row">
        <select
          value={filters.cat}
          onChange={(e) => set('cat', e.target.value as Category | '')}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <div className="date-range">
          <label htmlFor="filter-from" className="sr-only">Desde</label>
          <input
            id="filter-from"
            type="date"
            value={filters.from}
            onChange={(e) => set('from', e.target.value)}
            title="Desde"
            aria-label="Fecha desde"
          />
          <span className="range-sep" aria-hidden="true">→</span>
          <label htmlFor="filter-to" className="sr-only">Hasta</label>
          <input
            id="filter-to"
            type="date"
            value={filters.to}
            onChange={(e) => set('to', e.target.value)}
            title="Hasta"
            aria-label="Fecha hasta"
          />
        </div>

        <select
          value={filters.sort}
          onChange={(e) => set('sort', e.target.value as SortOption)}
          aria-label="Ordenar por"
        >
          <option value="date-asc">Fecha ↑</option>
          <option value="date-desc">Fecha ↓</option>
          <option value="name">Nombre A-Z</option>
        </select>

        {hasActiveFilters && (
          <button className="btn-clear" onClick={onClear} title="Limpiar filtros">
            ✕ Limpiar
          </button>
        )}
      </div>
    </div>
  );
};

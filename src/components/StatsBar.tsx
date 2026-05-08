import React from 'react';

interface StatsBarProps {
  total: number;
  thisMonth: number;
  upcoming: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ total, thisMonth, upcoming }) => (
  <div className="stats-bar" role="region" aria-label="Estadísticas">
    <div className="stat-card">
      <span className="stat-label">Total</span>
      <span className="stat-value">{total}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Este mes</span>
      <span className="stat-value">{thisMonth}</span>
    </div>
    <div className="stat-card">
      <span className="stat-label">Próximos</span>
      <span className="stat-value">{upcoming}</span>
    </div>
  </div>
);

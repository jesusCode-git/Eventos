import React from 'react';

interface ConfirmDialogProps {
  eventName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ eventName, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()} role="alertdialog" aria-modal="true" aria-label="Confirmar eliminación">
    <div className="confirm-dialog">
      <div className="confirm-icon">🗑</div>
      <h3>Eliminar evento</h3>
      <p>¿Seguro que deseas eliminar <strong>{eventName}</strong>? Esta acción no se puede deshacer.</p>
      <div className="modal-actions">
        <button className="btn-secondary" onClick={onCancel}>Cancelar</button>
        <button className="btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </div>
  </div>
);

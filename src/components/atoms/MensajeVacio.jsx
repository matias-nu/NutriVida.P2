import React from 'react';

export const MensajeVacio = ({ texto = "No se encontraron resultados" }) => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
      <p>{texto}</p>
    </div>
  );
}; 
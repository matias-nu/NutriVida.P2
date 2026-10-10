import React from 'react';

export const SelectorOrden = ({ orden, alCambiarOrden }) => {
  return (
    <div className="selector-orden" style={{ marginBottom: '1rem' }}>
      <label htmlFor="ordenar" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
        Ordenar por:
      </label>
      <select
        id="ordenar"
        value={orden}
        onChange={(e) => alCambiarOrden(e.target.value)}
        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="defecto">Por defecto</option>
        <option value="precio-asc">Precio: Menor a Mayor</option>
        <option value="precio-desc">Precio: Mayor a Menor</option>
        <option value="nombre">Nombre (A-Z)</option>
      </select>
    </div> 
  );
};  
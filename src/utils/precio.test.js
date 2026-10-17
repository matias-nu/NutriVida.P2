import { describe, test, expect } from 'vitest';

describe('Pruebas de precios', () => {
  
  test('verificar que el precio sea un número positivo', () => {
    const precioServicio = 25000;
    expect(precioServicio).toBeGreaterThan(0);
  });

  test('calcular el total de dos servicios', () => {
    const precio1 = 15000;
    const precio2 = 20000;
    const total = precio1 + precio2;

    expect(total).toBe(35000);
  });

  test('verificar que el texto del precio tenga formato', () => {
    const precio = 30000;
    const textoPrecio = `$${precio}`;

    expect(textoPrecio).toBe('$30000');
  });

}); 
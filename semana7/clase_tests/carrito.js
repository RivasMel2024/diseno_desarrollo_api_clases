export function agregarProducto(carrito, producto) {
  carrito.push(producto);
  return carrito;
}

export function eliminarProducto(carrito, id) {
  const indice = carrito.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    throw new Error('Producto no encontrado');
  }

  carrito.splice(indice, 1);
  return carrito;
}

export function calcularTotal(carrito) {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

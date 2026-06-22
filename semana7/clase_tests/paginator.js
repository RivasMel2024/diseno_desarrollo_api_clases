export function paginar(lista, pagina, tamano) {
  if (pagina < 1 || tamano < 1) {
    throw new Error('Página o tamaño inválido');
  }

  const totalPaginas =
    lista.length === 0 ? 1 : Math.ceil(lista.length / tamano);

  if (pagina > totalPaginas) {
    throw new Error('La página no existe');
  }

  const inicio = (pagina - 1) * tamano;
  return lista.slice(inicio, inicio + tamano);
}

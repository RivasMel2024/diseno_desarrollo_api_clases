export function validarPassword(password) {
  const minimoCaracteres = password.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneEspecial = /[!@#$%]/.test(password);

  return minimoCaracteres && tieneMayuscula && tieneNumero && tieneEspecial;
}

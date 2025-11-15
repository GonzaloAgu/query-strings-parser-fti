/**
 * verifica que la cadena ingresada sea un query string
 */
function validarCadena(cadena) {

  //Inicia si o si con un caracter del alfabeto, luego cualquier verdura 🥦
  const patronClave = `[a-zA-Z][^&]*`;

  //cualquier verdura excepto los &
  const patronValor = "[^&]*";

  //Todo junto 
  const patronClaveValor = `${patronClave}=${patronValor}`;

  const patron = `^\\?${patronClaveValor}(&${patronClaveValor})*$`;

  const expresionRegular = new RegExp(patron);
  return expresionRegular.test(cadena);
}

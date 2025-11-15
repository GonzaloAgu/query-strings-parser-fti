document.addEventListener("DOMContentLoaded", () => {
  // --- Configuracion Inicial ---
  const form = document.getElementById("form");
  const cadenaInput = document.getElementById("cadenaInput");
  const resultadoDiv = document.getElementById("resultado");

  // La ER que va a extraer la clave y el valor
  const regexExtractor = /([a-zA-Z]\w*)=([^&]*)/g;

  // --- Manejador del Formulario ---
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que la pagina se recargue
    const cadena = cadenaInput.value;

    // Antes de intentar extraer nada, usamos una funcion de validacion
    if (validarCadena(cadena)) {
      const parseado = {}; // El objeto final donde guardaremos los resultados

      //Esto nos devuelve un "iterador" con todas las coincidencias que encontro la RegEx en la cadena.
      const matches = cadena.matchAll(regexExtractor);

      //Procesamos los pares clave y valor
      for (const match of matches) {
        // Asignamos el GRUPO 1  (clave) y GRUPO 2 y lo decodificamos
        let clave = decodificar(match[1]);
        let valor = decodificar(match[2]);

        // si el valor es un numero, se convierte en tal
        const valorComoNumero = Number(valor);
        if (!isNaN(valorComoNumero) && valor.trim() !== "") {
          valor = valorComoNumero;
        }

        // se verifica si la clave ya se uso, y de ser así, se guardan los valores en un array
        if (parseado[clave] === undefined) {
          parseado[clave] = valor;
        } else if (Array.isArray(parseado[clave])) {
          parseado[clave].push(valor);
        } else {
          parseado[clave] = [parseado[clave], valor];
        }
      }
      
      //Para mostrar el resultado
      resultadoDiv.innerHTML = "<pre></pre>";
      resultadoDiv.querySelector("pre").textContent = JSON.stringify(
        parseado,
        null,
        2
      );
    } else {
      // Si la validacion inicial falla, mostramos un error
      resultadoDiv.innerHTML = "<pre></pre>";
      resultadoDiv.querySelector("pre").textContent =
        "La cadena " + cadena + " no es válida.";
    }
  });
});

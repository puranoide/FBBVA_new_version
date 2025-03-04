// Obtener el formulario
const formulario = document.getElementById("formulario");

// Configuración de métricas organizada por plataforma
const CONFIGURACION_METRICAS = {
  facebook: {
    vistas: {
      entrada: "visualizacionesfb",
      divisor: "postalmesfb",
      salida: "View_Rate",
      etiqueta: "View Rate",
      formato: "fijo",
    },
    interacciones: {
      entrada: "interracionesconelcontenidofb",
      divisor: "alcancefb",
      salida: "Engagement_Rate",
      etiqueta: "Engagement Rate",
      formato: "porcentaje",
    },
    clics: {
      entrada: "clicsenelalcancefb",
      divisor: "alcancefb",
      salida: "Clickthrough_Rate",
      etiqueta: "Clickthrough Rate",
      formato: "porcentaje",
    },
    publicaciones: {
      entrada: "visualizacionesxpublicacionesfb",
      divisor: "nPublicacionesfb",
      salida: "KPI_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
    reels: {
      entrada: "visualizacionesxreels",
      divisor: "nReels",
      salida: "KPI2_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
    historias: {
      entrada: "visualizacionesxhistorias",
      divisor: "nHistorias",
      salida: "KPI3_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
  },
  instagram: {
    vistas: {
      entrada: "visualizacionesBFB",
      divisor: "nPostsEnElMesIg",
      salida: "View_Rate2",
      etiqueta: "View Rate",
      formato: "fijo",
    },
    interacciones: {
      entrada: "interaccionesconelcontenidoig",
      divisor: "alcanceIg",
      salida: "Engagement_Rate2",
      etiqueta: "Engagement Rate",
      formato: "porcentaje",
    },
    clics: {
      entrada: "clicsenelalcanceig",
      divisor: "alcanceIg",
      salida: "Clickthrough_Rate2",
      etiqueta: "Clickthrough Rate",
      formato: "porcentaje",
    },
    publicaciones: {
      entrada: "visualizacionesxpublicacionesig",
      divisor: "nPublicacionesig",
      salida: "KPI4_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
    reels: {
      entrada: "visualizacionesxreelsig",
      divisor: "nReelsig",
      salida: "KPI5_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
    historias: {
      entrada: "alcanceHistoriasig",
      divisor: "nHistoriasig",
      salida: "KPI6_Visualizaciones_Posts",
      etiqueta: "KPI Visualizaciones / Posts",
      formato: "fijo",
    },
  },
  tiktok: {
    vistas: {
      entrada: "visualizacionesdevideoTikTok",
      divisor: "nPublicacionesTikTok",
      salida: "View_Rate3",
      etiqueta: "View Rate",
      formato: "fijo",
    },
  },
  x: {
    vistas: {
      entrada: "inpremionesx",
      divisor: "nPublicacionesx",
      salida: "View_Rate4",
      etiqueta: "View Rate",
      formato: "fijo",
    },
  },
};

/**
 * Calcula una métrica basada en los valores de entrada y divisor.
 * @param {string} valorEntrada - El valor numerador
 * @param {string} valorDivisor - El valor denominador
 * @param {string} formato - Tipo de formato ('porcentaje' o 'fijo')
 * @returns {string} - El resultado formateado
 */
function calcularMetrica(valorEntrada, valorDivisor, formato) {
  const numero = parseInt(valorEntrada) || 0;
  const denominador = parseInt(valorDivisor) || 1; // Evita división por cero
  const resultado =
    formato === "porcentaje"
      ? (numero / denominador) * 100
      : numero / denominador;

  return formato === "porcentaje" ? `${resultado.toFixed(2)}%` : resultado.toFixed();
}

/**
 * Obtiene los elementos del DOM para una métrica específica.
 * @param {Object} config - Configuración de la métrica
 * @returns {Object} - Elementos del DOM o lanza error si faltan
 */
function obtenerElementosDOM(config) {
  const entrada = document.getElementById(config.entrada);
  const divisor = document.getElementById(config.divisor);
  const salida = document.getElementById(config.salida);

  if (!entrada || !divisor || !salida) {
    throw new Error(`Falta elemento para ${config.entrada}`);
  }

  return { entrada, divisor, salida };
}

/**
 * Crea un manejador de eventos para una métrica específica.
 * @param {Object} config - Configuración de la métrica
 * @returns {Function} - Función manejadora del evento
 */
function crearManejadorMetrica(config) {
  return function () {
    try {
      const { entrada, divisor, salida } = obtenerElementosDOM(config);
      const resultado = calcularMetrica(entrada.value, divisor.value, config.formato);
      
      salida.textContent = config.etiqueta
        ? `${config.etiqueta}: ${resultado}`
        : resultado;
      
      console.log(`Calculado ${config.salida}: ${resultado}`);
    } catch (error) {
      console.error(`Error al calcular ${config.salida}:`, error);
    }
  };
}

/**
 * Registra los eventos para todas las métricas configuradas.
 */
function registrarEventos() {
  Object.values(CONFIGURACION_METRICAS).forEach((plataforma) => {
    Object.values(plataforma).forEach((metrica) => {
      const elementoEntrada = document.getElementById(metrica.entrada);
      if (elementoEntrada) {
        elementoEntrada.addEventListener("blur", crearManejadorMetrica(metrica));
      } else {
        console.warn(`No se encontró elemento con ID: ${metrica.entrada}`);
      }
    });
  });
}

// Iniciar la aplicación
registrarEventos();

var alcancefbads = document.getElementById("alcancefbads");
var interracionesconelcontenidofbads = document.getElementById("interracionesconelcontenidofbads");
var clicsenelalcancefbads = document.getElementById("clicsenelalcancefbads");

var alcanceIgads = document.getElementById("alcanceIgads");
var interaccionesconelcontenidoigads = document.getElementById("interaccionesconelcontenidoigads");
var clicsenelalcanceigads = document.getElementById("clicsenelalcanceigads");

alcancefbads.addEventListener("mouseenter", function() {
    var alcancefb = document.getElementById("alcancefb");
    const valor = parseInt(alcancefbads.value) || 0;
    const total = parseInt(alcancefb.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    alcancefbads.parentNode.insertBefore(tooltip, alcancefbads.nextSibling);
});

alcancefbads.addEventListener("mouseleave", function() {
    const tooltip = alcancefbads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

interracionesconelcontenidofbads.addEventListener("mouseenter", function() {
    var interracionesconelcontenidofb = document.getElementById("interracionesconelcontenidofb");
    const valor = parseInt(interracionesconelcontenidofbads.value) || 0;
    const total = parseInt(interracionesconelcontenidofb.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    interracionesconelcontenidofbads.parentNode.insertBefore(tooltip, interracionesconelcontenidofbads.nextSibling);
});

interracionesconelcontenidofbads.addEventListener("mouseleave", function() {
    const tooltip = interracionesconelcontenidofbads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

clicsenelalcancefbads.addEventListener("mouseenter", function() {
    var clicsenelalcancefb = document.getElementById("clicsenelalcancefb");
    const valor = parseInt(clicsenelalcancefbads.value) || 0;
    const total = parseInt(clicsenelalcancefb.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    clicsenelalcancefbads.parentNode.insertBefore(tooltip, clicsenelalcancefbads.nextSibling);
});

clicsenelalcancefbads.addEventListener("mouseleave", function() {
    const tooltip = clicsenelalcancefbads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

alcanceIgads.addEventListener("mouseenter", function() {
    var alcanceIg = document.getElementById("alcanceIg");
    const valor = parseInt(alcanceIgads.value) || 0;
    const total = parseInt(alcanceIg.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    alcanceIgads.parentNode.insertBefore(tooltip, alcanceIgads.nextSibling);
});

alcanceIgads.addEventListener("mouseleave", function() {
    const tooltip = alcanceIgads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

interaccionesconelcontenidoigads.addEventListener("mouseenter", function() {
    var interaccionesconelcontenidoig = document.getElementById("interaccionesconelcontenidoig");
    const valor = parseInt(interaccionesconelcontenidoigads.value) || 0;
    const total = parseInt(interaccionesconelcontenidoig.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    interaccionesconelcontenidoigads.parentNode.insertBefore(tooltip, interaccionesconelcontenidoigads.nextSibling);
});

interaccionesconelcontenidoigads.addEventListener("mouseleave", function() {
    const tooltip = interaccionesconelcontenidoigads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});

clicsenelalcanceigads.addEventListener("mouseenter", function() {
    var clicsenelalcanceig = document.getElementById("clicsenelalcanceig");
    const valor = parseInt(clicsenelalcanceigads.value) || 0;
    const total = parseInt(clicsenelalcanceig.value) || 1;
    const porcentaje = (valor / total * 100).toFixed(2);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = `${porcentaje}%`;
    clicsenelalcanceigads.parentNode.insertBefore(tooltip, clicsenelalcanceigads.nextSibling);
});

clicsenelalcanceigads.addEventListener("mouseleave", function() {
    const tooltip = clicsenelalcanceigads.parentNode.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
});
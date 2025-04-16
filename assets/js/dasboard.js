// Obtener el formulario
const formulario = document.getElementById("formulario");
const botonEnviar = document.getElementById("enviar");
const resultadosRegistros = document.getElementById("resultadosRegistros");
// Configuración de métricas organizada por plataforma ESTO ES UN OBJETO,NO UN ARRAY,debe ser consumido
const CONFIGURACION_METRICAS = {
  //este objeto tiene 4 diccionarios, uno para cada plataforma
  facebook: {
    //aca detallamos cada una de las metricas,donde recibe una entrada,divisor y tambien que etiqueta(texto que se muestra) debe acompañar a la salida,salida que es el id del elemento dom donde se va a mostrar el resultado y el formato(fijo o porcentaje)
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



//logica de porcentaje de ads


// Configuración de elementos y sus referencias
const CONFIG_ELEMENTOS = {
  facebook: {
    alcance: {
      elementoAds: "alcancefbads",
      elementoTotal: "alcancefb",
    },
    interacciones: {
      elementoAds: "interracionesconelcontenidofbads",
      elementoTotal: "interracionesconelcontenidofb",
    },
    clics: {
      elementoAds: "clicsenelalcancefbads",
      elementoTotal: "clicsenelalcancefb",
    },
  },
  instagram: {
    alcance: {
      elementoAds: "alcanceIgads",
      elementoTotal: "alcanceIg",
    },
    interacciones: {
      elementoAds: "interaccionesconelcontenidoigads",
      elementoTotal: "interaccionesconelcontenidoig",
    },
    clics: {
      elementoAds: "clicsenelalcanceigads",
      elementoTotal: "clicsenelalcanceig",
    },
  },
};

// Obtener elementos del DOM al inicio
const elementosDOM = {};
Object.entries(CONFIG_ELEMENTOS).forEach(([plataforma, metricas]) => {
  elementosDOM[plataforma] = {};
  Object.entries(metricas).forEach(([metrica, config]) => {
    elementosDOM[plataforma][metrica] = {
      ads: document.getElementById(config.elementoAds),
      total: document.getElementById(config.elementoTotal),
    };
  });
});

/**
 * Calcula el porcentaje entre dos valores.
 * @param {string} valor - Valor del elemento ads
 * @param {string} total - Valor del elemento total
 * @returns {string} Porcentaje formateado
 */
function calcularPorcentaje(valor, total) {
  const numValor = parseInt(valor) || 0;
  const numTotal = parseInt(total) || 1; // Evitar división por cero
  return ((numValor / numTotal) * 100).toFixed(2) + "%";
}

/**
 * Muestra un tooltip con el porcentaje.
 * @param {HTMLElement} elemento - Elemento donde mostrar el tooltip
 * @param {string} porcentaje - Valor del porcentaje a mostrar
 */
function mostrarTooltip(elemento, porcentaje) {
  const tooltip = document.createElement("span");
  tooltip.className = "tooltip";
  tooltip.textContent = porcentaje;
  elemento.parentNode.insertBefore(tooltip, elemento.nextSibling);
}

/**
 * Elimina el tooltip asociado a un elemento.
 * @param {HTMLElement} elemento - Elemento cuyo tooltip eliminar
 */
function eliminarTooltip(elemento) {
  const tooltip = elemento.parentNode.querySelector(".tooltip");
  if (tooltip) tooltip.remove();
}

/**
 * Crea manejadores de eventos para mostrar/ocultar tooltips.
 * @param {HTMLElement} elementoAds - Elemento ads
 * @param {HTMLElement} elementoTotal - Elemento total
 */
function configurarEventosTooltip(elementoAds, elementoTotal) {
  elementoAds.addEventListener("mouseenter", () => {
    const porcentaje = calcularPorcentaje(elementoAds.value, elementoTotal.value);
    mostrarTooltip(elementoAds, porcentaje);
  });

  elementoAds.addEventListener("mouseleave", () => {
    eliminarTooltip(elementoAds);
  });
}

// Registrar eventos para todos los elementos
Object.values(elementosDOM).forEach((plataforma) => {
  Object.values(plataforma).forEach(({ ads, total }) => {
    if (ads && total) {
      configurarEventosTooltip(ads, total);
    } else {
      console.warn(`Faltan elementos para configurar: ${ads?.id || "ads"} o ${total?.id || "total"}`);
    }
  });
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  insertarDatos(data);
});

function insertarDatos(data) {
  fetch("../controller/registros.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "insert",
      data: data
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Error al insertar datos:", error);
    });
}

var Registros = {}

function listarRegistros() {
  fetch("../controller/registros.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "list"
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      Registros = result.data
      MostrarRegistros2(Registros);

    })
    .catch((error) => {
      console.error("Error al listar registros:", error);
    });
}
// Iniciar la aplicación
window.addEventListener("load", iniciarApp);
function iniciarApp() {
  registrarEventos();
  listarRegistros();
}
function MostrarRegistros(Registros) {
  console.log(Registros);
  Registros.forEach(registro => {
    var fecha = formatoFecha(registro.fechaCreada);
    var containerRegistro = document.createElement("div");
    containerRegistro.classList.add("container-registro");
    //resultadosRegistros.appendChild(containerRegistro);

    var pFecha = document.createElement("p");
    pFecha.textContent = fecha;
    pFecha.classList.add("fechaRegistro");
    //conteiner con ads
    var divRowContainer = document.createElement("div");
    divRowContainer.classList.add("row-container-registros");


    var divRowContainerAlcance = document.createElement("div");
    divRowContainerAlcance.classList.add("row-container-registros");

    var divRowContainerInteracciones = document.createElement("div");
    divRowContainerInteracciones.classList.add("row-container-registros");

    var divRowContainerClicsEnlacefb = document.createElement("div");
    divRowContainerClicsEnlacefb.classList.add("row-container-registros");

    var divRowContainerAlcanceIg = document.createElement("div");
    divRowContainerAlcanceIg.classList.add("row-container-registros");

    var divRowContainerInteraccionesIg = document.createElement("div");
    divRowContainerInteraccionesIg.classList.add("row-container-registros");

    var divRowContainerClicsEnlaceIg = document.createElement("div");
    divRowContainerClicsEnlaceIg.classList.add("row-container-registros");


    //Parrafos normales

    var pSeguidoresfb = document.createElement("p");
    pSeguidoresfb.textContent = 'Seguidores totales: ' + registro.seguidoresfb;
    pSeguidoresfb.classList.add("fechaRegistro");

    var ppostalmesfb = document.createElement("p");
    ppostalmesfb.textContent = '# Posts (cuántas en el mes) :' + registro.postalmesfb;
    ppostalmesfb.classList.add("fechaRegistro");
    var pVisualizacionesfb = document.createElement("p");
    pVisualizacionesfb.textContent = 'Visualizaciones :' + registro.visualizacionesfb;
    pVisualizacionesfb.classList.add("fechaRegistro");
    var pInversionPublicitaria = document.createElement("p");
    pInversionPublicitaria.textContent = 'Inversion Publicitaria :' + registro.inversionPublicitaria;
    pInversionPublicitaria.classList.add("fechaRegistro")

    var pNumeroDePublicacionesFb = document.createElement("p");
    pNumeroDePublicacionesFb.textContent = 'Numero de publicaciones: ' + registro.nPublicacionesfb;
    pNumeroDePublicacionesFb.classList.add("fechaRegistro");

    var pvisualizacionesxpublicacionesfb = document.createElement("p");
    pvisualizacionesxpublicacionesfb.textContent = 'Numero de visualizaciones: ' + registro.visualizacionesxpublicacionesfb;
    pvisualizacionesxpublicacionesfb.classList.add("fechaRegistro");

    var pInteraccionesxpublicacionesfb = document.createElement("p");
    pInteraccionesxpublicacionesfb.textContent = 'Numero de interacciones: ' + registro.interaccionesxpublicacionesfb;
    pInteraccionesxpublicacionesfb.classList.add("fechaRegistro");

    var pnHistorias = document.createElement("p");
    pnHistorias.textContent = '# de historias: ' + registro.nHistorias;
    pnHistorias.classList.add("fechaRegistro");

    var pnReels = document.createElement("p");
    pnReels.textContent = '# de reels: ' + registro.nReels;
    pnReels.classList.add("fechaRegistro");

    var pVisualizacionesxreels = document.createElement("p");
    pVisualizacionesxreels.textContent = 'Visualizaciones: ' + registro.visualizacionesxreels;
    pVisualizacionesxreels.classList.add("fechaRegistro");

    var pInteraccionesxreels = document.createElement("p");
    pInteraccionesxreels.textContent = 'Interacciones: ' + registro.interaccionesxreels;
    pInteraccionesxreels.classList.add("fechaRegistro");

    var pvisualizacionesxhistorias = document.createElement("p");
    pvisualizacionesxhistorias.textContent = 'Visualizaciones: ' + registro.visualizacionesxhistorias;
    pvisualizacionesxhistorias.classList.add("fechaRegistro");

    var pinteraccionesxhistorias = document.createElement("p");
    pinteraccionesxhistorias.textContent = 'Interacciones: ' + registro.interaccionesxhistorias;
    pinteraccionesxhistorias.classList.add("fechaRegistro");

    var pseguidoresTotalesIg = document.createElement("p");
    pseguidoresTotalesIg.textContent = 'Seguidores totales: ' + registro.seguidoresTotalesIg;
    pseguidoresTotalesIg.classList.add("fechaRegistro");

    var pseguidoresdelmesIg = document.createElement("p");
    pseguidoresdelmesIg.textContent = 'Seguidores del mes: ' + registro.seguidoresdelmesIg;
    pseguidoresdelmesIg.classList.add("fechaRegistro");

    var pnPostsEnElMesIg = document.createElement("p");
    pnPostsEnElMesIg.textContent = '# Posts (cuántas en el mes): ' + registro.nPostsEnElMesIg;
    pnPostsEnElMesIg.classList.add("fechaRegistro");

    var pvisualizacionesBFB = document.createElement("p");
    pvisualizacionesBFB.textContent = 'Visualizaciones BFB: ' + registro.visualizacionesBFB;
    pvisualizacionesBFB.classList.add("fechaRegistro");

    var pinversionPublicitariaig = document.createElement("p");
    pinversionPublicitariaig.textContent = 'Inversion Publicitaria: ' + registro.inversionPublicitariaig;
    pinversionPublicitariaig.classList.add("fechaRegistro");

    var pnPublicacionesig = document.createElement("p");
    pnPublicacionesig.textContent = 'Numero de publicaciones: ' + registro.nPublicacionesig;
    pnPublicacionesig.classList.add("fechaRegistro");

    var pvisualizacionesxpublicacionesig = document.createElement("p");
    pvisualizacionesxpublicacionesig.textContent = 'visualizaciones: ' + registro.visualizacionesxpublicacionesig;
    pvisualizacionesxpublicacionesig.classList.add("fechaRegistro");

    var pinteraccionesxpublicacionesig = document.createElement("p");
    pinteraccionesxpublicacionesig.textContent = 'interacciones: ' + registro.interaccionesxpublicacionesig;
    pinteraccionesxpublicacionesig.classList.add("fechaRegistro");

    var pnReelsig = document.createElement("p");
    pnReelsig.textContent = '# de reels: ' + registro.nReelsig;
    pnReelsig.classList.add("fechaRegistro");

    var pvisualizacionesxreelsig = document.createElement("p");
    pvisualizacionesxreelsig.textContent = 'visualizaciones: ' + registro.visualizacionesxreelsig;
    pvisualizacionesxreelsig.classList.add("fechaRegistro");

    var pinteraccionesxreelsig = document.createElement("p");
    pinteraccionesxreelsig.textContent = 'interacciones: ' + registro.interaccionesxreelsig;
    pinteraccionesxreelsig.classList.add("fechaRegistro");


    var pnHistoriasig = document.createElement("p");
    pnHistoriasig.textContent = '# de historias: ' + registro.nHistoriasig;
    pnHistoriasig.classList.add("fechaRegistro");

    var palcanceHistoriasig = document.createElement("p");
    palcanceHistoriasig.textContent = 'Alcance: ' + registro.alcanceHistoriasig;
    palcanceHistoriasig.classList.add("fechaRegistro");

    var pinteraccionesHistoriasig = document.createElement("p");
    pinteraccionesHistoriasig.textContent = 'Interacciones: ' + registro.interaccionesHistoriasig;
    pinteraccionesHistoriasig.classList.add("fechaRegistro");

    var pseguidorestotalesTikTok = document.createElement("p");
    pseguidorestotalesTikTok.textContent = 'Seguidores totales: ' + registro.seguidorestotalesTikTok;
    pseguidorestotalesTikTok.classList.add("fechaRegistro");

    var pnSeguidoresDelMesTikTok = document.createElement("p");
    pnSeguidoresDelMesTikTok.textContent = 'Seguidores del mes: ' + registro.nSeguidoresDelMesTikTok;
    pnSeguidoresDelMesTikTok.classList.add("fechaRegistro");

    var pnPublicacionesTikTok = document.createElement("p");
    pnPublicacionesTikTok.textContent = 'Publicaciones: ' + registro.nPublicacionesTikTok;
    pnPublicacionesTikTok.classList.add("fechaRegistro");

    var pnMeGustaDelMesTikTok = document.createElement("p");
    pnMeGustaDelMesTikTok.textContent = 'Me gusta del mes: ' + registro.nMeGustaDelMesTikTok;
    pnMeGustaDelMesTikTok.classList.add("fechaRegistro");

    var pvisualizacionesdevideoTikTok = document.createElement("p");
    pvisualizacionesdevideoTikTok.textContent = 'Visualizaciones de video: ' + registro.visualizacionesdevideoTikTok;
    pvisualizacionesdevideoTikTok.classList.add("fechaRegistro");

    var pseguidorestotalesx = document.createElement("p");
    pseguidorestotalesx.textContent = 'Seguidores totales: ' + registro.seguidorestotalesx;
    pseguidorestotalesx.classList.add("fechaRegistro");

    var pnSeguidoresDelMesx = document.createElement("p");
    pnSeguidoresDelMesx.textContent = 'Seguidores del mes: ' + registro.nSeguidoresDelMesx;
    pnSeguidoresDelMesx.classList.add("fechaRegistro");

    var pnPublicacionesx = document.createElement("p");
    pnPublicacionesx.textContent = 'Publicaciones: ' + registro.nPublicacionesx;
    pnPublicacionesx.classList.add("fechaRegistro");

    var pinpremionesx = document.createElement("p");
    pinpremionesx.textContent = 'Premios: ' + registro.inpremionesx;
    pinpremionesx.classList.add("fechaRegistro");

    //definimos las variables que tienen ads
    var Pseguidoresdelmesfb = document.createElement("p");
    Pseguidoresdelmesfb.textContent = 'Seguidores del mes: ' + registro.seguidoresdelmesfb;
    var Pseguidoresdelmesfbads = document.createElement("p");
    Pseguidoresdelmesfbads.textContent = 'ads: ' + registro.seguidoresdelmesfbads;

    var pAlcancefb = document.createElement("p");
    pAlcancefb.textContent = 'Alcance: ' + registro.alcancefb;
    var pAlcancefbads = document.createElement("p");
    pAlcancefbads.textContent = 'ads: ' + registro.alcancefbads;

    var pInteraccionesconelcontenidofb = document.createElement("p");
    pInteraccionesconelcontenidofb.textContent = 'Interacciones con el contenido: ' + registro.interracionesconelcontenidofb;
    var pInteraccionesconelcontenidofbads = document.createElement("p");
    pInteraccionesconelcontenidofbads.textContent = 'ads: ' + registro.interracionesconelcontenidofbads;

    var pclicsenelalcancefb = document.createElement("p");
    pclicsenelalcancefb.textContent = 'Clics en el enlace :' + registro.clicsenelalcancefb;
    var pclicsenelalcancefbads = document.createElement("p");
    pclicsenelalcancefbads.textContent = 'ads: ' + registro.clicsenelalcancefbads;


    var pAlcanceIg = document.createElement("p");
    pAlcanceIg.textContent = 'Alcance: ' + registro.alcanceIg;
    var pAlcanceIgads = document.createElement("p");
    pAlcanceIgads.textContent = 'ads: ' + registro.alcanceIgads;

    var pinteraccionesconelcontenidoig = document.createElement("p");
    pinteraccionesconelcontenidoig.textContent = 'Interacciones con el contenido: ' + registro.interaccionesconelcontenidoig;
    var pinteraccionesconelcontenidoigads = document.createElement("p");
    pinteraccionesconelcontenidoigads.textContent = 'ads: ' + registro.interaccionesconelcontenidoigads;

    var pclicsenelalcanceig = document.createElement("p");
    pclicsenelalcanceig.textContent = 'Clics en el enlace :' + registro.clicsenelalcanceig;
    var pclicsenelalcanceigads = document.createElement("p");
    pclicsenelalcanceigads.textContent = 'ads: ' + registro.clicsenelalcanceigads;

    //metemos en un div los p que tienen ads
    divRowContainer.appendChild(Pseguidoresdelmesfb);
    divRowContainer.appendChild(Pseguidoresdelmesfbads);
    divRowContainerAlcance.appendChild(pAlcancefb);
    divRowContainerAlcance.appendChild(pAlcancefbads);
    divRowContainerInteracciones.appendChild(pInteraccionesconelcontenidofb);
    divRowContainerInteracciones.appendChild(pInteraccionesconelcontenidofbads);
    divRowContainerClicsEnlacefb.appendChild(pclicsenelalcancefb);
    divRowContainerClicsEnlacefb.appendChild(pclicsenelalcancefbads);

    divRowContainerAlcanceIg.appendChild(pAlcanceIg);
    divRowContainerAlcanceIg.appendChild(pAlcanceIgads);
    divRowContainerInteraccionesIg.appendChild(pinteraccionesconelcontenidoig);
    divRowContainerInteraccionesIg.appendChild(pinteraccionesconelcontenidoigads);

    divRowContainerClicsEnlaceIg.appendChild(pclicsenelalcanceig);
    divRowContainerClicsEnlaceIg.appendChild(pclicsenelalcanceigads);


    //kpis
    var ViewRateFb = (registro.visualizacionesfb / registro.postalmesfb).toFixed(0);
    var pViewRateFb = document.createElement("p");
    pViewRateFb.textContent = 'View Rate Fb: ' + ViewRateFb;
    pViewRateFb.classList.add("card-kpis");

    var engagementRateFb = (registro.interracionesconelcontenidofb / registro.alcancefb * 100).toFixed(2);
    var pEngagementRateFb = document.createElement("p");
    pEngagementRateFb.textContent = 'Engagement Rate Fb: ' + engagementRateFb + '%';
    pEngagementRateFb.classList.add("card-kpis");

    var clickthroughRateFb = (registro.clicsenelalcancefb / registro.alcancefb * 100).toFixed(2);
    var pClickthroughRateFb = document.createElement("p");
    pClickthroughRateFb.textContent = 'Clickthrough Rate Fb: ' + clickthroughRateFb + '%';
    pClickthroughRateFb.classList.add("card-kpis");

    var kpiVisualizaciones_Posts = (registro.visualizacionesxpublicacionesfb / registro.nPublicacionesfb).toFixed(0);
    var pKPI_Visualizaciones_Posts = document.createElement("p");
    pKPI_Visualizaciones_Posts.textContent = 'KPI Visualizaciones / Posts:' + kpiVisualizaciones_Posts;
    pKPI_Visualizaciones_Posts.classList.add("card-kpis");

    var KPI_Visualizaciones_Posts_reels = (registro.visualizacionesxreels / registro.nReels).toFixed(0);
    var pKPI_Visualizaciones_Posts_reels = document.createElement("p");
    pKPI_Visualizaciones_Posts_reels.textContent = 'KPI Visualizaciones / Posts:' + KPI_Visualizaciones_Posts_reels;
    pKPI_Visualizaciones_Posts_reels.classList.add("card-kpis");

    var Kpi_visualizaciones_post_historias = (registro.visualizacionesxhistorias / registro.nHistorias).toFixed(0);
    var pKpi_visualizaciones_post_historias = document.createElement("p");
    pKpi_visualizaciones_post_historias.textContent = 'KPI Visualizaciones / Posts:' + Kpi_visualizaciones_post_historias;
    pKpi_visualizaciones_post_historias.classList.add("card-kpis");

    var kpi_View_Rate_ig = (registro.visualizacionesBFB / registro.nPostsEnElMesIg).toFixed(0);
    var pKpi_View_Rate_ig = document.createElement("p");
    pKpi_View_Rate_ig.textContent = 'View Rate IG: ' + kpi_View_Rate_ig;
    pKpi_View_Rate_ig.classList.add("card-kpis");

    var kpi_Engagement_Rate_ig = (registro.interaccionesconelcontenidoig / registro.alcanceIg * 100).toFixed(2);
    var pKpi_Engagement_Rate_ig = document.createElement("p");
    pKpi_Engagement_Rate_ig.textContent = 'Engagement Rate : ' + kpi_Engagement_Rate_ig + '%';
    pKpi_Engagement_Rate_ig.classList.add("card-kpis");

    var kpi_Clickthrough_Rate_ig = (registro.clicsenelalcanceig / registro.alcanceIg * 100).toFixed(2);
    var pKpi_Clickthrough_Rate_ig = document.createElement("p");
    pKpi_Clickthrough_Rate_ig.textContent = 'Clickthrough Rate : ' + kpi_Clickthrough_Rate_ig + '%';
    pKpi_Clickthrough_Rate_ig.classList.add("card-kpis");

    var kpi_visualizaciones_post_publicaciones_ig = (registro.visualizacionesxpublicacionesig / registro.nPublicacionesig).toFixed(0);
    var pKpi_visualizaciones_post_publicaciones_ig = document.createElement("p");
    pKpi_visualizaciones_post_publicaciones_ig.textContent = 'KPI Visualizaciones / Posts:' + kpi_visualizaciones_post_publicaciones_ig;
    pKpi_visualizaciones_post_publicaciones_ig.classList.add("card-kpis");

    var kpi_visualizaciones_reels_ig = (registro.visualizacionesxreelsig / registro.nReelsig).toFixed(0);
    var pKpi_visualizaciones_reels_ig = document.createElement("p");
    pKpi_visualizaciones_reels_ig.textContent = 'KPI Visualizaciones / Posts:' + kpi_visualizaciones_reels_ig;
    pKpi_visualizaciones_reels_ig.classList.add("card-kpis");

    var kpi_visulizaciones_historias_ig = (registro.alcanceHistoriasig / registro.nHistoriasig).toFixed(0);
    var pKpi_visulizaciones_historias_ig = document.createElement("p");
    pKpi_visulizaciones_historias_ig.textContent = 'KPI Visualizaciones / Posts:' + kpi_visulizaciones_historias_ig;
    pKpi_visulizaciones_historias_ig.classList.add("card-kpis");

    var kpi_view_rate_tiktok = (registro.visualizacionesdevideoTikTok / registro.nPublicacionesTikTok).toFixed(0);
    var pKpi_view_rate_tiktok = document.createElement("p");
    pKpi_view_rate_tiktok.textContent = 'View Rate : ' + kpi_view_rate_tiktok;
    pKpi_view_rate_tiktok.classList.add("card-kpis");

    var kpi_view_rate_X = (registro.inpremionesx / registro.nPublicacionesx).toFixed(0);
    var pKpi_view_rate_X = document.createElement("p");
    pKpi_view_rate_X.textContent = 'View Rate : ' + kpi_view_rate_X;
    pKpi_view_rate_X.classList.add("card-kpis");

    //titulos
    var PFacebook = document.createElement("p");
    PFacebook.textContent = 'FACEBOOK';
    PFacebook.classList.add("card-titulo");

    var PInstagram = document.createElement("p");
    PInstagram.textContent = 'INSTAGRAM';
    PInstagram.classList.add("card-titulo");

    var Ptiktok = document.createElement("p");
    Ptiktok.textContent = 'TIKTOK';
    Ptiktok.classList.add("card-titulo");

    var PX = document.createElement("p");
    PX.textContent = 'X';
    PX.classList.add("card-titulo");


    containerRegistro.appendChild(pFecha);

    containerRegistro.appendChild(PFacebook);

    containerRegistro.appendChild(pSeguidoresfb);
    containerRegistro.appendChild(divRowContainer);
    containerRegistro.appendChild(ppostalmesfb);
    containerRegistro.appendChild(pVisualizacionesfb);
    containerRegistro.appendChild(divRowContainerAlcance);
    containerRegistro.appendChild(divRowContainerInteracciones);
    containerRegistro.appendChild(divRowContainerClicsEnlacefb);
    containerRegistro.appendChild(pInversionPublicitaria);
    containerRegistro.appendChild(pViewRateFb);
    containerRegistro.appendChild(pEngagementRateFb);
    containerRegistro.appendChild(pClickthroughRateFb);
    containerRegistro.appendChild(pNumeroDePublicacionesFb);
    containerRegistro.appendChild(pvisualizacionesxpublicacionesfb);
    containerRegistro.appendChild(pInteraccionesxpublicacionesfb);
    containerRegistro.appendChild(pKPI_Visualizaciones_Posts);
    containerRegistro.appendChild(pnReels);
    containerRegistro.appendChild(pVisualizacionesxreels);
    containerRegistro.appendChild(pInteraccionesxreels);
    containerRegistro.appendChild(pKPI_Visualizaciones_Posts_reels);
    containerRegistro.appendChild(pnHistorias);
    containerRegistro.appendChild(pvisualizacionesxhistorias);
    containerRegistro.appendChild(pinteraccionesxhistorias);
    containerRegistro.appendChild(pKpi_visualizaciones_post_historias);
    containerRegistro.appendChild(PInstagram);
    containerRegistro.appendChild(pseguidoresTotalesIg);
    containerRegistro.appendChild(pseguidoresdelmesIg);
    containerRegistro.appendChild(pnPostsEnElMesIg);
    containerRegistro.appendChild(pvisualizacionesBFB);
    containerRegistro.appendChild(divRowContainerAlcanceIg);
    containerRegistro.appendChild(divRowContainerInteraccionesIg);
    containerRegistro.appendChild(divRowContainerClicsEnlaceIg);
    containerRegistro.appendChild(pinversionPublicitariaig);
    containerRegistro.appendChild(pKpi_View_Rate_ig);
    containerRegistro.appendChild(pKpi_Engagement_Rate_ig);
    containerRegistro.appendChild(pKpi_Clickthrough_Rate_ig);
    containerRegistro.appendChild(pnPublicacionesig);
    containerRegistro.appendChild(pvisualizacionesxpublicacionesig);
    containerRegistro.appendChild(pinteraccionesxpublicacionesig);
    containerRegistro.appendChild(pKpi_visualizaciones_post_publicaciones_ig);
    containerRegistro.appendChild(pnReelsig);
    containerRegistro.appendChild(pvisualizacionesxreelsig);
    containerRegistro.appendChild(pinteraccionesxreelsig);
    containerRegistro.appendChild(pKpi_visualizaciones_reels_ig);
    containerRegistro.appendChild(pnHistoriasig);

    containerRegistro.appendChild(palcanceHistoriasig);
    containerRegistro.appendChild(pinteraccionesHistoriasig);
    containerRegistro.appendChild(pKpi_visulizaciones_historias_ig);

    containerRegistro.appendChild(Ptiktok);
    containerRegistro.appendChild(pseguidorestotalesTikTok);
    containerRegistro.appendChild(pnSeguidoresDelMesTikTok);
    containerRegistro.appendChild(pnPublicacionesTikTok);
    containerRegistro.appendChild(pnMeGustaDelMesTikTok);
    containerRegistro.appendChild(pvisualizacionesdevideoTikTok);
    containerRegistro.appendChild(pKpi_view_rate_tiktok);


    containerRegistro.appendChild(PX);
    containerRegistro.appendChild(pseguidorestotalesx);
    containerRegistro.appendChild(pnSeguidoresDelMesx);
    containerRegistro.appendChild(pnPublicacionesx);
    containerRegistro.appendChild(pinpremionesx);
    containerRegistro.appendChild(pKpi_view_rate_X);





    resultadosRegistros.appendChild(containerRegistro);

  });
}

function formatoFecha(fecha) {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const [year, month] = fecha.split("-");
  return `${meses[parseInt(month, 10) - 1]}-${year}`;
}

function MostrarRegistros2(Registros) {
  console.log(Registros);
  Registros.forEach(registro => {
    const fechaFormateada= formatoFecha(registro.fechaCreada);
    //creamos un div que contendra el registro
    const containerRegistro = document.createElement("div");
    containerRegistro.classList.add("registros-conteiner-list");
    //div para los inputs
    const divFilaStotalesFb = document.createElement("div");
    divFilaStotalesFb.classList.add("fila");

    const divFilaNseguidoresDelMesFb = document.createElement("div");
    divFilaNseguidoresDelMesFb.classList.add("fila-ads");

    const divFilaNseguidresDelMes = document.createElement("div");
    divFilaNseguidresDelMes.classList.add("fila");

    const divFilaVisualizacionesFb = document.createElement("div");
    divFilaVisualizacionesFb.classList.add("fila");

    const divFilaAlcancefb = document.createElement("div");
    divFilaAlcancefb.classList.add("fila-ads");

    const divFilaIntereccionesConElContenidoFb = document.createElement("div");
    divFilaIntereccionesConElContenidoFb.classList.add("fila-ads");

    const divFilaClicsEnElAlcanceFb = document.createElement("div");
    divFilaClicsEnElAlcanceFb.classList.add("fila-ads");

    const divFilaInversionPublicitariaFb = document.createElement("div");
    divFilaInversionPublicitariaFb.classList.add("fila");

    const divFilaNpublicacionesFb = document.createElement("div");
    divFilaNpublicacionesFb.classList.add("fila");

    const divFilaVisualizacionesxPublicacionesFb = document.createElement("div");
    divFilaVisualizacionesxPublicacionesFb.classList.add("fila");

    const divFilaInteraccionesxPublicacionesFb = document.createElement("div");
    divFilaInteraccionesxPublicacionesFb.classList.add("fila");

    const divFilaNreelsFb = document.createElement("div");
    divFilaNreelsFb.classList.add("fila");

    const divFilaVisualizacionesxReelsFb = document.createElement("div");
    divFilaVisualizacionesxReelsFb.classList.add("fila");

    const divFilaInteraccionesxReelsFb = document.createElement("div");
    divFilaInteraccionesxReelsFb.classList.add("fila");

    const divFilaNHistoriasFb = document.createElement("div");
    divFilaNHistoriasFb.classList.add("fila");

    const divFilaVisualizacionesxhistoriasFb = document.createElement("div");
    divFilaVisualizacionesxhistoriasFb.classList.add("fila");

    const divFilaInteraccionesxhistoriasFb = document.createElement("div");
    divFilaInteraccionesxhistoriasFb.classList.add("fila");

    const divFilaSeguidoresTotalesIg = document.createElement("div");
    divFilaSeguidoresTotalesIg.classList.add("fila");

    const divFilaNeguidoresDelmesig = document.createElement("div");
    divFilaNeguidoresDelmesig.classList.add("fila");

    const divFilaNpostAlMesIg = document.createElement("div");
    divFilaNpostAlMesIg.classList.add("fila");

    const divFilaVisualizacionesBfbIg = document.createElement("div");
    divFilaVisualizacionesBfbIg.classList.add("fila");

    const divFilaAlcanceIg = document.createElement("div");
    divFilaAlcanceIg.classList.add("fila-ads");

    const divFilaIntereccionesConElContenidoIg = document.createElement("div");
    divFilaIntereccionesConElContenidoIg.classList.add("fila-ads");

    const divFilasClicsConElenlaceIg = document.createElement("div");
    divFilasClicsConElenlaceIg.classList.add("fila-ads");

    const divFilaInversionPublicitariaIg = document.createElement("div");
    divFilaInversionPublicitariaIg.classList.add("fila");

    const divFilaNpublicacionesIg = document.createElement("div");
    divFilaNpublicacionesIg.classList.add("fila");

    const divFilaVisualizacionesig= document.createElement("div");
    divFilaVisualizacionesig.classList.add("fila");

    const divFilaInteraccionesxPublicacionesig= document.createElement("div");
    divFilaInteraccionesxPublicacionesig.classList.add("fila");

    const divFilaNreelsIg = document.createElement("div");
    divFilaNreelsIg.classList.add("fila");

    const divFilaVisualizacionesReelsIg = document.createElement("div");
    divFilaVisualizacionesReelsIg.classList.add("fila");

    const divFilaInteraccionesReelsIg= document.createElement("div");
    divFilaInteraccionesReelsIg.classList.add("fila");

    const divFilaNHistoriasIg = document.createElement("div");
    divFilaNHistoriasIg.classList.add("fila");

    const divFilaAlcanceReelsIg = document.createElement("div");
    divFilaAlcanceReelsIg.classList.add("fila");

    const divFilaInteraccionesHistoriasIg= document.createElement("div");
    divFilaInteraccionesHistoriasIg.classList.add("fila");

    const divFilaSeguidoresTotalestiktok = document.createElement("div");
    divFilaSeguidoresTotalestiktok.classList.add("fila");

    const divFilaNseguidoresmesTiktok= document.createElement("div");
    divFilaNseguidoresmesTiktok.classList.add("fila");

    const divFilaNpostAlMesTiktok= document.createElement("div");
    divFilaNpostAlMesTiktok.classList.add("fila");

    const divFilaMegustadelmesTiktok= document.createElement("div");
    divFilaMegustadelmesTiktok.classList.add("fila");

    const divFilaVisualizacionesTiktok= document.createElement("div");
    divFilaVisualizacionesTiktok.classList.add("fila");

    const divFilaSeguidoresTotalesX = document.createElement("div");
    divFilaSeguidoresTotalesX.classList.add("fila");

    const divFilaNseguidoresdelMesX= document.createElement("div");
    divFilaNseguidoresdelMesX.classList.add("fila");

    const divFilaNpublicacionesX= document.createElement("div");
    divFilaNpublicacionesX.classList.add("fila");

    const divFilasImpresionesX= document.createElement("div");
    divFilasImpresionesX.classList.add("fila");

    //titulos
    const h1Facebook = document.createElement("h1");
    h1Facebook.textContent = "FACEBOOK / "+fechaFormateada;


    const h1Instagram = document.createElement("h1");
    h1Instagram.textContent = "INSTAGRAM";

    const h1Tiktok= document.createElement("h1");
    h1Tiktok.textContent = "TIKTOK";

    const h1X= document.createElement("h1");
    h1X.textContent = "X";

    //labels
    const labelFilaStotalesFb = document.createElement("label");
    labelFilaStotalesFb.textContent = "Seguidores totales";


    const labeNseguidoresDelMesFb = document.createElement("label");
    labeNseguidoresDelMesFb.textContent = "# seguidores del mes";

    const labelPostAlmesFb = document.createElement("label");
    labelPostAlmesFb.textContent = "# Posts (cuántas en el mes)";

    const labelVisualizacionesFb = document.createElement("label");
    labelVisualizacionesFb.textContent = "Visualizaciones";

    const labelAlcancefb = document.createElement("label");
    labelAlcancefb.textContent = "Alcance";

    const labelInteraccionesConElContenidoFb = document.createElement("label");
    labelInteraccionesConElContenidoFb.textContent = "Interacciones con el contenido";

    const labelClicsEnElEnlaceFb = document.createElement("label");
    labelClicsEnElEnlaceFb.textContent = "Clics en el enlace";

    const labelInversionPublicitariaFb = document.createElement("label");
    labelInversionPublicitariaFb.textContent = "Inversión Publicitaria";

    const labelNpublicacionesfb = document.createElement("label");
    labelNpublicacionesfb.textContent = "# publicaciones";

    const labelVisualizacionesPublicacionesfb = document.createElement("label");
    labelVisualizacionesPublicacionesfb.textContent = "Visualizaciones";

    const labelInteraccionespublicacionesfb = document.createElement("label");
    labelInteraccionespublicacionesfb.textContent = "Interacciones";

    const labelNreelsfb = document.createElement("label");
    labelNreelsfb.textContent = "# Reels";

    const labelVisualizacionesReelsfb = document.createElement("label");
    labelVisualizacionesReelsfb.textContent = "Visualizaciones";

    const labelInteraccionesxReelsfb = document.createElement("label");
    labelInteraccionesxReelsfb.textContent = "Interacciones";

    const labelNhistoriasfb = document.createElement("label");
    labelNhistoriasfb.textContent = "# Historias";

    const labelVisualizacionesHistoriasfb = document.createElement("label");
    labelVisualizacionesHistoriasfb.textContent = "Visualizaciones";

    const labelInteraccionesxhistoriasfb = document.createElement("label");
    labelInteraccionesxhistoriasfb.textContent = "Interacciones";

    const labelSeguidoresTotalesIg = document.createElement("label");
    labelSeguidoresTotalesIg.textContent = "Seguidores totales";

    const labelNseguidoresdelmesIg = document.createElement("label");
    labelNseguidoresdelmesIg.textContent = "# Seguidores del mes";

    const labelNpostAlmesIg = document.createElement("label");
    labelNpostAlmesIg.textContent = "# Posts (cuántas en el mes)";

    const labelVisualizacionesBfbIg = document.createElement("label");
    labelVisualizacionesBfbIg.textContent = "Visualizaciones BFB";

    const labelAlcanceIg = document.createElement("label");
    labelAlcanceIg.textContent = "Alcance";

    const labelInteraccionesConElContenidoIg = document.createElement("label");
    labelInteraccionesConElContenidoIg.textContent = "Interacciones con el contenido";

    const labelClicsEnElEnlaceIg = document.createElement("label");
    labelClicsEnElEnlaceIg.textContent = "Clics en el enlace";

    const labelInversionPublicitariaIg = document.createElement("label");
    labelInversionPublicitariaIg.textContent = "Inversión Publicitaria";

    const labelNpublicacionesig=document.createElement("label");
    labelNpublicacionesig.textContent="# publicaciones";

    const labelVisualizacionesig=document.createElement("label");
    labelVisualizacionesig.textContent="Visualizaciones";

    const labelInteraccionesxpublicacionesig=document.createElement("label");
    labelInteraccionesxpublicacionesig.textContent="Interacciones";

    const labelNreelsIg=document.createElement("label");
    labelNreelsIg.textContent="# Reels";

    const labelvisualizacionesReelsIg=document.createElement("label");
    labelvisualizacionesReelsIg.textContent="Visualizaciones";

    const labelInteraccionesReelsIg=document.createElement("label");
    labelInteraccionesReelsIg.textContent="Interacciones";

    const labelNhistoriasig=document.createElement("label");
    labelNhistoriasig.textContent="# Historias";

    const labelAlncanceHistoriasig=document.createElement("label");
    labelAlncanceHistoriasig.textContent="Alcance";

    const labelInteraccionesHistoriasIg=document.createElement("label");
    labelInteraccionesHistoriasIg.textContent="Interacciones";

    const labelSeguidoresTotalesTiktok = document.createElement("label");
    labelSeguidoresTotalesTiktok.textContent = "Seguidores totales";

    const labelNseguidoresDelMesTiktok = document.createElement("label");
    labelNseguidoresDelMesTiktok.textContent = "# Seguidores del mes";

    const labelNpostAlmesTiktok = document.createElement("label");
    labelNpostAlmesTiktok.textContent = "# Publicaciones";

    const labelMegustaDelMesTiktok = document.createElement("label");
    labelMegustaDelMesTiktok.textContent = "Me gusta del mes";

    const labelVisualizacionesdevideoTiktok = document.createElement("label");
    labelVisualizacionesdevideoTiktok.textContent = "Visualizaciones de video (máx)";

    const labelSeguidoresTotalesX=document.createElement("label");
    labelSeguidoresTotalesX.textContent="Seguidores totales";

    const labelNseguidoresDelMesX=document.createElement("label");
    labelNseguidoresDelMesX.textContent="# Seguidores del mes";

    const labelNpublicacionesX=document.createElement("label");
    labelNpublicacionesX.textContent="# Publicaciones";
     
    const labelImpresionesX=document.createElement("label");
    labelImpresionesX.textContent="Impresiones";

    //input basicos
    const inputOnlyReadSeguidoresTotales = document.createElement("input");

    inputOnlyReadSeguidoresTotales.type = "number";
    inputOnlyReadSeguidoresTotales.value = registro.seguidoresfb;
    inputOnlyReadSeguidoresTotales.readOnly = true;

    const inputOnlyReadnPostAlmesFb = document.createElement("input");
    inputOnlyReadnPostAlmesFb.type = "number";
    inputOnlyReadnPostAlmesFb.value = registro.postalmesfb;
    inputOnlyReadnPostAlmesFb.readOnly = true;

    const inputOnlyReadVisualizacionesFb = document.createElement("input");
    inputOnlyReadVisualizacionesFb.type = "number";
    inputOnlyReadVisualizacionesFb.value = registro.visualizacionesfb;
    inputOnlyReadVisualizacionesFb.readOnly = true;

    const inputOnlyReadInversionPublicitariaFb = document.createElement("input");
    inputOnlyReadInversionPublicitariaFb.type = "number";
    inputOnlyReadInversionPublicitariaFb.value = registro.inversionPublicitaria;
    inputOnlyReadInversionPublicitariaFb.readOnly = true;

    const inputOnlyReadNpublicacionesfb = document.createElement("input");
    inputOnlyReadNpublicacionesfb.type = "number";
    inputOnlyReadNpublicacionesfb.value = registro.nPublicacionesfb;
    inputOnlyReadNpublicacionesfb.readOnly = true;

    const inputOnlyReadVisualizacionesPublicacionesfb = document.createElement("input");
    inputOnlyReadVisualizacionesPublicacionesfb.type = "number";
    inputOnlyReadVisualizacionesPublicacionesfb.value = registro.visualizacionesxpublicacionesfb;
    inputOnlyReadVisualizacionesPublicacionesfb.readOnly = true;

    const inputOnlyReadInteraccionespublicacionesfb = document.createElement("input");
    inputOnlyReadInteraccionespublicacionesfb.type = "number";
    inputOnlyReadInteraccionespublicacionesfb.value = registro.interaccionesxpublicacionesfb;
    inputOnlyReadInteraccionespublicacionesfb.readOnly = true;

    const inputOnlyReadNreelsfb = document.createElement("input");
    inputOnlyReadNreelsfb.type = "number";
    inputOnlyReadNreelsfb.value = registro.nReels;
    inputOnlyReadNreelsfb.readOnly = true;

    const inputOnlyReadVisualizacionesReelsfb = document.createElement("input");
    inputOnlyReadVisualizacionesReelsfb.type = "number";
    inputOnlyReadVisualizacionesReelsfb.value = registro.visualizacionesxreels;
    inputOnlyReadVisualizacionesReelsfb.readOnly = true;


    const inputOnlyReadInteraccionesxReelsfb = document.createElement("input");
    inputOnlyReadInteraccionesxReelsfb.type = "number";
    inputOnlyReadInteraccionesxReelsfb.value = registro.interaccionesxreels;
    inputOnlyReadInteraccionesxReelsfb.readOnly = true;

    const inputOnlyReadNhistoriasfb = document.createElement("input");
    inputOnlyReadNhistoriasfb.type = "number";
    inputOnlyReadNhistoriasfb.value = registro.nHistorias;
    inputOnlyReadNhistoriasfb.readOnly = true;

    const inputOnlyReadVisualizacionesHistoriasfb = document.createElement("input");
    inputOnlyReadVisualizacionesHistoriasfb.type = "number";
    inputOnlyReadVisualizacionesHistoriasfb.value = registro.visualizacionesxhistorias;
    inputOnlyReadVisualizacionesHistoriasfb.readOnly = true;

    const inputOnlyReadInteraccionesxhistoriasfb = document.createElement("input");
    inputOnlyReadInteraccionesxhistoriasfb.type = "number";
    inputOnlyReadInteraccionesxhistoriasfb.value = registro.interaccionesxhistorias;
    inputOnlyReadInteraccionesxhistoriasfb.readOnly = true;

    const inputOnlyReadSeguidoresTotalesIg = document.createElement("input");
    inputOnlyReadSeguidoresTotalesIg.type = "number";
    inputOnlyReadSeguidoresTotalesIg.value = registro.seguidoresTotalesIg;
    inputOnlyReadSeguidoresTotalesIg.readOnly = true;

    const inputOnlyreadNseguidoresdelmesIG = document.createElement("input");
    inputOnlyreadNseguidoresdelmesIG.type = "number";
    inputOnlyreadNseguidoresdelmesIG.value = registro.seguidoresdelmesIg;
    inputOnlyreadNseguidoresdelmesIG.readOnly = true;

    const inputOnlyReadNpostAlmesIg = document.createElement("input");
    inputOnlyReadNpostAlmesIg.type = "number";
    inputOnlyReadNpostAlmesIg.value = registro.nPostsEnElMesIg;
    inputOnlyReadNpostAlmesIg.readOnly = true;

    const inputOnlyReadVisualizacionesBfb = document.createElement("input");
    inputOnlyReadVisualizacionesBfb.type = "number";
    inputOnlyReadVisualizacionesBfb.value = registro.visualizacionesBFB;
    inputOnlyReadVisualizacionesBfb.readOnly = true;

    const inputOnlyReadInversionPublicitariaIg = document.createElement("input");
    inputOnlyReadInversionPublicitariaIg.type = "number";
    inputOnlyReadInversionPublicitariaIg.value = registro.inversionPublicitariaig;
    inputOnlyReadInversionPublicitariaIg.readOnly = true;

    const inputOnlyReadNpublicacionesig= document.createElement("input");
    inputOnlyReadNpublicacionesig.type = "number";
    inputOnlyReadNpublicacionesig.value = registro.nPublicacionesig;
    inputOnlyReadNpublicacionesig.readOnly = true;

    const inputOnlyReadVisualizacionesig= document.createElement("input");
    inputOnlyReadVisualizacionesig.type = "number";
    inputOnlyReadVisualizacionesig.value = registro.visualizacionesxpublicacionesig;
    inputOnlyReadVisualizacionesig.readOnly = true;

    const inputOnlyReadInteraccionespublicacionesig= document.createElement("input");
    inputOnlyReadInteraccionespublicacionesig.type = "number";
    inputOnlyReadInteraccionespublicacionesig.value = registro.interaccionesxpublicacionesig;
    inputOnlyReadInteraccionespublicacionesig.readOnly = true;

    const inputOnlyReadNreelsIg= document.createElement("input");
    inputOnlyReadNreelsIg.type = "number";
    inputOnlyReadNreelsIg.value = registro.nReelsig;
    inputOnlyReadNreelsIg.readOnly = true;  

    const inputOnlyReadVisualizacionesReelsIg= document.createElement("input");
    inputOnlyReadVisualizacionesReelsIg.type = "number";
    inputOnlyReadVisualizacionesReelsIg.value = registro.visualizacionesxreelsig;
    inputOnlyReadVisualizacionesReelsIg.readOnly = true;

    const inputOnlyReadInteraccionesReelsIg= document.createElement("input");
    inputOnlyReadInteraccionesReelsIg.type = "number";
    inputOnlyReadInteraccionesReelsIg.value = registro.interaccionesxreelsig;
    inputOnlyReadInteraccionesReelsIg.readOnly = true;

    const inputOnlyReadNhistoriasIg= document.createElement("input");
    inputOnlyReadNhistoriasIg.type = "number";
    inputOnlyReadNhistoriasIg.value = registro.nHistoriasig;
    inputOnlyReadNhistoriasIg.readOnly = true;

    const inputOnlyReadAlcanceHistoriasIg= document.createElement("input");
    inputOnlyReadAlcanceHistoriasIg.type = "number";
    inputOnlyReadAlcanceHistoriasIg.value = registro.alcanceHistoriasig ;
    inputOnlyReadAlcanceHistoriasIg.readOnly = true;

    const inputOnlyReadInterraccionesHistoriasIg= document.createElement("input");
    inputOnlyReadInterraccionesHistoriasIg.type = "number";
    inputOnlyReadInterraccionesHistoriasIg.value = registro.interaccionesHistoriasig;
    inputOnlyReadInterraccionesHistoriasIg.readOnly = true;

    const inputOnlyReadSeguidoresTotalesTikTok= document.createElement("input");
    inputOnlyReadSeguidoresTotalesTikTok.type = "number";
    inputOnlyReadSeguidoresTotalesTikTok.value = registro.seguidorestotalesTikTok;
    inputOnlyReadSeguidoresTotalesTikTok.readOnly = true;

    const inputOnlyReadNseguidoresdelmesTiktok = document.createElement("input");
    inputOnlyReadNseguidoresdelmesTiktok.type = "number";
    inputOnlyReadNseguidoresdelmesTiktok.value = registro.nSeguidoresDelMesTikTok;
    inputOnlyReadNseguidoresdelmesTiktok.readOnly = true;

    const inputOnlyReadNpublicacionestiktok= document.createElement("input");
    inputOnlyReadNpublicacionestiktok.type = "number";
    inputOnlyReadNpublicacionestiktok.value = registro.nPublicacionesTikTok;
    inputOnlyReadNpublicacionestiktok.readOnly = true;

    const inputOnlyReadMegustadelmesTiktok= document.createElement("input");
    inputOnlyReadMegustadelmesTiktok.type = "number";
    inputOnlyReadMegustadelmesTiktok.value = registro.nMeGustaDelMesTikTok;
    inputOnlyReadMegustadelmesTiktok.readOnly = true;

    const inputOnlyReadVisualizacionesdevideoTikTok= document.createElement("input");
    inputOnlyReadVisualizacionesdevideoTikTok.type = "number";
    inputOnlyReadVisualizacionesdevideoTikTok.value = registro.visualizacionesdevideoTikTok;
    inputOnlyReadVisualizacionesdevideoTikTok.readOnly = true;

    const inputOnlyReadSeguidoresTotalesX= document.createElement("input");
    inputOnlyReadSeguidoresTotalesX.type = "number";
    inputOnlyReadSeguidoresTotalesX.value = registro.seguidorestotalesx;
    inputOnlyReadSeguidoresTotalesX.readOnly = true;

    const inputOnlyReadNseguidoresDelMesX= document.createElement("input");
    inputOnlyReadNseguidoresDelMesX.type = "number";
    inputOnlyReadNseguidoresDelMesX.value = registro.nSeguidoresDelMesx;
    inputOnlyReadNseguidoresDelMesX.readOnly = true;

    const inputOnlyReadNpublicacionesx= document.createElement("input");  
    inputOnlyReadNpublicacionesx.type = "number";
    inputOnlyReadNpublicacionesx.value = registro.nPublicacionesx;
    inputOnlyReadNpublicacionesx.readOnly = true;

    const inputOnlyReadImpresionesX= document.createElement("input");
    inputOnlyReadImpresionesX.type = "number";
    inputOnlyReadImpresionesX.value = registro.inpremionesx;
    inputOnlyReadImpresionesX.readOnly = true;

    //input con ads
    const inputOnlyreadNseguidoresdelmesfb = document.createElement("input");
    inputOnlyreadNseguidoresdelmesfb.type = "number";
    inputOnlyreadNseguidoresdelmesfb.value = registro.seguidoresdelmesfb;
    inputOnlyreadNseguidoresdelmesfb.readOnly = true;

    const inputOnlyreadNseguidoresdelmesfbads = document.createElement("input");
    inputOnlyreadNseguidoresdelmesfbads.classList.add("ads");
    inputOnlyreadNseguidoresdelmesfbads.type = "number";
    inputOnlyreadNseguidoresdelmesfbads.value = registro.seguidoresdelmesfbads;
    inputOnlyreadNseguidoresdelmesfbads.readOnly = true;
    inputOnlyreadNseguidoresdelmesfbads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyreadNseguidoresdelmesfbads.value, inputOnlyreadNseguidoresdelmesfb.value);
      mostrarTooltip(inputOnlyreadNseguidoresdelmesfbads, porcentaje);
    });
    inputOnlyreadNseguidoresdelmesfbads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyreadNseguidoresdelmesfbads);
    });

    //
    const inputOnlyReadAlcancefb = document.createElement("input");
    inputOnlyReadAlcancefb.type = "number";
    inputOnlyReadAlcancefb.value = registro.alcancefb;
    inputOnlyReadAlcancefb.readOnly = true;

    const inputOnlyReadAlcancefbads = document.createElement("input");
    inputOnlyReadAlcancefbads.classList.add("ads");
    inputOnlyReadAlcancefbads.type = "number";
    inputOnlyReadAlcancefbads.value = registro.alcancefbads;
    inputOnlyReadAlcancefbads.readOnly = true;
    inputOnlyReadAlcancefbads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadAlcancefbads.value, inputOnlyReadAlcancefb.value);
      mostrarTooltip(inputOnlyReadAlcancefbads, porcentaje);
    });
    inputOnlyReadAlcancefbads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadAlcancefbads);
    });

    //
    const inputOnlyReadInteraccionesConElContenidoFb = document.createElement("input");
    inputOnlyReadInteraccionesConElContenidoFb.type = "number";
    inputOnlyReadInteraccionesConElContenidoFb.value = registro.interracionesconelcontenidofb;
    inputOnlyReadInteraccionesConElContenidoFb.readOnly = true;

    const inputOnlyReadInteraccionesConElContenidoFbads = document.createElement("input");
    inputOnlyReadInteraccionesConElContenidoFbads.classList.add("ads");
    inputOnlyReadInteraccionesConElContenidoFbads.type = "number";
    inputOnlyReadInteraccionesConElContenidoFbads.value = registro.interracionesconelcontenidofbads;
    inputOnlyReadInteraccionesConElContenidoFbads.readOnly = true;
    inputOnlyReadInteraccionesConElContenidoFbads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadInteraccionesConElContenidoFbads.value, inputOnlyReadInteraccionesConElContenidoFb.value);
      mostrarTooltip(inputOnlyReadInteraccionesConElContenidoFbads, porcentaje);
    });
    inputOnlyReadInteraccionesConElContenidoFbads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadInteraccionesConElContenidoFbads);
    });
    //

    const inputOnlyReadClicSenElAlcanceFb = document.createElement("input");
    inputOnlyReadClicSenElAlcanceFb.type = "number";
    inputOnlyReadClicSenElAlcanceFb.value = registro.clicsenelalcancefb;
    inputOnlyReadClicSenElAlcanceFb.readOnly = true;

    const inputOnlyReadClicSenElAlcanceFbads = document.createElement("input");
    inputOnlyReadClicSenElAlcanceFbads.classList.add("ads");
    inputOnlyReadClicSenElAlcanceFbads.type = "number";
    inputOnlyReadClicSenElAlcanceFbads.value = registro.clicsenelalcancefbads;
    inputOnlyReadClicSenElAlcanceFbads.readOnly = true;
    inputOnlyReadClicSenElAlcanceFbads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadClicSenElAlcanceFbads.value, inputOnlyReadClicSenElAlcanceFb.value);
      mostrarTooltip(inputOnlyReadClicSenElAlcanceFbads, porcentaje);
    });
    inputOnlyReadClicSenElAlcanceFbads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadClicSenElAlcanceFbads);
    });

    //
    const inputOnlyReadAlcanceIg = document.createElement("input");
    inputOnlyReadAlcanceIg.type = "number";
    inputOnlyReadAlcanceIg.value = registro.alcanceIg;
    inputOnlyReadAlcanceIg.readOnly = true;

    const inputOnlyReadAlcanceIgads = document.createElement("input");
    inputOnlyReadAlcanceIgads.classList.add("ads");
    inputOnlyReadAlcanceIgads.type = "number";
    inputOnlyReadAlcanceIgads.value = registro.alcanceIgads;
    inputOnlyReadAlcanceIgads.readOnly = true;
    inputOnlyReadAlcanceIgads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadAlcanceIgads.value, inputOnlyReadAlcanceIg.value);
      mostrarTooltip(inputOnlyReadAlcanceIgads, porcentaje);
    });
    inputOnlyReadAlcanceIgads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadAlcanceIgads);
    });

    //

    const inputOnlyReadInteraccionesConElContenidoig = document.createElement("input");
    inputOnlyReadInteraccionesConElContenidoig.type = "number";
    inputOnlyReadInteraccionesConElContenidoig.value = registro.interaccionesconelcontenidoig;
    inputOnlyReadInteraccionesConElContenidoig.readOnly = true;

    const inputOnlyReadInteraccionesConElContenidoigads = document.createElement("input");
    inputOnlyReadInteraccionesConElContenidoigads.classList.add("ads");
    inputOnlyReadInteraccionesConElContenidoigads.type = "number";
    inputOnlyReadInteraccionesConElContenidoigads.value = registro.interaccionesconelcontenidoigads;
    inputOnlyReadInteraccionesConElContenidoigads.readOnly = true;
    inputOnlyReadInteraccionesConElContenidoigads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadInteraccionesConElContenidoigads.value, inputOnlyReadInteraccionesConElContenidoig.value);
      mostrarTooltip(inputOnlyReadInteraccionesConElContenidoigads, porcentaje);
    });
    inputOnlyReadInteraccionesConElContenidoigads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadInteraccionesConElContenidoigads);
    });

    //

    const inputOnlyReadClicSenElAlcanceIg = document.createElement("input");
    inputOnlyReadClicSenElAlcanceIg.type = "number";
    inputOnlyReadClicSenElAlcanceIg.value = registro.clicsenelalcanceig;
    inputOnlyReadClicSenElAlcanceIg.readOnly = true;

    const inputOnlyReadClicSenElAlcanceIgads = document.createElement("input");
    inputOnlyReadClicSenElAlcanceIgads.classList.add("ads");
    inputOnlyReadClicSenElAlcanceIgads.type = "number";
    inputOnlyReadClicSenElAlcanceIgads.value = registro.clicsenelalcanceigads;
    inputOnlyReadClicSenElAlcanceIgads.readOnly = true;
    inputOnlyReadClicSenElAlcanceIgads.addEventListener("mouseenter", function () {
      const porcentaje = calcularPorcentaje(inputOnlyReadClicSenElAlcanceIgads.value, inputOnlyReadClicSenElAlcanceIg.value);
      mostrarTooltip(inputOnlyReadClicSenElAlcanceIgads, porcentaje);
    });
    inputOnlyReadClicSenElAlcanceIgads.addEventListener("mouseleave", function () {
      eliminarTooltip(inputOnlyReadClicSenElAlcanceIgads);
    });

    //armamos los labels-inputregistro
    divFilaStotalesFb.appendChild(labelFilaStotalesFb);
    divFilaStotalesFb.appendChild(inputOnlyReadSeguidoresTotales);

    divFilaNseguidoresDelMesFb.appendChild(labeNseguidoresDelMesFb);
    divFilaNseguidoresDelMesFb.appendChild(inputOnlyreadNseguidoresdelmesfb);
    divFilaNseguidoresDelMesFb.appendChild(inputOnlyreadNseguidoresdelmesfbads);

    divFilaNseguidresDelMes.appendChild(labelPostAlmesFb);
    divFilaNseguidresDelMes.appendChild(inputOnlyReadnPostAlmesFb);

    divFilaVisualizacionesFb.appendChild(labelVisualizacionesFb);
    divFilaVisualizacionesFb.appendChild(inputOnlyReadVisualizacionesFb);

    divFilaAlcancefb.appendChild(labelAlcancefb);
    divFilaAlcancefb.appendChild(inputOnlyReadAlcancefb);
    divFilaAlcancefb.appendChild(inputOnlyReadAlcancefbads);

    divFilaIntereccionesConElContenidoFb.appendChild(labelInteraccionesConElContenidoFb);
    divFilaIntereccionesConElContenidoFb.appendChild(inputOnlyReadInteraccionesConElContenidoFb);
    divFilaIntereccionesConElContenidoFb.appendChild(inputOnlyReadInteraccionesConElContenidoFbads);

    divFilaClicsEnElAlcanceFb.appendChild(labelClicsEnElEnlaceFb);
    divFilaClicsEnElAlcanceFb.appendChild(inputOnlyReadClicSenElAlcanceFb);
    divFilaClicsEnElAlcanceFb.appendChild(inputOnlyReadClicSenElAlcanceFbads);

    divFilaInversionPublicitariaFb.appendChild(labelInversionPublicitariaFb);
    divFilaInversionPublicitariaFb.appendChild(inputOnlyReadInversionPublicitariaFb);

    divFilaNpublicacionesFb.appendChild(labelNpublicacionesfb);
    divFilaNpublicacionesFb.appendChild(inputOnlyReadNpublicacionesfb);

    divFilaVisualizacionesxPublicacionesFb.appendChild(labelVisualizacionesPublicacionesfb);
    divFilaVisualizacionesxPublicacionesFb.appendChild(inputOnlyReadVisualizacionesPublicacionesfb);

    divFilaInteraccionesxPublicacionesFb.appendChild(labelInteraccionespublicacionesfb);
    divFilaInteraccionesxPublicacionesFb.appendChild(inputOnlyReadInteraccionespublicacionesfb);

    divFilaNreelsFb.appendChild(labelNreelsfb);
    divFilaNreelsFb.appendChild(inputOnlyReadNreelsfb);

    divFilaVisualizacionesxReelsFb.appendChild(labelVisualizacionesReelsfb);
    divFilaVisualizacionesxReelsFb.appendChild(inputOnlyReadVisualizacionesReelsfb);

    divFilaInteraccionesxReelsFb.appendChild(labelInteraccionesxReelsfb);
    divFilaInteraccionesxReelsFb.appendChild(inputOnlyReadInteraccionesxReelsfb);

    divFilaNHistoriasFb.appendChild(labelNhistoriasfb);
    divFilaNHistoriasFb.appendChild(inputOnlyReadNhistoriasfb);

    divFilaVisualizacionesxhistoriasFb.appendChild(labelVisualizacionesHistoriasfb);
    divFilaVisualizacionesxhistoriasFb.appendChild(inputOnlyReadVisualizacionesHistoriasfb);

    divFilaInteraccionesxhistoriasFb.appendChild(labelInteraccionesxhistoriasfb);
    divFilaInteraccionesxhistoriasFb.appendChild(inputOnlyReadInteraccionesxhistoriasfb);

    divFilaSeguidoresTotalesIg.appendChild(labelSeguidoresTotalesIg);
    divFilaSeguidoresTotalesIg.appendChild(inputOnlyReadSeguidoresTotalesIg);

    divFilaNeguidoresDelmesig.appendChild(labelNseguidoresdelmesIg);
    divFilaNeguidoresDelmesig.appendChild(inputOnlyreadNseguidoresdelmesIG);

    divFilaNpostAlMesIg.appendChild(labelNpostAlmesIg);
    divFilaNpostAlMesIg.appendChild(inputOnlyReadNpostAlmesIg);

    divFilaVisualizacionesBfbIg.appendChild(labelVisualizacionesBfbIg);
    divFilaVisualizacionesBfbIg.appendChild(inputOnlyReadVisualizacionesBfb);


    divFilaAlcanceIg.appendChild(labelAlcanceIg);
    divFilaAlcanceIg.appendChild(inputOnlyReadAlcanceIg);
    divFilaAlcanceIg.appendChild(inputOnlyReadAlcanceIgads);

    divFilaIntereccionesConElContenidoIg.appendChild(labelInteraccionesConElContenidoIg);
    divFilaIntereccionesConElContenidoIg.appendChild(inputOnlyReadInteraccionesConElContenidoig);
    divFilaIntereccionesConElContenidoIg.appendChild(inputOnlyReadInteraccionesConElContenidoigads);

    divFilasClicsConElenlaceIg.appendChild(labelClicsEnElEnlaceIg);
    divFilasClicsConElenlaceIg.appendChild(inputOnlyReadClicSenElAlcanceIg);
    divFilasClicsConElenlaceIg.appendChild(inputOnlyReadClicSenElAlcanceIgads);

    divFilaInversionPublicitariaIg.appendChild(labelInversionPublicitariaIg);
    divFilaInversionPublicitariaIg.appendChild(inputOnlyReadInversionPublicitariaIg);

    divFilaNpublicacionesIg.appendChild(labelNpublicacionesig);
    divFilaNpublicacionesIg.appendChild(inputOnlyReadNpublicacionesig);

    divFilaVisualizacionesig.appendChild(labelVisualizacionesig);
    divFilaVisualizacionesig.appendChild(inputOnlyReadVisualizacionesig);

    divFilaInteraccionesxPublicacionesig.appendChild(labelInteraccionesxpublicacionesig);
    divFilaInteraccionesxPublicacionesig.appendChild(inputOnlyReadInteraccionespublicacionesig);

    divFilaNreelsIg.appendChild(labelNreelsIg);
    divFilaNreelsIg.appendChild(inputOnlyReadNreelsIg);

    divFilaVisualizacionesReelsIg.appendChild(labelvisualizacionesReelsIg);
    divFilaVisualizacionesReelsIg.appendChild(inputOnlyReadVisualizacionesReelsIg);

    divFilaInteraccionesReelsIg.appendChild(labelInteraccionesReelsIg);
    divFilaInteraccionesReelsIg.appendChild(inputOnlyReadInteraccionesReelsIg);

    divFilaNHistoriasIg.appendChild(labelNhistoriasig);
    divFilaNHistoriasIg.appendChild(inputOnlyReadNhistoriasIg);

    divFilaAlcanceReelsIg.appendChild(labelAlncanceHistoriasig);
    divFilaAlcanceReelsIg.appendChild(inputOnlyReadAlcanceHistoriasIg);

    divFilaInteraccionesHistoriasIg.appendChild(labelInteraccionesHistoriasIg);
    divFilaInteraccionesHistoriasIg.appendChild(inputOnlyReadInterraccionesHistoriasIg);

    divFilaSeguidoresTotalestiktok.appendChild(labelSeguidoresTotalesTiktok);
    divFilaSeguidoresTotalestiktok.appendChild(inputOnlyReadSeguidoresTotalesTikTok);

    divFilaNseguidoresmesTiktok.appendChild(labelNseguidoresDelMesTiktok);
    divFilaNseguidoresmesTiktok.appendChild(inputOnlyReadNseguidoresdelmesTiktok)

    divFilaNpostAlMesTiktok.appendChild(labelNpostAlmesTiktok);
    divFilaNpostAlMesTiktok.appendChild(inputOnlyReadNpublicacionestiktok);

    divFilaMegustadelmesTiktok.appendChild(labelMegustaDelMesTiktok);
    divFilaMegustadelmesTiktok.appendChild(inputOnlyReadMegustadelmesTiktok);

    divFilaVisualizacionesTiktok.appendChild(labelVisualizacionesdevideoTiktok);
    divFilaVisualizacionesTiktok.appendChild(inputOnlyReadVisualizacionesdevideoTikTok);

    divFilaSeguidoresTotalesX.appendChild(labelSeguidoresTotalesX);
    divFilaSeguidoresTotalesX.appendChild(inputOnlyReadSeguidoresTotalesX);

    divFilaNseguidoresdelMesX.appendChild(labelNseguidoresDelMesX);
    divFilaNseguidoresdelMesX.appendChild(inputOnlyReadNseguidoresDelMesX);

    divFilaNpublicacionesX.appendChild(labelNpublicacionesX);
    divFilaNpublicacionesX.appendChild(inputOnlyReadNpublicacionesx);

    divFilasImpresionesX.appendChild(labelImpresionesX);
    divFilasImpresionesX.appendChild(inputOnlyReadImpresionesX);

    //armamos los kpis
    const viewRatefb = inputOnlyReadVisualizacionesFb.value / inputOnlyReadnPostAlmesFb.value;
    const h3ViewRateFb = document.createElement("h3");
    h3ViewRateFb.textContent = "View Rate:" + viewRatefb.toFixed();

    const engagementRateFb = (inputOnlyReadInteraccionesConElContenidoFb.value / inputOnlyReadAlcancefb.value) * 100;
    const h3engagementRateFb = document.createElement("h3");
    h3engagementRateFb.textContent = "Engagement Rate:" + engagementRateFb.toFixed(2);

    const clickthroughRatefb = (inputOnlyReadClicSenElAlcanceFb.value / inputOnlyReadAlcancefb.value) * 100;
    const h3clickthroughRatefb = document.createElement("h3");
    h3clickthroughRatefb.textContent = "Clickthrough Rate:" + clickthroughRatefb.toFixed(2);

    const visualizacionesxpublicacionesfb = inputOnlyReadVisualizacionesPublicacionesfb.value / inputOnlyReadNpublicacionesfb.value;
    const h3Visualizacionesxpublicacionesfb = document.createElement("h3");
    h3Visualizacionesxpublicacionesfb.textContent = "KPI Visualizaciones / Posts:" + visualizacionesxpublicacionesfb.toFixed();

    const kpiVisualizacionesPostsReels = inputOnlyReadVisualizacionesReelsfb.value / inputOnlyReadNreelsfb.value;
    const h3kpiVisualizacionesPostsReels = document.createElement("h3");
    h3kpiVisualizacionesPostsReels.textContent = "KPI Visualizaciones / Posts:" + kpiVisualizacionesPostsReels.toFixed();

    const kpiVisualizacionesPostxHistorias = inputOnlyReadVisualizacionesHistoriasfb.value / inputOnlyReadNhistoriasfb.value;
    const h3kpiVisualizacionesPostxHistorias = document.createElement("h3");
    h3kpiVisualizacionesPostxHistorias.textContent = "KPI Visualizaciones / Posts:" + kpiVisualizacionesPostxHistorias.toFixed();

    const kpi_View_Rate_ig = inputOnlyReadVisualizacionesBfb.value / inputOnlyReadNpostAlmesIg.value;
    const h3kpi_View_Rate_ig = document.createElement("h3");
    h3kpi_View_Rate_ig.textContent = "View Rate: " + kpi_View_Rate_ig.toFixed();

    const kpiEngagementRateig = (inputOnlyReadInteraccionesConElContenidoig.value / inputOnlyReadAlcanceIg.value) * 100;
    const h3kpiEngagementRateig = document.createElement("h3");
    h3kpiEngagementRateig.textContent = "Engagement Rate: " + kpiEngagementRateig.toFixed(2);

    const kpiClickthroughRateig = (inputOnlyReadClicSenElAlcanceIg.value / inputOnlyReadAlcanceIg.value) * 100;
    const h3kpiClickthroughRateig = document.createElement("h3");
    h3kpiClickthroughRateig.textContent = "Clickthrough Rate: " + kpiClickthroughRateig.toFixed(2);

    const kpiVisualizaciones_PostsIG= inputOnlyReadVisualizacionesig.value / inputOnlyReadNpublicacionesig.value;
    const h3kpiVisualizaciones_PostsIG = document.createElement("h3");
    h3kpiVisualizaciones_PostsIG.textContent = "KPI Visualizaciones / Posts:" + kpiVisualizaciones_PostsIG.toFixed();

    const kpiVisualizaciones_PostsReelsIg = inputOnlyReadVisualizacionesReelsIg.value / inputOnlyReadNreelsIg.value;
    const h3kpiVisualizaciones_PostsReelsIg = document.createElement("h3");
    h3kpiVisualizaciones_PostsReelsIg.textContent = "KPI Visualizaciones / Posts:" + kpiVisualizaciones_PostsReelsIg.toFixed();

    const kpiVisualizaciones_PostsHistoriasIg= inputOnlyReadAlcanceHistoriasIg.value / inputOnlyReadNhistoriasIg.value;
    const h3kpiVisualizaciones_PostsHistoriasIg = document.createElement("h3");
    h3kpiVisualizaciones_PostsHistoriasIg.textContent = "KPI Visualizaciones / Posts:" + kpiVisualizaciones_PostsHistoriasIg.toFixed();

    const kpiViewRateTikTok = inputOnlyReadVisualizacionesdevideoTikTok.value / inputOnlyReadNpublicacionestiktok.value;
    const h3kpiViewRateTikTok = document.createElement("h3");
    h3kpiViewRateTikTok.textContent = "View Rate: " + kpiViewRateTikTok.toFixed();

    const kpiViewRateX= inputOnlyReadImpresionesX.value / inputOnlyReadNpublicacionestiktok.value;
    const h3kpiViewRateX = document.createElement("h3");
    h3kpiViewRateX.textContent = "View Rate: " + kpiViewRateX.toFixed();

    //armamos el registros
    containerRegistro.appendChild(h1Facebook);
    containerRegistro.appendChild(divFilaStotalesFb);
    containerRegistro.appendChild(divFilaNseguidoresDelMesFb);
    containerRegistro.appendChild(divFilaNseguidresDelMes);
    containerRegistro.appendChild(divFilaVisualizacionesFb);
    containerRegistro.appendChild(divFilaAlcancefb);
    containerRegistro.appendChild(divFilaIntereccionesConElContenidoFb);
    containerRegistro.appendChild(divFilaClicsEnElAlcanceFb);
    containerRegistro.appendChild(divFilaInversionPublicitariaFb);
    containerRegistro.appendChild(h3ViewRateFb);
    containerRegistro.appendChild(h3engagementRateFb);
    containerRegistro.appendChild(h3clickthroughRatefb);
    containerRegistro.appendChild(divFilaNpublicacionesFb);
    containerRegistro.appendChild(divFilaVisualizacionesxPublicacionesFb);
    containerRegistro.appendChild(divFilaInteraccionesxPublicacionesFb);
    containerRegistro.appendChild(h3Visualizacionesxpublicacionesfb);
    containerRegistro.appendChild(divFilaNreelsFb);
    containerRegistro.appendChild(divFilaVisualizacionesxReelsFb);
    containerRegistro.appendChild(divFilaInteraccionesxReelsFb);
    containerRegistro.appendChild(h3kpiVisualizacionesPostsReels);
    containerRegistro.appendChild(divFilaNHistoriasFb);
    containerRegistro.appendChild(divFilaVisualizacionesxhistoriasFb);
    containerRegistro.appendChild(divFilaInteraccionesxhistoriasFb);
    containerRegistro.appendChild(h3kpiVisualizacionesPostxHistorias);


    containerRegistro.appendChild(h1Instagram);
    containerRegistro.appendChild(divFilaSeguidoresTotalesIg);
    containerRegistro.appendChild(divFilaNeguidoresDelmesig);
    containerRegistro.appendChild(divFilaNpostAlMesIg);
    containerRegistro.appendChild(divFilaVisualizacionesBfbIg);
    containerRegistro.appendChild(divFilaAlcanceIg);
    containerRegistro.appendChild(divFilaIntereccionesConElContenidoIg);
    containerRegistro.appendChild(divFilasClicsConElenlaceIg);
    containerRegistro.appendChild(divFilaInversionPublicitariaIg);
    containerRegistro.appendChild(h3kpi_View_Rate_ig);
    containerRegistro.appendChild(h3kpiEngagementRateig);
    containerRegistro.appendChild(h3kpiClickthroughRateig);
    containerRegistro.appendChild(divFilaNpublicacionesIg);
    containerRegistro.appendChild(divFilaVisualizacionesig);
    containerRegistro.appendChild(divFilaInteraccionesxPublicacionesig);
    containerRegistro.appendChild(h3kpiVisualizaciones_PostsIG);
    containerRegistro.appendChild(divFilaNreelsIg);
    containerRegistro.appendChild(divFilaVisualizacionesReelsIg);
    containerRegistro.appendChild(divFilaInteraccionesReelsIg);
    containerRegistro.appendChild(h3kpiVisualizaciones_PostsReelsIg);
    containerRegistro.appendChild(divFilaNHistoriasIg);
    containerRegistro.appendChild(divFilaAlcanceReelsIg);
    containerRegistro.appendChild(divFilaInteraccionesHistoriasIg);
    containerRegistro.appendChild(h3kpiVisualizaciones_PostsHistoriasIg);



    containerRegistro.appendChild(h1Tiktok)
    containerRegistro.appendChild(divFilaSeguidoresTotalestiktok);
    containerRegistro.appendChild(divFilaNseguidoresmesTiktok);
    containerRegistro.appendChild(divFilaNpostAlMesTiktok);
    containerRegistro.appendChild(divFilaMegustadelmesTiktok);
    containerRegistro.appendChild(divFilaVisualizacionesTiktok);
    containerRegistro.appendChild(h3kpiViewRateTikTok);

    containerRegistro.appendChild(h1X);
    containerRegistro.appendChild(divFilaSeguidoresTotalesX);
    containerRegistro.appendChild(divFilaNseguidoresdelMesX);
    containerRegistro.appendChild(divFilaNpublicacionesX);
    containerRegistro.appendChild(divFilasImpresionesX);
    containerRegistro.appendChild(h3kpiViewRateX);
    


    //metemos todo al div padre
    resultadosRegistros.appendChild(containerRegistro);
  });

  const ultimoRegistro = resultadosRegistros.lastChild;
  ultimoRegistro.scrollIntoView({ behavior:'instant' });



}
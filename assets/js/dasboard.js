// Obtener el formulario
const formulario = document.getElementById("formulario");
const botonEnviar= document.getElementById("enviar");
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
    fetch("http://localhost/fbbva_new_version/controller/registros.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "insert",
        data: data}),
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
    fetch("http://localhost/fbbva_new_version/controller/registros.php", {
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
        MostrarRegistros(Registros);

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
      var fecha=formatoFecha(registro.fechaCreada);
      var containerRegistro=document.createElement("div");
      containerRegistro.classList.add("container-registro");
      //resultadosRegistros.appendChild(containerRegistro);
      
      var pFecha=document.createElement("p");
      pFecha.textContent=fecha;
      pFecha.classList.add("fechaRegistro");
      //conteiner con ads
      var divRowContainer=document.createElement("div");
      divRowContainer.classList.add("row-container-registros");
  

      var divRowContainerAlcance=document.createElement("div");
      divRowContainerAlcance.classList.add("row-container-registros");
     
      var divRowContainerInteracciones=document.createElement("div");
      divRowContainerInteracciones.classList.add("row-container-registros");
      

      var pSeguidoresfb=document.createElement("p");
      pSeguidoresfb.textContent='Seguidores totales: '+registro.seguidoresfb;
      pSeguidoresfb.classList.add("fechaRegistro");

      var ppostalmesfb=document.createElement("p");
      ppostalmesfb.textContent='# Posts (cuántas en el mes) :'+registro.postalmesfb;
      ppostalmesfb.classList.add("fechaRegistro");
      var pVisualizacionesfb=document.createElement("p");
      pVisualizacionesfb.textContent='Visualizaciones :'+registro.visualizacionesfb;
      pVisualizacionesfb.classList.add("fechaRegistro");

       //definimos las variables que tienen ads
      var Pseguidoresdelmesfb=document.createElement("p");
      Pseguidoresdelmesfb.textContent='Seguidores del mes: '+registro.seguidoresdelmesfb;
      var Pseguidoresdelmesfbads=document.createElement("p");
      Pseguidoresdelmesfbads.textContent='ads: '+registro.seguidoresdelmesfbads;

      var pAlcancefb=document.createElement("p");
      pAlcancefb.textContent='Alcance: '+registro.alcancefb;
      var pAlcancefbads=document.createElement("p");
      pAlcancefbads.textContent='ads: '+registro.alcancefbads;

      var pInteraccionesconelcontenidofb=document.createElement("p");
      pInteraccionesconelcontenidofb.textContent='Interacciones con el contenido: '+registro.interracionesconelcontenidofb;
      var pInteraccionesconelcontenidofbads=document.createElement("p");
      pInteraccionesconelcontenidofbads.textContent='ads: '+registro.interracionesconelcontenidofbads;

      //metemos en un div los p que tienen ads
      divRowContainer.appendChild(Pseguidoresdelmesfb);
      divRowContainer.appendChild(Pseguidoresdelmesfbads);
      divRowContainerAlcance.appendChild(pAlcancefb);
      divRowContainerAlcance.appendChild(pAlcancefbads);
      divRowContainerInteracciones.appendChild(pInteraccionesconelcontenidofb);
      divRowContainerInteracciones.appendChild(pInteraccionesconelcontenidofbads);

      containerRegistro.appendChild(pFecha);
      containerRegistro.appendChild(pSeguidoresfb);
      containerRegistro.appendChild(divRowContainer);
      containerRegistro.appendChild(ppostalmesfb);
      containerRegistro.appendChild(pVisualizacionesfb);
      containerRegistro.appendChild(divRowContainerAlcance);
      containerRegistro.appendChild(divRowContainerInteracciones);
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


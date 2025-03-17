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
    fetch("../controller/registros.php", {
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
      
      var divRowContainerClicsEnlacefb=document.createElement("div");
      divRowContainerClicsEnlacefb.classList.add("row-container-registros");

      var divRowContainerAlcanceIg=document.createElement("div");
      divRowContainerAlcanceIg.classList.add("row-container-registros");

      var divRowContainerInteraccionesIg=document.createElement("div");
      divRowContainerInteraccionesIg.classList.add("row-container-registros");

      var divRowContainerClicsEnlaceIg=document.createElement("div");
      divRowContainerClicsEnlaceIg.classList.add("row-container-registros");
      

      //Parrafos normales

      var pSeguidoresfb=document.createElement("p");
      pSeguidoresfb.textContent='Seguidores totales: '+registro.seguidoresfb;
      pSeguidoresfb.classList.add("fechaRegistro");

      var ppostalmesfb=document.createElement("p");
      ppostalmesfb.textContent='# Posts (cuántas en el mes) :'+registro.postalmesfb;
      ppostalmesfb.classList.add("fechaRegistro");
      var pVisualizacionesfb=document.createElement("p");
      pVisualizacionesfb.textContent='Visualizaciones :'+registro.visualizacionesfb;
      pVisualizacionesfb.classList.add("fechaRegistro");
      var pInversionPublicitaria=document.createElement("p");
      pInversionPublicitaria.textContent='Inversion Publicitaria :'+registro.inversionPublicitaria;
      pInversionPublicitaria.classList.add("fechaRegistro")

      var pNumeroDePublicacionesFb=document.createElement("p");
      pNumeroDePublicacionesFb.textContent='Numero de publicaciones: '+registro.nPublicacionesfb;
      pNumeroDePublicacionesFb.classList.add("fechaRegistro");

      var pvisualizacionesxpublicacionesfb=document.createElement("p");
      pvisualizacionesxpublicacionesfb.textContent='Numero de visualizaciones: '+registro.visualizacionesxpublicacionesfb;
      pvisualizacionesxpublicacionesfb.classList.add("fechaRegistro");

      var pInteraccionesxpublicacionesfb=document.createElement("p");
      pInteraccionesxpublicacionesfb.textContent='Numero de interacciones: '+registro.interaccionesxpublicacionesfb;
      pInteraccionesxpublicacionesfb.classList.add("fechaRegistro");

      var pnHistorias=document.createElement("p");
      pnHistorias.textContent='# de historias: '+registro.nHistorias;
      pnHistorias.classList.add("fechaRegistro");

      var pnReels=document.createElement("p");
      pnReels.textContent='# de reels: '+registro.nReels;
      pnReels.classList.add("fechaRegistro");

      var pVisualizacionesxreels=document.createElement("p");
      pVisualizacionesxreels.textContent='Visualizaciones: '+registro.visualizacionesxreels;
      pVisualizacionesxreels.classList.add("fechaRegistro");

      var pInteraccionesxreels=document.createElement("p");
      pInteraccionesxreels.textContent='Interacciones: '+registro.interaccionesxreels;
      pInteraccionesxreels.classList.add("fechaRegistro");

      var pvisualizacionesxhistorias=document.createElement("p");
      pvisualizacionesxhistorias.textContent='Visualizaciones: '+registro.visualizacionesxhistorias;
      pvisualizacionesxhistorias.classList.add("fechaRegistro");

      var pinteraccionesxhistorias=document.createElement("p");
      pinteraccionesxhistorias.textContent='Interacciones: '+registro.interaccionesxhistorias;
      pinteraccionesxhistorias.classList.add("fechaRegistro");

      var pseguidoresTotalesIg=document.createElement("p");
      pseguidoresTotalesIg.textContent='Seguidores totales: '+registro.seguidoresTotalesIg;
      pseguidoresTotalesIg.classList.add("fechaRegistro");

      var pseguidoresdelmesIg=document.createElement("p");
      pseguidoresdelmesIg.textContent='Seguidores del mes: '+registro.seguidoresdelmesIg;
      pseguidoresdelmesIg.classList.add("fechaRegistro");

      var pnPostsEnElMesIg=document.createElement("p");
      pnPostsEnElMesIg.textContent='# Posts (cuántas en el mes): '+registro.nPostsEnElMesIg;
      pnPostsEnElMesIg.classList.add("fechaRegistro");

      var pvisualizacionesBFB=document.createElement("p");
      pvisualizacionesBFB.textContent='Visualizaciones BFB: '+registro.visualizacionesBFB;
      pvisualizacionesBFB.classList.add("fechaRegistro");

      var pinversionPublicitariaig=document.createElement("p");
      pinversionPublicitariaig.textContent='Inversion Publicitaria: '+registro.inversionPublicitariaig;
      pinversionPublicitariaig.classList.add("fechaRegistro");

      var pnPublicacionesig=document.createElement("p");
      pnPublicacionesig.textContent='Numero de publicaciones: '+registro.nPublicacionesig;
      pnPublicacionesig.classList.add("fechaRegistro");

      var pvisualizacionesxpublicacionesig=document.createElement("p");
      pvisualizacionesxpublicacionesig.textContent='visualizaciones: '+registro.visualizacionesxpublicacionesig;
      pvisualizacionesxpublicacionesig.classList.add("fechaRegistro");

      var pinteraccionesxpublicacionesig=document.createElement("p");
      pinteraccionesxpublicacionesig.textContent='interacciones: '+registro.interaccionesxpublicacionesig;
      pinteraccionesxpublicacionesig.classList.add("fechaRegistro");

      var pnReelsig=document.createElement("p");
      pnReelsig.textContent='# de reels: '+registro.nReelsig;
      pnReelsig.classList.add("fechaRegistro");

      var pvisualizacionesxreelsig=document.createElement("p");
      pvisualizacionesxreelsig.textContent='visualizaciones: '+registro.visualizacionesxreelsig;
      pvisualizacionesxreelsig.classList.add("fechaRegistro");

      var pinteraccionesxreelsig=document.createElement("p");
      pinteraccionesxreelsig.textContent='interacciones: '+registro.interaccionesxreelsig;
      pinteraccionesxreelsig.classList.add("fechaRegistro");


      var pnHistoriasig=document.createElement("p");
      pnHistoriasig.textContent='# de historias: '+registro.nHistoriasig;
      pnHistoriasig.classList.add("fechaRegistro");

      var palcanceHistoriasig=document.createElement("p");
      palcanceHistoriasig.textContent='Alcance: '+registro.alcanceHistoriasig;
      palcanceHistoriasig.classList.add("fechaRegistro");

      var pinteraccionesHistoriasig=document.createElement("p");
      pinteraccionesHistoriasig.textContent='Interacciones: '+registro.interaccionesHistoriasig;
      pinteraccionesHistoriasig.classList.add("fechaRegistro");

      var pseguidorestotalesTikTok=document.createElement("p");
      pseguidorestotalesTikTok.textContent='Seguidores totales: '+registro.seguidorestotalesTikTok;
      pseguidorestotalesTikTok.classList.add("fechaRegistro");

      var pnSeguidoresDelMesTikTok=document.createElement("p");
      pnSeguidoresDelMesTikTok.textContent='Seguidores del mes: '+registro.nSeguidoresDelMesTikTok;
      pnSeguidoresDelMesTikTok.classList.add("fechaRegistro");

      var pnPublicacionesTikTok=document.createElement("p");
      pnPublicacionesTikTok.textContent='Publicaciones: '+registro.nPublicacionesTikTok;
      pnPublicacionesTikTok.classList.add("fechaRegistro");

      var pnMeGustaDelMesTikTok=document.createElement("p");
      pnMeGustaDelMesTikTok.textContent='Me gusta del mes: '+registro.nMeGustaDelMesTikTok;
      pnMeGustaDelMesTikTok.classList.add("fechaRegistro");

      var pvisualizacionesdevideoTikTok=document.createElement("p");
      pvisualizacionesdevideoTikTok.textContent='Visualizaciones de video: '+registro.visualizacionesdevideoTikTok;
      pvisualizacionesdevideoTikTok.classList.add("fechaRegistro");

      var pseguidorestotalesx=document.createElement("p");
      pseguidorestotalesx.textContent='Seguidores totales: '+registro.seguidorestotalesx;
      pseguidorestotalesx.classList.add("fechaRegistro");

      var pnSeguidoresDelMesx=document.createElement("p");
      pnSeguidoresDelMesx.textContent='Seguidores del mes: '+registro.nSeguidoresDelMesx;
      pnSeguidoresDelMesx.classList.add("fechaRegistro");

      var pnPublicacionesx=document.createElement("p");
      pnPublicacionesx.textContent='Publicaciones: '+registro.nPublicacionesx;
      pnPublicacionesx.classList.add("fechaRegistro");

      var pinpremionesx=document.createElement("p");
      pinpremionesx.textContent='Premios: '+registro.inpremionesx;
      pinpremionesx.classList.add("fechaRegistro");

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

      var pclicsenelalcancefb=document.createElement("p");
      pclicsenelalcancefb.textContent='Clics en el enlace :'+registro.clicsenelalcancefb;
      var pclicsenelalcancefbads=document.createElement("p");
      pclicsenelalcancefbads.textContent='ads: '+registro.clicsenelalcancefbads;


      var pAlcanceIg=document.createElement("p");
      pAlcanceIg.textContent='Alcance: '+registro.alcanceIg;
      var pAlcanceIgads=document.createElement("p");
      pAlcanceIgads.textContent='ads: '+registro.alcanceIgads;

      var pinteraccionesconelcontenidoig=document.createElement("p");
      pinteraccionesconelcontenidoig.textContent='Interacciones con el contenido: '+registro.interaccionesconelcontenidoig;
      var pinteraccionesconelcontenidoigads=document.createElement("p");
      pinteraccionesconelcontenidoigads.textContent='ads: '+registro.interaccionesconelcontenidoigads;

      var pclicsenelalcanceig=document.createElement("p");
      pclicsenelalcanceig.textContent='Clics en el enlace :'+registro.clicsenelalcanceig;
      var pclicsenelalcanceigads=document.createElement("p");
      pclicsenelalcanceigads.textContent='ads: '+registro.clicsenelalcanceigads;

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
      var ViewRateFb=(registro.visualizacionesfb/registro.postalmesfb).toFixed(0);
      var pViewRateFb=document.createElement("p");
      pViewRateFb.textContent='View Rate Fb: '+ViewRateFb;
      pViewRateFb.classList.add("card-kpis");

      var engagementRateFb=(registro.interracionesconelcontenidofb/registro.alcancefb*100).toFixed(2);
      var pEngagementRateFb=document.createElement("p");
      pEngagementRateFb.textContent='Engagement Rate Fb: '+engagementRateFb+'%';
      pEngagementRateFb.classList.add("card-kpis");

      var clickthroughRateFb=(registro.clicsenelalcancefb/registro.alcancefb*100).toFixed(2);
      var pClickthroughRateFb=document.createElement("p");
      pClickthroughRateFb.textContent='Clickthrough Rate Fb: '+clickthroughRateFb+'%';
      pClickthroughRateFb.classList.add("card-kpis");
      
      var kpiVisualizaciones_Posts=(registro.visualizacionesxpublicacionesfb/registro.nPublicacionesfb).toFixed(0);
      var pKPI_Visualizaciones_Posts=document.createElement("p");
      pKPI_Visualizaciones_Posts.textContent='KPI Visualizaciones / Posts:'+kpiVisualizaciones_Posts;
      pKPI_Visualizaciones_Posts.classList.add("card-kpis");

      var KPI_Visualizaciones_Posts_reels=(registro.visualizacionesxreels/registro.nReels).toFixed(0);
      var pKPI_Visualizaciones_Posts_reels=document.createElement("p");
      pKPI_Visualizaciones_Posts_reels.textContent='KPI Visualizaciones / Posts:'+KPI_Visualizaciones_Posts_reels;
      pKPI_Visualizaciones_Posts_reels.classList.add("card-kpis");

      var Kpi_visualizaciones_post_historias=(registro.visualizacionesxhistorias/registro.nHistorias).toFixed(0);
      var pKpi_visualizaciones_post_historias=document.createElement("p");
      pKpi_visualizaciones_post_historias.textContent='KPI Visualizaciones / Posts:'+Kpi_visualizaciones_post_historias;
      pKpi_visualizaciones_post_historias.classList.add("card-kpis");

      var kpi_View_Rate_ig=(registro.visualizacionesBFB/registro.nPostsEnElMesIg).toFixed(0);
      var pKpi_View_Rate_ig=document.createElement("p");
      pKpi_View_Rate_ig.textContent='View Rate IG: '+kpi_View_Rate_ig;
      pKpi_View_Rate_ig.classList.add("card-kpis");

      var kpi_Engagement_Rate_ig=(registro.interaccionesconelcontenidoig/registro.alcanceIg*100).toFixed(2);
      var pKpi_Engagement_Rate_ig=document.createElement("p");
      pKpi_Engagement_Rate_ig.textContent='Engagement Rate : '+kpi_Engagement_Rate_ig+'%';
      pKpi_Engagement_Rate_ig.classList.add("card-kpis");

      var kpi_Clickthrough_Rate_ig=(registro.clicsenelalcanceig/registro.alcanceIg*100).toFixed(2);
      var pKpi_Clickthrough_Rate_ig=document.createElement("p");
      pKpi_Clickthrough_Rate_ig.textContent='Clickthrough Rate : '+kpi_Clickthrough_Rate_ig+'%';
      pKpi_Clickthrough_Rate_ig.classList.add("card-kpis");

      var kpi_visualizaciones_post_publicaciones_ig=(registro.visualizacionesxpublicacionesig/registro.nPublicacionesig).toFixed(0);
      var pKpi_visualizaciones_post_publicaciones_ig=document.createElement("p");
      pKpi_visualizaciones_post_publicaciones_ig.textContent='KPI Visualizaciones / Posts:'+kpi_visualizaciones_post_publicaciones_ig;
      pKpi_visualizaciones_post_publicaciones_ig.classList.add("card-kpis");

      var kpi_visualizaciones_reels_ig=(registro.visualizacionesxreelsig/registro.nReelsig).toFixed(0);
      var pKpi_visualizaciones_reels_ig=document.createElement("p");
      pKpi_visualizaciones_reels_ig.textContent='KPI Visualizaciones / Posts:'+kpi_visualizaciones_reels_ig;
      pKpi_visualizaciones_reels_ig.classList.add("card-kpis");

      var kpi_visulizaciones_historias_ig=(registro.alcanceHistoriasig/registro.nHistoriasig).toFixed(0);
      var pKpi_visulizaciones_historias_ig=document.createElement("p");
      pKpi_visulizaciones_historias_ig.textContent='KPI Visualizaciones / Posts:'+kpi_visulizaciones_historias_ig;
      pKpi_visulizaciones_historias_ig.classList.add("card-kpis");

      var kpi_view_rate_tiktok=(registro.visualizacionesdevideoTikTok/registro.nPublicacionesTikTok).toFixed(0);
      var pKpi_view_rate_tiktok=document.createElement("p");
      pKpi_view_rate_tiktok.textContent='View Rate : '+kpi_view_rate_tiktok;
      pKpi_view_rate_tiktok.classList.add("card-kpis");

      var kpi_view_rate_X=(registro.inpremionesx/registro.nPublicacionesx).toFixed(0);
      var pKpi_view_rate_X=document.createElement("p");
      pKpi_view_rate_X.textContent='View Rate : '+kpi_view_rate_X;
      pKpi_view_rate_X.classList.add("card-kpis");

      //titulos
      var PFacebook=document.createElement("p");
      PFacebook.textContent='FACEBOOK';
      PFacebook.classList.add("card-titulo");

      var PInstagram=document.createElement("p");
      PInstagram.textContent='INSTAGRAM';
      PInstagram.classList.add("card-titulo");

      var Ptiktok=document.createElement("p");
      Ptiktok.textContent='TIKTOK';
      Ptiktok.classList.add("card-titulo");

      var PX=document.createElement("p");
      PX.textContent='X';
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


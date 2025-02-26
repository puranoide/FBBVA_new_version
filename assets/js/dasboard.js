// Obtener el formulario
const formulario = document.getElementById("formulario");

// Objeto de configuración para todas las métricas
const configuracionMetricas = {
    facebook: {
        vistas: {
            entrada: 'visualizacionesfb',
            divisor: 'postalmesfb',
            salida: 'View_Rate',
            etiqueta: 'Tasa de Visualización',
            formato: 'fijo'
        },
        interacciones: {
            entrada: 'interracionesconelcontenidofb',
            divisor: 'alcancefb',
            salida: 'Engagement_Rate',
            etiqueta: 'Tasa de Interacción',
            formato: 'porcentaje'
        },
        clics: {
            entrada: 'clicsenelalcancefb',
            divisor: 'alcancefb',
            salida: 'Clickthrough_Rate',
            etiqueta: 'Tasa de Clics',
            formato: 'porcentaje'
        },
        publicaciones: {
            entrada: 'visualizacionesxpublicacionesfb',
            divisor: 'nPublicacionesfb',
            salida: 'KPI_Visualizaciones_Posts',
            formato: 'fijo'
        },
        reels: {
            entrada: 'visualizacionesxreels',
            divisor: 'nReels',
            salida: 'KPI2_Visualizaciones_Posts',
            formato: 'fijo'
        },
        historias: {
            entrada: 'visualizacionesxhistorias',
            divisor: 'nHistorias',
            salida: 'KPI3_Visualizaciones_Posts',
            formato: 'fijo'
        }
    },
    instagram: {
        vistas: {
            entrada: 'visualizacionesBFB',
            divisor: 'nPostsEnElMesIg',
            salida: 'View_Rate2',
            etiqueta: 'View Rate',
            formato: 'fijo'
        },
        interacciones: {
            entrada: 'interaccionesconelcontenidoig',
            divisor: 'alcanceIg',
            salida: 'Engagement_Rate2',
            etiqueta: 'Tasa de Interacción',
            formato: 'porcentaje'
        },
        clics: {
            entrada: 'clicsenelalcanceig',
            divisor: 'alcanceIg',
            salida: 'Clickthrough_Rate2',
            etiqueta: 'Tasa de Clics',
            formato: 'porcentaje'
        },
        publicaciones: {
            entrada: 'visualizacionesxpublicacionesig',
            divisor: 'nPublicacionesig',
            salida: 'KPI4_Visualizaciones_Posts',
            formato: 'fijo'
        },
        reels: {
            entrada: 'visualizacionesxreelsig',
            divisor: 'nReelsig',
            salida: 'KPI5_Visualizaciones_Posts',
            formato: 'fijo'
        },
        historias: {
            entrada: 'alcanceHistoriasig',
            divisor: 'nHistoriasig',
            salida: 'KPI6_Visualizaciones_Posts',
            formato: 'fijo'
        }
    },
    tiktok: {
        vistas: {
            entrada: 'visualizacionesdevideoTikTok',
            divisor: 'nPublicacionesTikTok',
            salida: 'View_Rate3',
            formato: 'fijo'
        }
    },
    x: {
        vistas: {
            entrada: 'inpremionesx',
            divisor: 'nPublicacionesx',
            salida: 'View_Rate4',
            formato: 'fijo'
        }
    }
};

// Función para calcular y formatear resultados
function calcularMetrica(valorEntrada, valorDivisor, formato) {
    const numero = parseInt(valorEntrada) || 0;
    const denominador = parseInt(valorDivisor) || 1; // Evitar división por cero
    const resultado = formato === 'porcentaje' ? (numero / denominador * 100) : (numero / denominador);
    return formato === 'porcentaje' ? resultado.toFixed(2) + '%' : resultado.toFixed();
}

// Manejador de eventos genérico
function crearManejadorMetrica(config) {
    return function() {
        try {
            const elementoEntrada = document.getElementById(config.entrada);
            const elementoDivisor = document.getElementById(config.divisor);
            const elementoSalida = document.getElementById(config.salida);
            
            if (!elementoEntrada || !elementoDivisor || !elementoSalida) {
                console.error(`Falta elemento para ${config.entrada}`);
                return;
            }

            const resultado = calcularMetrica(elementoEntrada.value, elementoDivisor.value, config.formato);
            elementoSalida.textContent = config.etiqueta ? `${config.etiqueta}: ${resultado}` : resultado;
            console.log(`Calculado ${config.entrada}: ${resultado}`);
        } catch (error) {
            console.error(`Error al calcular ${config.entrada}:`, error);
        }
    };
}

// Registrar los eventos
Object.values(configuracionMetricas).forEach(plataforma => {
    Object.values(plataforma).forEach(metrica => {
        const elementoEntrada = document.getElementById(metrica.entrada);
        if (elementoEntrada) {
            elementoEntrada.addEventListener('blur', crearManejadorMetrica(metrica));
        }
    });
});

var alcancefbads = document.getElementById("alcancefbads");

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

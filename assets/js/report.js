const urlParams = new URLSearchParams(window.location.search);
const objetoJson = urlParams.get('objeto');
const objeto = JSON.parse(objetoJson);

objeto.forEach(columna => {
    console.log("report de columna:",columna); // Ahora objeto es un arreglo de objetos JavaScript
});
var formularioPrincipal = document.getElementById("formulario");

var postalmesfb=document.getElementById("postalmesfb");
var visualizacionesfb=document.getElementById("visualizacionesfb");
var alcancefb=document.getElementById("alcancefb");
var interracionesconelcontenidofb=document.getElementById("interracionesconelcontenidofb");
var clicsenelalcancefb=document.getElementById("clicsenelalcancefb");
var nPublicacionesfb=document.getElementById("nPublicacionesfb");
var visualizacionesxpublicacionesfb=document.getElementById("visualizacionesxpublicacionesfb");
var nReels=document.getElementById("nReels");
var visualizacionesxreels=document.getElementById("visualizacionesxreels");
var nHistorias=document.getElementById("nHistorias");
var visualizacionesxhistorias=document.getElementById("visualizacionesxhistorias");
var nPostsEnElMesIg=document.getElementById("nPostsEnElMesIg");
var visualizacionesBFB=document.getElementById("visualizacionesBFB");
var alcanceIg=document.getElementById("alcanceIg");
var interaccionesconelcontenidoig=document.getElementById("interaccionesconelcontenidoig");
var nPublicacionesig=document.getElementById("nPublicacionesig");
var visualizacionesxpublicacionesig=document.getElementById("visualizacionesxpublicacionesig");
var visualizacionesxreelsig=document.getElementById("visualizacionesxreelsig");
var nReelsig=document.getElementById("nReelsig");
var alcanceHistoriasig=document.getElementById("alcanceHistoriasig");
var nHistoriasig=document.getElementById("nHistoriasig");
var nPublicacionesTikTok=document.getElementById("nPublicacionesTikTok");
var visualizacionesdevideoTikTok=document.getElementById("visualizacionesdevideoTikTok");
var nPublicacionesx=document.getElementById("nPublicacionesx");
var inpremionesx=document.getElementById("inpremionesx");
var View_Rate=document.getElementById("View_Rate");
var Engagement_Rate=document.getElementById("Engagement_Rate");
var Clickthrough_Rate=document.getElementById("Clickthrough_Rate");
var KPI_Visualizaciones_Post=document.getElementById("KPI_Visualizaciones_Post");
var KPI2_Visualizaciones_Posts=document.getElementById("KPI2_Visualizaciones_Posts");
var KPI3_Visualizaciones_Posts=document.getElementById("KPI3_Visualizaciones_Posts");
var View_Rate2=document.getElementById("View_Rate2");
var Engagement_Rate2=document.getElementById("Engagement_Rate2");
var Clickthrough_Rate2=document.getElementById("Clickthrough_Rate2");
var KPI4_Visualizaciones_Posts=document.getElementById("KPI4_Visualizaciones_Posts");
var KPI5_Visualizaciones_Posts=document.getElementById("KPI5_Visualizaciones_Posts");
var KPI6_Visualizaciones_Posts=document.getElementById("KPI6_Visualizaciones_Posts");
var View_Rate3=document.getElementById("View_Rate3");
var View_Rate4=document.getElementById("View_Rate4");




visualizacionesfb.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesfb");
    var total1=parseInt(visualizacionesfb.value)/parseInt(postalmesfb.value);
    console.log(total1.toFixed());
    View_Rate.textContent="";
    View_Rate.textContent="View Rate :"+total1.toFixed();
});

/*visualizacionesfb.addEventListener("mouseover", function () {
    alert("hola");
});*/
interracionesconelcontenidofb.addEventListener("blur", function () {
    console.log(" saliste de interraccionesconelcontenidofb");
    var total2 = (parseInt(interracionesconelcontenidofb.value) / parseInt(alcancefb.value)) * 100;
    console.log(total2 + "%");
    Engagement_Rate.textContent = "";
    Engagement_Rate.textContent ="Engagement Rate :" + total2.toFixed(2) + "%";
  });

clicsenelalcancefb.addEventListener("blur", function () {
    console.log(" saliste de clicsenelalcancefb");
    var total3 = (parseInt(clicsenelalcancefb.value) / parseInt(alcancefb.value)) * 100;
    console.log(total3 + "%");
    Clickthrough_Rate.textContent = "";
    Clickthrough_Rate.textContent ="Click through Rate :"+total3.toFixed(2) + "%";
  });

  visualizacionesxpublicacionesfb.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesxpublicacionesfb");
    var total4=parseInt(visualizacionesxpublicacionesfb.value)/parseInt(nPublicacionesfb.value);
    console.log(total4.toFixed());
    KPI_Visualizaciones_Posts.textContent="";
    KPI_Visualizaciones_Posts.textContent=total4.toFixed();
});

visualizacionesxreels.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesxreels");
    var total5=parseInt(visualizacionesxreels.value)/parseInt(nReels.value);
    console.log(total5.toFixed());
    KPI2_Visualizaciones_Posts.textContent="";
    KPI2_Visualizaciones_Posts.textContent=total5.toFixed();
});

visualizacionesxhistorias.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesxhistorias");
    var total6=parseInt(visualizacionesxhistorias.value)/parseInt(nHistorias.value);
    console.log(total6.toFixed());
    KPI3_Visualizaciones_Posts.textContent="";
    KPI3_Visualizaciones_Posts.textContent=total6.toFixed();
});




visualizacionesBFB.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesBFB");
    var total7=parseInt(visualizacionesBFB.value)/parseInt(nPostsEnElMesIg.value);
    console.log(total7.toFixed());
    View_Rate2.textContent="";
    View_Rate2.textContent=total7.toFixed();
});

interaccionesconelcontenidoig.addEventListener("blur", function () {
    console.log(" saliste de interaccionesconelcontenidoig");
    var total8 = (parseInt(interaccionesconelcontenidoig.value) / parseInt(alcanceIg.value)) * 100;
    console.log(total8 + "%");
    Engagement_Rate2.textContent = "";
    Engagement_Rate2.textContent = total8.toFixed(2) + "%";
  });

clicsenelalcanceig.addEventListener("blur", function () {
    console.log(" saliste de clicsenelalcanceig");
    var total9 = (parseInt(clicsenelalcanceig.value) / parseInt(alcanceIg.value)) * 100;
    console.log(total9 + "%");
    Clickthrough_Rate2.textContent = "";
    Clickthrough_Rate2.textContent = total9.toFixed(2) + "%";
  });



  visualizacionesxpublicacionesig.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesxpublicacionesig");
    var total20=parseInt(visualizacionesxpublicacionesig.value)/parseInt(nPublicacionesig.value);
    console.log(total20.toFixed());
    KPI4_Visualizaciones_Posts.textContent="";
    KPI4_Visualizaciones_Posts.textContent=total20.toFixed();
});

visualizacionesxreelsig.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesxreelsig");
    var total21=parseInt(visualizacionesxreelsig.value)/parseInt(nReelsig.value);
    console.log(total21.toFixed());
    KPI5_Visualizaciones_Posts.textContent="";
    KPI5_Visualizaciones_Posts.textContent=total21.toFixed();
});

alcanceHistoriasig.addEventListener("blur", function () {
    console.log(" saliste de alcanceHistoriasig");
    var total22=parseInt(alcanceHistoriasig.value)/parseInt(nHistoriasig.value);
    console.log(total22.toFixed());
    KPI6_Visualizaciones_Posts.textContent="";
    KPI6_Visualizaciones_Posts.textContent=total22.toFixed();
});


visualizacionesdevideoTikTok.addEventListener("blur", function () {
    console.log(" saliste de visualizacionesdevideoTikTok");
    var total23=parseInt(visualizacionesdevideoTikTok.value)/parseInt(nPublicacionesTikTok.value);
    console.log(total23.toFixed());
    View_Rate3.textContent="";
    View_Rate3.textContent=total23.toFixed();
});


inpremionesx.addEventListener("blur", function () {
    console.log(" saliste de inpremionesx");
    var total24=parseInt(inpremionesx.value)/parseInt(nPublicacionesx.value);
    console.log(total24.toFixed());
    View_Rate4.textContent="";
    View_Rate4.textContent=total24.toFixed();
});
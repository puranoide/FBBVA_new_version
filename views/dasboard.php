<?php
session_start();
if (!isset($_SESSION['nombre'])) {
    header("Location:../index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAROMEDIC-FBBVA</title>
    <link rel="stylesheet" href="../assets/css/dasboard.css">
</head>

<body>

    <header>
        <button id="logout">Salir</button>
        <h1>FAROMEDIC-FBBVA</h1>
        <h2>BIENVENIDO: <?php echo $_SESSION['nombre']; ?></h2>

    </header>

    <main>
        <div class="container">
            <form action="" method="post">
                <h1>FACEBOOK</h1>
                <label for="email">Seguidores totales</label>
                <input type="text" name="seguidoresfb" id="seguidoresfb">
                <label for="email"># seguidores del mes</label>
                <input type="text" name="seguidoresdelmesfb" id="seguidoresdelmesfb">
                <label for="email"># Posts (cuántas en el mes)</label>
                <input type="text" name="postalmesfb" id="postalmesfb">
                <label for="email">Visualizaciones</label>
                <input type="text" name="visualizacionesfb" id="visualizacionesfb">
                <label for="email">Alcance</label>
                <input type="text" name="alcancefb" id="alcancefb">
                <label for="email">Interacciones con el contenido</label>
                <input type="text" name="interracionesconelcontenidofb" id="interracionesconelcontenidofb">
                <label for="email">Clics en enlace</label>
                <input type="text" name="clicsenelalcancefb" id="clicsenelalcancefb" placeholder="Agregar dato del mismo mes 2024">
                <label for="email">Inversión Publicitaria</label>
                <input type="text" name="inversionPublicitaria" id="inversionPublicitaria">
                <label for="email"># Publicaciones</label>
                <input type="text" name="nPublicacionesfb" id="nPublicacionesfb">
                <label for="email">Visualizaciones</label>
                <input type="text" name="visualizacionesxpublicacionesfb" id="visualizacionesxpublicacionesfb">
                <label for="email">Interacciones</label>
                <input type="text" name="interaccionesxpublicacionesfb" id="interaccionesxpublicacionesfb">

                <label for="email"># Reels </label>
                <input type="text" name="nReels" id="nReels">

                <label for="email"># Visualizaciones </label>
                <input type="text" name="visualizacionesxreels" id="visualizacionesxreels">
                <label for="email">Interacciones </label>
                <input type="text" name="interaccionesxreels" id="interaccionesxreels">

                <label for="email"># Historias </label>
                <input type="text" name="nHistorias" id="nHistorias">

                <label for="email">Visualizaciones </label>
                <input type="text" name="visualizacionesxhistorias" id="visualizacionesxhistorias">
                <label for="email">Interacciones </label>
                <input type="text" name="interaccionesxhistorias" id="interaccionesxhistorias">

                <h1>INSTAGRAM</h1>
                <label for="email">Seguidores totales </label>
                <input type="text" name="seguidoresTotalesIg" id="seguidoresTotalesIg">
                <label for="email"># Seguidores del mes</label>
                <input type="text" name="seguidoresdelmesIg" id="seguidoresdelmesIg">
                <label for="email"># Posts (cuántas en el mes)</label>
                <input type="text" name="nPostsEnElMesIg" id="nPostsEnElMesIg">
                <label for="email">Visualizaciones BFB</label>
                <input type="text" name="visualizacionesBFB" id="visualizacionesBFB">
                <label for="email">Alcance</label>
                <input type="text" name="alcanceIg" id="alcanceIg" placeholder="Agregar dato del mismo mes 2024">
                <label for="email">Interacciones con el contenido</label>
                <input type="text" name="interaccionesconelcontenidoig" id="interaccionesconelcontenidoig" placeholder="Agregar dato del mismo mes 2024">
                <label for="email">Clics en enlace</label>
                <input type="text" name="clicsenelalcanceig" id="clicsenelalcanceig" placeholder="Agregar dato del mismo mes 2024">
                <label for="email">Inversión Publicitaria</label>
                <input type="text" name="inversionPublicitariaig" id="inversionPublicitariaig">
                <label for="email"># Publicaciones</label>
                <input type="text" name="nPublicacionesig" id="nPublicacionesig">
                <label for="email">Visualizaciones</label>
                <input type="text" name="visualizacionesxpublicacionesig" id="visualizacionesxpublicacionesig">
                <label for="email">Interacciones</label>
                <input type="text" name="interaccionesxpublicacionesig" id="interaccionesxpublicacionesig">
                <label for="email"># Reels </label>
                <input type="text" name="nReelsig" id="nReelsig">
                <label for="email">Visualizaciones </label>
                <input type="text" name="visualizacionesxreelsig" id="visualizacionesxreelsig">
                <label for="email">Interacciones</label>
                <input type="text" name="interaccionesxreelsig" id="interaccionesxreelsig">
                <label for="email"># Historias</label>
                <input type="text" name="nHistoriasig" id="nHistoriasig">
                <label for="email">Alcance</label>
                <input type="text" name="alcanceHistoriasig" id="alcanceHistoriasig">
                <label for="email">Interacciones</label>
                <input type="text" name="interaccionesHistoriasig" id="interaccionesHistoriasig">

                <h1>TikTok</h1>
                <label for="email">Seguidores totales</label>
                <input type="text" name="seguidorestotalesTikTok" id="seguidorestotalesTikTok">
                <label for="email"># Seguidores del mes</label>
                <input type="text" name="nSeguidoresDelMesTikTok" id="nSeguidoresDelMesTikTok">
                <label for="email"># Publicaciones</label>
                <input type="text" name="nPublicacionesTikTok" id="nPublicacionesTikTok">
                <label for="email">Me gusta del mes</label>
                <input type="text" name="nMeGustaDelMesTikTok" id="nMeGustaDelMesTikTok">
                <label for="email">Visualizaciones de video (máx)</label>
                <input type="text" name="visualizacionesdevideoTikTok" id="visualizacionesdevideoTikTok">
                <h1>X</h1>
                <label for="email">Seguidores totales</label>
                <input type="text" name="seguidorestotalesx" id="seguidorestotalesx">
                <label for="email"># Seguidores del mes</label>
                <input type="text" name="nSeguidoresDelMesx" id="nSeguidoresDelMesTikTok">
                <label for="email">Impresiones</label>
                <input type="text" name="inpremionesx" id="inpremionesx">
               
            </form>
        </div>
    </main>

</body>

</html>
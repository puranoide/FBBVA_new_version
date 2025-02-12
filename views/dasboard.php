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
                <div class="fila">
                    <label for="email">Seguidores totales</label>
                    <input type="text" name="seguidoresfb" id="seguidoresfb">
                </div>
                <div class="fila">
                    <label for="email"># seguidores del mes</label>
                    <input type="text" name="seguidoresdelmesfb" id="seguidoresdelmesfb">
                    
                </div>
                <div class="fila">
                    <label for="email"># Posts (cuántas en el mes)</label>
                    <input type="text" name="postalmesfb" id="postalmesfb">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones</label>
                    <input type="text" name="visualizacionesfb" id="visualizacionesfb">
                </div>
                <div class="fila">
                    <label for="email">Alcance</label>
                    <input type="text" name="alcancefb" id="alcancefb">
                </div>
                <div class="fila">
                    <label for="email">Interacciones con el contenido</label>
                    <input type="text" name="interracionesconelcontenidofb" id="interracionesconelcontenidofb">
                </div>

                <div class="fila">
                    <label for="email">Clics en enlace</label>
                    <input type="text" name="clicsenelalcancefb" id="clicsenelalcancefb" placeholder="Agregar dato del mismo mes 2024">
                </div>
                <div class="fila">
                    <label for="email">Inversión Publicitaria</label>
                    <input type="text" name="inversionPublicitaria" id="inversionPublicitaria">
                </div>
                <div class="fila">
                    <label for="email"># Publicaciones</label>
                    <input type="text" name="nPublicacionesfb" id="nPublicacionesfb">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones</label>
                    <input type="text" name="visualizacionesxpublicacionesfb" id="visualizacionesxpublicacionesfb">
                </div>
                <div class="fila">
                    <label for="email">Interacciones</label>
                    <input type="text" name="interaccionesxpublicacionesfb" id="interaccionesxpublicacionesfb">
                </div>

                <div class="fila">
                    <label for="email"># Reels </label>
                    <input type="text" name="nReels" id="nReels">

                </div>
                <div class="fila">
                    <label for="email"># Visualizaciones </label>
                    <input type="text" name="visualizacionesxreels" id="visualizacionesxreels">
                </div>
                <div class="fila">
                    <label for="email">Interacciones </label>
                    <input type="text" name="interaccionesxreels" id="interaccionesxreels">
                </div>
                <div class="fila">
                    <label for="email"># Historias </label>
                    <input type="text" name="nHistorias" id="nHistorias">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones </label>
                    <input type="text" name="visualizacionesxhistorias" id="visualizacionesxhistorias">
                </div>
                <div class="fila">
                    <label for="email">Interacciones </label>
                    <input type="text" name="interaccionesxhistorias" id="interaccionesxhistorias">
                </div>

                <h1>INSTAGRAM</h1>

                <div class="fila">
                    <label for="email">Seguidores totales </label>
                    <input type="text" name="seguidoresTotalesIg" id="seguidoresTotalesIg">
                </div>
                <div class="fila">
                    <label for="email"># Seguidores del mes</label>
                    <input type="text" name="seguidoresdelmesIg" id="seguidoresdelmesIg">
                </div>
                <div class="fila">
                    <label for="email"># Posts (cuántas en el mes)</label>
                    <input type="text" name="nPostsEnElMesIg" id="nPostsEnElMesIg">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones BFB</label>
                    <input type="text" name="visualizacionesBFB" id="visualizacionesBFB">
                </div>
                <div class="fila">
                    <label for="email">Alcance</label>
                    <input type="text" name="alcanceIg" id="alcanceIg" placeholder="Agregar dato del mismo mes 2024">
                </div>
                <div class="fila">
                    <label for="email">Interacciones con el contenido</label>
                    <input type="text" name="interaccionesconelcontenidoig" id="interaccionesconelcontenidoig" placeholder="Agregar dato del mismo mes 2024">
                </div>
                <div class="fila">
                    <label for="email">Clics en enlace</label>
                    <input type="text" name="clicsenelalcanceig" id="clicsenelalcanceig" placeholder="Agregar dato del mismo mes 2024">
                </div>
                <div class="fila">
                    <label for="email">Inversión Publicitaria</label>
                    <input type="text" name="inversionPublicitariaig" id="inversionPublicitariaig">
                </div>
                <div class="fila">
                    <label for="email"># Publicaciones</label>
                    <input type="text" name="nPublicacionesig" id="nPublicacionesig">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones</label>
                    <input type="text" name="visualizacionesxpublicacionesig" id="visualizacionesxpublicacionesig">
                </div>
                <div class="fila">
                    <label for="email">Interacciones</label>
                    <input type="text" name="interaccionesxpublicacionesig" id="interaccionesxpublicacionesig">
                </div>
                <div class="fila">
                    <label for="email"># Reels </label>
                    <input type="text" name="nReelsig" id="nReelsig">
                </div>
                <div class="fila">
                    <label for="email">Visualizaciones </label>
                    <input type="text" name="visualizacionesxreelsig" id="visualizacionesxreelsig">
                </div>
                <div class="fila">
                    <label for="email">Interacciones</label>
                    <input type="text" name="interaccionesxreelsig" id="interaccionesxreelsig">
                </div>
                <div class="fila">
                    <label for="email"># Historias</label>
                    <input type="text" name="nHistoriasig" id="nHistoriasig">
                </div>
                <div class="fila">
                    <label for="email">Alcance</label>
                    <input type="text" name="alcanceHistoriasig" id="alcanceHistoriasig">
                </div>
                <div class="fila">
                    <label for="email">Interacciones</label>
                    <input type="text" name="interaccionesHistoriasig" id="interaccionesHistoriasig">
                </div>


                <h1>TikTok</h1>

                <div class="fila">
                    <label for="email">Seguidores totales</label>
                    <input type="text" name="seguidorestotalesTikTok" id="seguidorestotalesTikTok">
                </div>
                <div class="fila">
                    <label for="email"># Seguidores del mes</label>
                    <input type="text" name="nSeguidoresDelMesTikTok" id="nSeguidoresDelMesTikTok">
                </div>
                <div class="fila">
                    <label for="email"># Publicaciones</label>
                    <input type="text" name="nPublicacionesTikTok" id="nPublicacionesTikTok">
                </div>
                <div class="fila">
                    <label for="email">Me gusta del mes</label>
                    <input type="text" name="nMeGustaDelMesTikTok" id="nMeGustaDelMesTikTok">
                </div>

                <div class="fila">
                    <label for="email">Visualizaciones de video (máx)</label>
                    <input type="text" name="visualizacionesdevideoTikTok" id="visualizacionesdevideoTikTok">
                </div>

                <h1>X</h1>

                <div class="fila">
                    <label for="email">Seguidores totales</label>
                    <input type="text" name="seguidorestotalesx" id="seguidorestotalesx">
                </div>

                <div class="fila">
                    <label for="email"># Seguidores del mes</label>
                    <input type="text" name="nSeguidoresDelMesx" id="nSeguidoresDelMesTikTok">
                </div>

                <div class="fila">
                    <label for="email">Impresiones</label>
                    <input type="text" name="inpremionesx" id="inpremionesx">
                </div>


            </form>
        </div>
        <div class="container">
        <h1>REGISTROS</h1>
        </div>

    </main>

</body>

</html>
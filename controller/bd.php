<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "fbbva_dev";
$conexion = mysqli_connect($servername,$username,$password,$database);



if (!$conexion) {
    die("Connection failed: " . mysqli_connect_error());
}

/*

$servername = "localhost";
$username = "u685818680_admin_gab";
$password = "GptYi#R5";
$database = "u685818680_fbbva_nv
";
$conexion = mysqli_connect($servername,$username,$password,$database);


$servername = "localhost";
$username = "root";
$password = "";
$database = "fbbva_newversion";
$conexion = mysqli_connect($servername,$username,$password,$database);


CREATE TABLE fbbva_newversion.usuario (
	id INT auto_increment NOT NULL,
	nombreusuario varchar(150) NOT NULL,
	contrasena varchar(255) NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE fbbva_newversion.registros (
	id INT auto_increment NOT NULL,
	seguidoresfb INT NULL,
	seguidoresdelmesfb INT NULL,
	seguidoresdelmesfbads INT NULL,
	postalmesfb INT NULL,
	visualizacionesfb INT NULL,
	alcancefb INT NULL,
	alcancefbads INT NULL,
	interracionesconelcontenidofb INT NULL,
	clicsenelalcancefb INT NULL,
	clicsenelalcancefbads INT NULL,
	inversionPublicitaria INT NULL,
	nPublicacionesfb INT NULL,
	visualizacionesxpublicacionesfb INT NULL,
	interaccionesxpublicacionesfb INT NULL,
	nReels INT NULL,
	visualizacionesxreels INT NULL,
	interaccionesxreels INT NULL,
	nHistorias INT NULL,
	visualizacionesxhistorias INT NULL,
	interaccionesxhistorias INT NULL,
	seguidoresTotalesIg INT NULL,
	seguidoresdelmesIg INT NULL,
	nPostsEnElMesIg INT NULL,
	visualizacionesBFB INT NULL,
	alcanceIg INT NULL,
	alcanceIgads INT NULL,
	interaccionesconelcontenidoig INT NULL,
	interaccionesconelcontenidoigads INT NULL,
	clicsenelalcanceig INT NULL,
	clicsenelalcanceigads INT NULL,
	inversionPublicitariaig INT NULL,
	nPublicacionesig INT NULL,
	visualizacionesxpublicacionesig INT NULL,
	interaccionesxpublicacionesig INT NULL,
	nReelsig INT NULL,
	visualizacionesxreelsig INT NULL,
	interaccionesxreelsig INT NULL,
	nHistoriasig INT NULL,
	alcanceHistoriasig INT NULL,
	interaccionesHistoriasig INT NULL,
	seguidorestotalesTikTok INT NULL,
	nSeguidoresDelMesTikTok INT NULL,
	nPublicacionesTikTok INT NULL,
	nMeGustaDelMesTikTok INT NULL,
	visualizacionesdevideoTikTok INT NULL,
	seguidorestotalesx INT NULL,
	nSeguidoresDelMesx INT NULL,
	nPublicacionesx INT NULL,
	inpremionesx INT NULL,
	fechaCreada DATE NULL,
	CONSTRAINT registros_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

*/


?>
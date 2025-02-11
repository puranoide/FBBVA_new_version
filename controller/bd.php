<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "fbbva_newversion";
$conexion = mysqli_connect($servername,$username,$password,$database);

if (!$conexion) {
    die("Connection failed: " . mysqli_connect_error());
}

/*

CREATE TABLE fbbva_newversion.usuario (
	id INT auto_increment NOT NULL,
	nombreusuario varchar(150) NOT NULL,
	contrasena varchar(255) NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


*/


?>
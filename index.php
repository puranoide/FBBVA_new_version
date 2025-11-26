<?php
session_start();
if (isset($_SESSION['nombre'])) {
    
    header("Location:views/dasboard.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/login.css">
    <title>Login-FBBVA</title>
</head>

<body>

    <header>
        <img src="assets/img/logo_faro_avif.avif" alt="" class="logo">
        <select name="institucion" id="institucion" class="institucion">
            <option value="1">FAROMEDIC-FBBVA</option>
            <option value="2">DANESSA</option>
        </select>
    </header>


    <main>
        <form action="" method="post">
            <label for="email">Usuario</label>
            <input type="text" name="usuario" id="usuario">

            <label for="contraseña">Contraseña</label>
            <input type="password" name="contrasena" id="contrasena">

            <input type="submit" value="Ingresar" id="login">
        </form>
        <div class="message" id="message"></div>
    </main>

    <script src="assets/js/auth.js"></script>

</body>

</html>
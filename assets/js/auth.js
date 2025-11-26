

var loginButton = document.getElementById("login");
var usuario= document.getElementById("usuario");
var contrasena= document.getElementById("contrasena");
var message = document.getElementById("message");
//un lenguaje de eventos
loginButton.addEventListener("click", function() {
    //login(email.value, password.value);
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional
    console.log("login");
    console.log(usuario.value);
    console.log(contrasena.value);
    login(usuario.value, contrasena.value);
});

var selectEmpresa= document.getElementById("institucion");
selectEmpresa.addEventListener("change", function() {
    var institucion = selectEmpresa.value;
    nombreinti="";
    if (institucion == "1") {
        nombreinti="FAROMEDIC-FBBVA";
    }else{
        nombreinti="DANESSA";
    }
    alert("haz seleccionado la empresa: " + nombreinti);
});
function login(usuario, contrasena) {

    fetch("controller/auth.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'login',
            usuario: usuario,
            contrasena: contrasena
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        message.textContent = "ingresando...";
        if (data.success) {
            console.log("Login exitoso");
            message.textContent = "login exitoso";
            message.classList.add("success");
            // Redirigir a la página de inicio
            if (selectEmpresa.value == "1") {
                window.location.href = "views/dasboard.php";
            }else{
                window.location.href = "views/dasboarddanesa.php";
            }
            
        } else {
            console.log("Error al iniciar sesión");
            message.textContent = "login fallido,intentelo de nuevo";
            message.classList.add("error");
        }
    })
    .catch(error => {
        console.log(error);
    });

}


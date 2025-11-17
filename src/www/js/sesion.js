// Seleccionar elementos
const nombreCompleto = document.querySelector("#name");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const telefono = document.querySelector("#telefono");
const email = document.querySelector("#email");
const datosCuenta = document.querySelector("#datosCuenta");
const bodySesion = document.querySelector("#bodyRegistro");
const botonAceptar = document.querySelector("#aceptar");
const usuarioIntroducido = document.querySelector("#userIntroducido");
const contraseñaIntroducida = document.querySelector("#passwordIntroducida");

// Registro de cuenta
if(datosCuenta){
  
    const registrarCuenta = (e) => {
        console.log("Función registrarCuenta ejecutada");
        e.preventDefault();
        
        console.log("Valores de los campos:");
        console.log("Nombre:", nombreCompleto.value);
        console.log("Username:", username.value);
        console.log("Password:", password.value);
        console.log("Telefono:", telefono.value);
        console.log("Email:", email.value);
       
        if(
            !nombreCompleto.value.trim() ||
            !username.value.trim() ||
            !password.value.trim() ||
            !telefono.value.trim() ||
            !email.value.trim()
        ){
            console.log("Campos vacíos detectados");
            alert("Por favor, rellene todos los campos");
            return;
        }
        
        let cuentasCreadas = JSON.parse(localStorage.getItem("cuentaCreada")) || [];
        
        if (!Array.isArray(cuentasCreadas)) {
            console.log("Los datos guardados no son un array, corrigiendo...");
            if (typeof cuentasCreadas === 'object' && cuentasCreadas !== null) {
                cuentasCreadas = [cuentasCreadas];
            } else {
                cuentasCreadas = [];
            }
        }
        
        console.log("Cuentas existentes:", cuentasCreadas);
        
        const usuarioExiste = cuentasCreadas.find(c => c.Username === username.value);
        
        if(usuarioExiste){
            alert("El nombre de usuario ya existe");
            return;
        }
        
        const cuenta = {
            Nombre: nombreCompleto.value,
            Username: username.value,
            Contraseña: password.value,
            Telefono: telefono.value,
            Email: email.value
        }
           
        cuentasCreadas.push(cuenta);
        
        const info = document.createElement("div");
        info.textContent = "Cuenta registrada con éxito";
        if(bodySesion){
            info.className = "infoGenerada";
            bodySesion.appendChild(info);
            setTimeout(() => info.remove(), 3000);
        }
        
        localStorage.setItem("cuentaCreada", JSON.stringify(cuentasCreadas));
        
        datosCuenta.reset();
  
    }
    
    datosCuenta.addEventListener("submit", registrarCuenta);
} 



if(botonAceptar){
    
    const iniciarSesion = () => {
        console.log("Función iniciarSesion ejecutada");
        
        let cuentasCreadas = JSON.parse(localStorage.getItem("cuentaCreada")) || [];
        
        if (!Array.isArray(cuentasCreadas)) {
            console.log("Los datos guardados no son un array, corrigiendo...");
            if (typeof cuentasCreadas === 'object' && cuentasCreadas !== null) {
                cuentasCreadas = [cuentasCreadas];
            } else {
                cuentasCreadas = [];
            }
        }
        
        const usuarioCorrecto = cuentasCreadas.find(c => c.Username === usuarioIntroducido.value && c.Contraseña === contraseñaIntroducida.value);
        
        console.log("Cuentas guardadas:", cuentasCreadas);
        console.log("Usuario introducido:", usuarioIntroducido.value);
        console.log("Contraseña introducida:", contraseñaIntroducida.value);
        console.log("Usuario encontrado:", usuarioCorrecto);
        
        if(usuarioCorrecto){
            window.location.href = "incidencias.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }
    
    botonAceptar.addEventListener("click", iniciarSesion);
    
} 
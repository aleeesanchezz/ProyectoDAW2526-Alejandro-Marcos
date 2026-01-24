# Sprint 1 - Desarrollo
## EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 18 de Noviembre de 2025  
**Sprint:** 1

---

## Índice

1. [Introducción](#1-introducción)
2. [Objetivos del Sprint](#2-objetivos-del-sprint)
3. [Caso de Uso 1: Registro de Usuario](#3-caso-de-uso-1-registro-de-usuario)
   - 3.1. [Descripción](#31-descripción)
   - 3.2. [Implementación](#32-implementación)
   - 3.3. [Validaciones](#33-validaciones)
4. [Caso de Uso 2: Inicio de Sesión](#4-caso-de-uso-2-inicio-de-sesión)
   - 4.1. [Descripción](#41-descripción)
   - 4.2. [Implementación](#42-implementación)
   - 4.3. [Gestión de Sesiones](#43-gestión-de-sesiones)
5. [Problemas Encontrados](#5-problemas-encontrados)
6. [Conclusiones](#6-conclusiones)
7. [Ubicación del Código](#7-ubicación-del-código)

---

## 1. Introducción

Este documento describe el trabajo realizado durante el **primer sprint** de desarrollo de EcoTrack. En esta primera iteración nos hemos centrado en implementar las funcionalidades básicas de autenticación: el registro de nuevos usuarios y el inicio de sesión.

Estas dos funcionalidades son fundamentales porque sin ellas no podemos avanzar con el resto de la aplicación, ya que todo el sistema depende de que los usuarios estén identificados.

---

## 2. Objetivos del Sprint

Los objetivos que nos propusimos para este sprint fueron:

1. ✅ Crear el formulario de registro con todos los campos necesarios
2. ✅ Implementar la lógica de registro en el backend
3. ✅ Validar que no se repitan usuarios o emails
4. ✅ Cifrar las contraseñas antes de guardarlas
5. ✅ Crear el formulario de inicio de sesión
6. ✅ Implementar la validación de credenciales
7. ✅ Gestionar sesiones PHP para mantener al usuario logueado
8. ✅ Aplicar los estilos de nuestra guía de diseño

---

## 3. Caso de Uso 1: Registro de Usuario

### 3.1. Descripción

El registro permite que nuevos usuarios creen una cuenta en EcoTrack. Decidimos incluir más campos de los básicos porque queríamos tener información completa del usuario desde el principio.

**Campos del formulario:**
- Nombre completo
- Nombre de usuario (único)
- Contraseña
- Teléfono (opcional)
- Email (único)

### 3.2. Implementación

Hemos usado el patrón **MVC** (Modelo-Vista-Controlador) para organizar el código:

#### **Vista (registro.html)**
Creamos un formulario HTML con todos los campos necesarios. Cada input tiene su placeholder para que sea más intuitivo.

**Características importantes:**
- El formulario envía los datos por POST al controlador
- Mostramos mensajes de error si algo falla (usuario duplicado, email ya usado, etc.)
- Los estilos siguen nuestra guía: inputs con borde verde al hacer focus, botones verdes, etc.

#### **Controlador (ControladorLogin.php)**
El método `alta()` se encarga de procesar el registro:

1. Recoge todos los datos del formulario con `$_POST`
2. Crea un objeto Usuario con esos datos
3. Verifica si el usuario o email ya existen usando `existeUsuarioOCorreo()`
4. Si ya existe, muestra un error y vuelve al formulario
5. Si no existe, guarda el usuario en la base de datos
6. Redirige al login con un mensaje de éxito

#### **Modelo (usuario.php)**
La clase Usuario tiene dos métodos clave:

**`existeUsuarioOCorreo()`**  
Consulta la base de datos para ver si ya hay un usuario con ese nombre de usuario o ese email. Retorna un array indicando qué está duplicado.

**`guardar()`**  
Inserta el nuevo usuario en la base de datos. **IMPORTANTE:** Antes de guardar, la contraseña se cifra con `password_hash()` usando el algoritmo por defecto de PHP. Nunca guardamos contraseñas en texto plano.

### 3.3. Validaciones

Hemos implementado estas validaciones:

**En el backend:**
- ✅ Verificar que el nombre de usuario sea único
- ✅ Verificar que el email sea único
- ✅ Cifrar la contraseña antes de guardar
- ✅ Manejar errores de base de datos

**En el frontend:**
- ✅ Campos obligatorios marcados
- ✅ Tipo de input correcto (email, tel, password)
- ✅ Botón "Limpiar" para resetear el formulario

**Lo que nos falta:**
- Validación de formato de email con JavaScript
- Comprobar fortaleza de la contraseña
- Confirmación de contraseña

---

## 4. Caso de Uso 2: Inicio de Sesión

### 4.1. Descripción

El inicio de sesión permite que los usuarios registrados accedan a su cuenta usando su nombre de usuario y contraseña.

**Campos del formulario:**
- Nombre de usuario
- Contraseña

### 4.2. Implementación

También usando el patrón MVC:

#### **Vista (sesion.html)**
Formulario simple con dos campos y un botón de envío. Incluye un enlace al registro para usuarios nuevos.

**Características:**
- Diseño limpio centrado en la pantalla
- Logo de EcoTrack arriba
- Mensaje de error si las credenciales son incorrectas
- Enlace para crear cuenta si no la tienes

#### **Controlador (ControladorLogin.php)**
El método `crearSesion()` gestiona el login:

1. Recoge el nombre de usuario y contraseña del formulario
2. Llama al método estático `Usuario::validarLogin()`
3. Si las credenciales son incorrectas, muestra un error
4. Si son correctas, inicia una sesión PHP
5. Guarda los datos del usuario en `$_SESSION`
6. Redirige al dashboard o página principal

#### **Modelo (usuario.php)**
El método estático **`validarLogin()`** es el encargado de verificar las credenciales:

1. Busca en la base de datos un usuario con ese nombre de usuario
2. Si no existe, retorna `false`
3. Si existe, compara la contraseña usando `password_verify()`
4. Si la contraseña es correcta, retorna un array con los datos del usuario (sin la contraseña)
5. Si la contraseña es incorrecta, retorna `false`

### 4.3. Gestión de Sesiones

Una vez validado el login, guardamos estos datos en la sesión:

```php
$_SESSION['usuario_id'] = ...
$_SESSION['usuario_nombre'] = ...
$_SESSION['usuario_nombreUsuario'] = ...
$_SESSION['usuario_email'] = ...
```

Esto nos permite saber quién está usando la aplicación en cada momento sin tener que volver a pedir las credenciales.

**Importante:** Al principio tuvimos un bug porque nos olvidamos de hacer `session_start()` al inicio, y las sesiones no se guardaban. Ya lo arreglamos.

---

## 5. Problemas Encontrados

Durante el desarrollo nos encontramos con algunos problemas:

### Problema 1: Constructores duplicados
Al principio intentamos tener dos constructores en la clase Usuario (uno para registro con todos los campos, otro para login solo con usuario y contraseña). PHP no permite esto, así que tuvimos que usar un solo constructor y métodos estáticos.

### Problema 2: Contraseña en texto plano
Al principio guardábamos la contraseña directamente sin cifrar. Nos dimos cuenta del error de seguridad y lo corregimos usando `password_hash()` y `password_verify()`.



## 6. Conclusiones

En este primer sprint hemos conseguido implementar las funcionalidades básicas de autenticación de forma funcional y segura.

**Próximos pasos:**
En el siguiente sprint nos centraremos en el dashboard principal y el registro de consumos, que son las funcionalidades core de la aplicación.

---

## 7. Ubicación del Código

El código completo de estos dos casos de uso se encuentra en:

**Ruta del proyecto:** `raiz_del_proyecto/src/www/`

**Archivos principales:**

**Vistas:**
- `vistas/registro.html` - Formulario de registro
- `vistas/sesion.html` - Formulario de login

**Controladores:**
- `controladores/ControladorLogin.php` - Lógica de registro y login

**Modelos:**
- `modelos/usuario.php` - Clase Usuario con métodos de validación

**Servicios:**
- `servicios/bd.php` - Conexión y operaciones con la base de datos

**CSS:**
- `css/styles.css` - Estilos de login y registro

**Base de datos:**
- La estructura de la tabla `usuario` está definida en el diccionario de datos

---


# Product Backlog — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 18 de Noviembre de 2025  
**Versión:** 1.0

---

## Índice
1. [Introducción](#1-introducción)
2. [Historias de usuario — Prioridad alta](#2-historias-de-usuario--prioridad-alta)
3. [Historias de usuario — Prioridad media](#3-historias-de-usuario--prioridad-media)
4. [Historias de usuario — Prioridad baja](#4-historias-de-usuario--prioridad-baja)
5. [Requisitos no funcionales](#5-requisitos-no-funcionales)
6. [Glosario](#6-glosario)

---

## 1. Introducción

Este documento recoge todas las funcionalidades que queremos implementar en **EcoTrack** en forma de historias de usuario. Lo hemos escrito intentando que sea claro y fácil de entender, usando un lenguaje natural.

No hemos planificado sprints porque todavía estamos en fase de desarrollo inicial, pero sí hemos organizado las historias por prioridades para saber por dónde empezar. Cada historia tiene sus criterios de aceptación para saber cuándo está terminada.

### ¿Qué es una historia de usuario?
Es una forma de describir una funcionalidad desde el punto de vista del usuario. Sigue este formato:
- **Como** [tipo de usuario]
- **Quiero** [hacer algo]
- **Para** [conseguir un objetivo]

---

## 2. Historias de usuario — Prioridad alta

Estas son las funcionalidades más importantes que tenemos que hacer sí o sí para que la aplicación funcione.

---

### HU-01 · Registro de usuario HECHO

**Como** visitante de la web,  
**Quiero** crear una cuenta en EcoTrack,  
**Para** poder empezar a registrar mis consumos y calcular mi huella de carbono.

**Criterios de aceptación:**
- El formulario debe tener los campos: nombre completo, nombre de usuario, contraseña, teléfono (opcional) y email
- El nombre de usuario debe ser único en todo el sistema
- El email también debe ser único (no se puede registrar dos veces el mismo)
- Si el usuario o el email ya existen, mostrar un mensaje de error claro
- La contraseña debe estar cifrada antes de guardarse en la base de datos (usamos password_hash de PHP)
- Después de registrarse correctamente, redirigir al usuario a la página de login
- Mostrar un mensaje de confirmación tipo "Usuario registrado correctamente"

**Notas técnicas:**
- Usar el método `alta()` del ControladorLogin
- Validar con el método `existeUsuarioOCorreo()` de la clase Usuario
- El teléfono es opcional, los demás campos son obligatorios

---

### HU-02 · Inicio de sesión HECHO

**Como** usuario registrado,  
**Quiero** poder iniciar sesión con mi nombre de usuario y contraseña,  
**Para** acceder a mi cuenta y ver mis datos.

**Criterios de aceptación:**
- El formulario de login debe tener: nombre de usuario y contraseña
- Validar que el usuario existe en la base de datos
- Comprobar que la contraseña es correcta usando password_verify
- Si los datos son incorrectos, mostrar "Usuario o contraseña incorrectos"
- Si el login es correcto, crear una sesión PHP con los datos del usuario
- Guardar en la sesión: id, nombre, nombre_usuario y email
- Redirigir al dashboard después de iniciar sesión

**Notas técnicas:**
- Usar el método `crearSesion()` del ControladorLogin
- Validar con el método estático `Usuario::validarLogin()`
- Usar `$_SESSION` para mantener la sesión activa

---

### HU-03 · Dashboard principal PENDIENTE

**Como** usuario autenticado,  
**Quiero** ver un resumen visual de mi consumo,  
**Para** entender rápidamente cuánto CO₂ estoy generando y cómo evoluciona.

**Criterios de aceptación:**
- Mostrar el total de CO₂ generado en el mes actual
- Incluir un gráfico circular con el desglose por categorías (Agua, Electricidad, Gas)
- Mostrar un gráfico de línea con la evolución de los últimos 6 meses
- Incluir el número total de consumos registrados
- Mostrar un mensaje de bienvenida con el nombre del usuario
- Si no hay datos, mostrar un mensaje motivador para empezar a registrar consumos

**Notas técnicas:**
- Obtener datos de las tablas CONSUMO y ESTADISTICA
- Usar Chart.js o similar para los gráficos
- Optimizar las consultas para que cargue rápido

---

### HU-04 · Registrar un consumo HECHO

**Como** usuario,  
**Quiero** registrar mis consumos de agua, luz o gas,  
**Para** llevar un control de mi gasto energético y calcular mi huella de carbono.

**Criterios de aceptación:**
- Formulario con: categoría (desplegable), cantidad, unidad, fecha y notas opcionales
- Las categorías disponibles son: Agua, Electricidad, Gas
- La cantidad debe ser un número mayor que 0
- La fecha no puede ser futura
- El CO₂ generado se debe calcular automáticamente al guardar
- Mostrar un mensaje de confirmación al registrar
- El nuevo consumo debe aparecer inmediatamente en el historial
- Si hay algún error, mostrar un mensaje claro

**Notas técnicas:**
- Calcular co2_generado = cantidad × factor_co2 de la tabla CATEGORIA
- Insertar en la tabla CONSUMO con el id_usuario de la sesión
- Validar todos los campos antes de guardar

---

### HU-05 · Ver historial de consumos HECHO

**Como** usuario,  
**Quiero** ver un listado de todos mis consumos anteriores,  
**Para** analizar mis hábitos de consumo y detectar patrones.

**Criterios de aceptación:**
- Mostrar una tabla con: fecha, categoría, cantidad, unidad, CO₂ generado y notas
- Poder filtrar por categoría (todas, agua, electricidad, gas)
- Poder filtrar por rango de fechas
- Ordenar por fecha (más reciente primero por defecto)
- Implementar paginación si hay más de 20 registros
- Mostrar el total de CO₂ de los consumos mostrados
- Incluir botones para editar o eliminar cada consumo

**Notas técnicas:**
- Consultar la tabla CONSUMO filtrando por id_usuario
- Usar LIMIT y OFFSET para la paginación
- Añadir índices en fecha e id_usuario para optimizar

---

### HU-06 · Recuperar contraseña HECHO

**Como** usuario que ha olvidado su contraseña,  
**Quiero** poder recuperar el acceso a mi cuenta,  
**Para** no perder todos mis datos registrados.

**Criterios de aceptación:**
- Incluir un enlace "¿Olvidaste tu contraseña?" en el login
- Formulario para introducir el email
- Enviar un correo con un enlace temporal de recuperación
- El enlace debe caducar en 1 hora
- Permitir establecer una nueva contraseña
- La nueva contraseña debe estar cifrada
- Después de cambiarla, redirigir al login con mensaje de confirmación

**Notas técnicas:**
- Generar un token único y guardarlo temporalmente
- Usar PHPMailer o similar para enviar el email
- Verificar que el token sea válido y no haya caducado

---

## 3. Historias de usuario — Prioridad media

Estas funcionalidades son importantes pero no críticas. Las haremos después de tener lo básico funcionando.

---

### HU-07 · Crear objetivos de reducción PENDIENTE

**Como** usuario consciente del medio ambiente,  
**Quiero** establecer objetivos de reducción de CO₂,  
**Para** motivarme a reducir mi consumo energético.

**Criterios de aceptación:**
- Formulario con: meta de CO₂ (kg), fecha inicio, fecha fin y descripción opcional
- La fecha de fin debe ser posterior a la de inicio
- La meta debe ser un número positivo
- Poder crear múltiples objetivos (uno por mes, por ejemplo)
- Mostrar si el objetivo está en curso, cumplido o no cumplido
- Calcular el porcentaje de progreso automáticamente

**Notas técnicas:**
- Insertar en la tabla OBJETIVO
- Comparar el total_co2 de ESTADISTICA con la meta_co2 del objetivo
- Actualizar el campo completado cuando se cumpla

---

### HU-08 · Ver progreso de objetivos PENDIENTE

**Como** usuario con objetivos activos,  
**Quiero** ver mi progreso en tiempo real,  
**Para** saber si voy por buen camino o necesito reducir más mi consumo.

**Criterios de aceptación:**
- Mostrar todos los objetivos del usuario
- Incluir una barra de progreso visual para cada objetivo
- Mostrar: CO₂ actual / CO₂ meta
- Indicar días restantes para cumplir el objetivo
- Usar colores: verde si va bien, amarillo si está ajustado, rojo si se pasó
- Permitir eliminar objetivos ya cumplidos o cancelados

**Notas técnicas:**
- Obtener datos de OBJETIVO y cruzarlos con ESTADISTICA
- Calcular porcentaje = (co2_actual / meta_co2) × 100
- Actualizar el estado cada vez que se registre un consumo nuevo

---

### HU-09 · Exportar datos a CSV PENDIENTE

**Como** usuario que quiere analizar sus datos externamente,  
**Quiero** descargar mis consumos en formato CSV,  
**Para** poder abrirlos en Excel u otras herramientas.

**Criterios de aceptación:**
- Botón "Exportar a CSV" en el historial
- El archivo debe incluir: fecha, categoría, cantidad, unidad, CO₂, notas
- Nombre del archivo: ecotrack_consumos_YYYY-MM-DD.csv
- Incluir cabeceras descriptivas
- Poder exportar todos los datos o aplicar los filtros actuales
- La descarga debe iniciar automáticamente

**Notas técnicas:**
- Generar el CSV dinámicamente en PHP
- Usar headers correctos para forzar la descarga
- Codificación UTF-8 para que funcionen las tildes

---

### HU-10 · Generar informe PDF PENDIENTE

**Como** usuario que necesita documentación formal,  
**Quiero** generar un informe en PDF de mis consumos,  
**Para** presentarlo o archivarlo fuera de la aplicación.

**Criterios de aceptación:**
- Botón "Generar informe PDF"
- El PDF debe incluir: resumen mensual, gráficos, tabla de consumos
- Diseño profesional y legible
- Incluir fecha de generación y nombre del usuario
- Poder elegir el período del informe (mes actual, último trimestre, etc.)

**Notas técnicas:**
- Usar librería TCPDF o similar
- Generar gráficos como imágenes y incluirlas en el PDF
- Optimizar para que no sea muy pesado

---

### HU-11 · Editar perfil de usuario HECHO

**Como** usuario,  
**Quiero** actualizar mis datos personales,  
**Para** mantener mi información actualizada.

**Criterios de aceptación:**
- Poder editar: nombre, teléfono y email
- No permitir cambiar el nombre_usuario (es único e identificador)
- Validar que el nuevo email no esté en uso por otro usuario
- Poder cambiar la contraseña (pidiendo la actual primero)
- Mostrar mensaje de confirmación al guardar
- Si hay errores de validación, no guardar nada

**Notas técnicas:**
- Actualizar la tabla USUARIO
- Verificar password_verify antes de cambiar contraseña
- Actualizar los datos en $_SESSION si se cambian

---

## 4. Historias de usuario — Prioridad baja

Estas son funcionalidades "nice to have" que haríamos si nos sobra tiempo o en versiones futuras.

---

### HU-12 · Comparación con promedio nacional PENDIENTE

**Como** usuario curioso,  
**Quiero** comparar mi consumo con el promedio de otros usuarios,  
**Para** saber si estoy por encima o por debajo de la media.

**Criterios de aceptación:**
- Mostrar el promedio general de la app
- Indicar si estoy por encima o debajo
- Mostrar un porcentaje de diferencia
- Incluir un mensaje motivador

---

### HU-13 · Notificaciones por email PENDIENTE

**Como** usuario comprometido,  
**Quiero** recibir notificaciones periódicas,  
**Para** mantenerme al día sin tener que entrar a la app constantemente.

**Criterios de aceptación:**
- Notificar cuando se cumple un objetivo
- Recordatorio semanal para registrar consumos
- Resumen mensual automático
- Poder desactivar las notificaciones desde el perfil

---

### HU-14 · Eliminar cuenta HECHO

**Como** usuario que ya no quiere usar la aplicación,  
**Quiero** borrar mi cuenta permanentemente,  
**Para** que mis datos no queden almacenados.

**Criterios de aceptación:**
- Opción en el perfil: "Eliminar mi cuenta"
- Pedir confirmación con contraseña
- Borrar todos los datos del usuario (consumos, estadísticas, objetivos)
- Cerrar la sesión automáticamente
- Mostrar mensaje de despedida

---

## 5. Requisitos no funcionales

Estos son requisitos técnicos y de calidad que debe cumplir toda la aplicación:

### Seguridad
- Todas las contraseñas cifradas con password_hash
- Validación de sesión en cada página protegida
- Protección contra SQL Injection (usando prepared statements)
- Protección contra XSS (sanitizar inputs)
- Tokens CSRF en formularios importantes

### Rendimiento
- Las páginas deben cargar en menos de 2 segundos
- Usar índices en las consultas más frecuentes
- Implementar paginación en listados largos
- Optimizar las consultas SQL (evitar N+1)

### Usabilidad
- Interfaz limpia y fácil de usar
- Mensajes de error claros y en español
- Navegación intuitiva
- Responsive design (que funcione en móvil)
- Accesibilidad básica (alt en imágenes, contraste adecuado)

### Mantenibilidad
- Código organizado con arquitectura MVC
- Nombres de variables y funciones descriptivos
- Comentarios en las partes más complejas
- Separación clara entre lógica, vista y datos

---

## 6. Glosario

Definiciones de términos importantes para entender el proyecto:

- **CO₂ generado:** Emisiones de dióxido de carbono calculadas según el factor de conversión de cada categoría de consumo.

- **Dashboard:** Página principal donde se muestra el resumen visual de todos los datos del usuario.

- **Objetivo:** Meta de reducción de emisiones que el usuario establece para un período determinado (normalmente un mes).

- **Huella de carbono:** Total de emisiones de CO₂ que genera una persona con sus actividades diarias.

- **Factor de CO₂:** Coeficiente de conversión que indica cuántos kg de CO₂ se generan por cada unidad consumida (kWh, m³, etc.).

- **Categoría:** Tipo de consumo energético: Agua, Electricidad o Gas.

- **Consumo:** Registro individual de gasto energético con su cantidad, fecha y notas.

- **Estadística:** Resumen agregado mensual del CO₂ total generado por un usuario.

- **Session:** Mecanismo de PHP para mantener al usuario identificado mientras navega por la aplicación.

---


*Este Product Backlog es un documento vivo que iremos actualizando conforme avance el desarrollo del proyecto*
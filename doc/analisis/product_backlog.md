# Product Backlog — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Noviembre 2025

---

## Índice
1. Introducción  
2. Historias de usuario — Prioridad alta  
3. Historias de usuario — Prioridad media  
4. Historias de usuario — Prioridad baja  
5. Requisitos no funcionales  
6. Glosario  

---

## 1. Introducción
Este documento recoge las funcionalidades de EcoTrack en forma de historias de usuario, con un lenguaje claro y sencillo. No se planifican sprints; solo se indican prioridades y criterios de aceptación.

---

## 2. Historias de usuario — Prioridad alta

### HU-01 · Registro de usuario
**Como** visitante, **quiero** crear una cuenta **para** acceder a la aplicación.  
**Criterios de aceptación:**
- Formulario con nombre, email y contraseña.
- No duplicar emails.
- Contraseña cifrada.
- Redirección al login tras registro.

---

### HU-02 · Inicio de sesión
**Como** usuario, **quiero** iniciar sesión **para** acceder a mis datos.  
**Criterios de aceptación:**
- Validación de email y contraseña.
- Crear sesión segura.
- Mensajes claros en caso de error.

---

### HU-03 · Dashboard
**Como** usuario, **quiero** ver un resumen de mi consumo **para** entender mi evolución.  
**Criterios de aceptación:**
- Total mensual de CO₂.
- Gráfico circular por categorías.
- Gráfico de línea de los últimos meses.

---

### HU-04 · Registrar consumo
**Como** usuario, **quiero** registrar consumos **para** controlar mis gastos.  
**Criterios de aceptación:**
- Cantidad, categoría, fecha y notas opcionales.
- CO₂ calculado automáticamente.
- El registro aparece en el historial.

---

### HU-05 · Ver historial
**Como** usuario, **quiero** ver mis consumos **para** analizar mis hábitos.  
**Criterios de aceptación:**
- Tabla con filtros y paginación.
- Ordenación por fecha o cantidad.

---

### HU-06 · Recuperar contraseña
**Como** usuario, **quiero** recuperar mi cuenta **para** no perder acceso.  
**Criterios de aceptación:**
- Enlace de recuperación.
- Email con enlace temporal.
- Cambio de contraseña seguro.

---

## 3. Historias de usuario — Prioridad media

### HU-07 · Crear objetivos
### HU-08 · Ver progreso
### HU-09 · Exportar CSV
### HU-10 · Informe PDF
### HU-11 · Editar perfil

(Detalles similares al grupo anterior para mantener claridad y coherencia).

---

## 4. Historias de usuario — Prioridad baja
- Comparación con promedio.
- Notificaciones por email.
- Borrar cuenta.

---

## 5. Requisitos no funcionales
- Accesibilidad.
- Seguridad básica.
- Buen rendimiento con índices y paginación.
- UI clara y humana.

---

## 6. Glosario
- **CO₂ generado**: emisiones según factor.  
- **Dashboard**: pantalla de resumen.  
- **Objetivo**: meta de reducción mensual.


# Arquitectura Tecnológica — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º DAW  
**Fecha:** Noviembre 2025

---

## Índice
1. Introducción  
2. Vista general  
3. Tecnologías  
4. Frontend  
5. Backend  
6. Base de datos  
7. Seguridad  
8. Flujo típico  

---

## 1. Introducción
Resumen claro de cómo se estructura EcoTrack usando Angular, PHP y MySQL.

---

## 2. Vista general
```
Angular (SPA) ⇄ PHP API (JSON) ⇄ MySQL (InnoDB)
```

---

## 3. Tecnologías
- Angular  
- PHP 8 + Apache  
- MySQL  
- FPDF  
- PHPMailer  

---

## 4. Frontend
SPA en Angular con módulos por pantallas: auth, dashboard, consumos, objetivos y perfil.

---

## 5. Backend
API REST sencilla en PHP usando controladores, modelos y respuestas JSON.

---

## 6. Base de datos
Tablas: USUARIO, CATEGORIA, CONSUMO, ESTADISTICA, OBJETIVO.

---

## 7. Seguridad
- Contraseñas cifradas.  
- Validación doble.  
- Cookies HttpOnly.  

---

## 8. Flujo típico
1. El usuario envía formulario.  
2. Angular valida.  
3. PHP valida y calcula.  
4. Respuesta JSON.  


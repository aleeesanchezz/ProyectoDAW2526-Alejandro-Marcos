# Sprint 3 - Desarrollo
## EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 27 de Enero de 2026  
**Sprint:** 3


## 1. Introducción

Este documento describe el trabajo realizado durante el **tercer sprint** de desarrollo de EcoTrack. En esta púltimo sprint hemos terminado todos los casos de uso restantes

Estos son los casos de uso que nos faltaban por desarrollar:

- **HU-01: Validar código de verificación por correo electrónico**
  - Descripción: Como usuario, quiero validar mi correo con un código para activar mi cuenta.
  - Características: Introducción del código, reenvío del código, expiración básica.

  **HU-02: Editar usuario**
  - Descripción: Como usuario, quiero actualizar mis datos de perfil.
  - Características: Edición de nombre y preferencias, validación mínima, confirmación de guardado.

- **HU-03: Cerrar sesión**
  - Descripción: Como usuario, quiero cerrar sesión para proteger mi cuenta.
  - Características: Botón de salida, limpieza de sesión, redirección a inicio.

- **HU-04: Eliminar usuario**
  - Descripción: Como usuario, quiero borrar mi cuenta de forma definitiva.
  - Características: Confirmación previa, eliminación de datos personales, aviso de irreversibilidad.

- **HU-05: Cambiar contraseña**
  - Descripción: Como usuario, quiero actualizar mi contraseña por seguridad.
  - Características: Validación de fortaleza básica, confirmación de nueva contraseña, feedback de éxito.

- **HU-06: Registrar consumo**
  - Descripción: Como usuario, quiero registrar mis consumos para llevar control.
  - Características: Campos (tipo, cantidad, fecha), validaciones simples, confirmación de registro.

- **HU-07: Ver tabla de consumos**
  - Descripción: Como usuario, quiero visualizar mis consumos en una tabla.
  - Características: Listado con columnas básicas, filtros por fecha/categoría, paginación simple.

- **HU-8: Editar consumo**
  - Descripción: Como usuario, quiero modificar un consumo registrado.
  - Características: Edición de campos, validación mínima, confirmación de cambios.

- **HU-9: Eliminar consumo**
  - Descripción: Como usuario, quiero borrar un consumo.
  - Características: Confirmación previa, eliminación del registro, actualización del listado.

- **HU-10: Descargar PDF de consumos**
  - Descripción: Como usuario, quiero exportar mis consumos a PDF.
  - Características: Generación de PDF con tabla/resumen, selección de período, nombre de archivo estándar.

- **HU-11: Ver dashboard**
  - Descripción: Como usuario, quiero ver un panel con métricas y gráficos.
  - Características: KPIs básicos, gráficas de tendencia, actualización según filtros.

- **HU-12: Descargar imagen del dashboard**
  - Descripción: Como usuario, quiero guardar las gráficas como imagen.
  - Características: Exportar gráfico a PNG/JPEG, selector de gráfica, nombre de archivo simple.

- **HU-13: Registrar objetivo de reducción**
  - Descripción: Como usuario, quiero definir objetivos de reducción de consumo.
  - Características: Campos (métrica/porcentaje/fecha), validación básica, confirmación de creación.

- **HU-14: Ver lista de objetivos de reducción**
  - Descripción: Como usuario, quiero ver mis objetivos y su estado.
  - Características: Listado con metas y progreso, filtros simples, indicadores de estado.

- **HU-15: Eliminar objetivos de reducción**
  - Descripción: Como usuario, quiero borrar un objetivo que ya no necesito.
  - Características: Confirmación previa, eliminación del objetivo, actualización del listado.
# Product Backlog — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 18 de Noviembre de 2025  
**Versión:** 1.0

Este documento recoge todas las funcionalidades que queremos implementar en **EcoTrack** en forma de historias de usuario. Lo hemos escrito intentando que sea claro y fácil de entender, usando un lenguaje natural.

## Historias de Usuario

- **HU-01: Registrar usuario**
  - Descripción: Como visitante, quiero crear una cuenta para usar la aplicación.
  - Características: Campos básicos (nombre, email, contraseña), validación simple, confirmación de alta.

- **HU-02: Validar código de verificación por correo electrónico**
  - Descripción: Como usuario, quiero validar mi correo con un código para activar mi cuenta.
  - Características: Introducción del código, reenvío del código, expiración básica.

- **HU-03: Loguearse**
  - Descripción: Como usuario, quiero iniciar sesión para acceder a mis datos.
  - Características: Email y contraseña, mensajes de error claros, opción "recordarme".

- **HU-04: Editar usuario**
  - Descripción: Como usuario, quiero actualizar mis datos de perfil.
  - Características: Edición de nombre y preferencias, validación mínima, confirmación de guardado.

- **HU-05: Cerrar sesión**
  - Descripción: Como usuario, quiero cerrar sesión para proteger mi cuenta.
  - Características: Botón de salida, limpieza de sesión, redirección a inicio.

- **HU-06: Eliminar usuario**
  - Descripción: Como usuario, quiero borrar mi cuenta de forma definitiva.
  - Características: Confirmación previa, eliminación de datos personales, aviso de irreversibilidad.

- **HU-07: Cambiar contraseña**
  - Descripción: Como usuario, quiero actualizar mi contraseña por seguridad.
  - Características: Validación de fortaleza básica, confirmación de nueva contraseña, feedback de éxito.

- **HU-08: Registrar consumo**
  - Descripción: Como usuario, quiero registrar mis consumos para llevar control.
  - Características: Campos (tipo, cantidad, fecha), validaciones simples, confirmación de registro.

- **HU-09: Ver tabla de consumos**
  - Descripción: Como usuario, quiero visualizar mis consumos en una tabla.
  - Características: Listado con columnas básicas, filtros por fecha/categoría, paginación simple.

- **HU-10: Editar consumo**
  - Descripción: Como usuario, quiero modificar un consumo registrado.
  - Características: Edición de campos, validación mínima, confirmación de cambios.

- **HU-11: Eliminar consumo**
  - Descripción: Como usuario, quiero borrar un consumo.
  - Características: Confirmación previa, eliminación del registro, actualización del listado.

- **HU-12: Descargar PDF de consumos**
  - Descripción: Como usuario, quiero exportar mis consumos a PDF.
  - Características: Generación de PDF con tabla/resumen, selección de período, nombre de archivo estándar.

- **HU-13: Ver dashboard**
  - Descripción: Como usuario, quiero ver un panel con métricas y gráficos.
  - Características: KPIs básicos, gráficas de tendencia, actualización según filtros.

- **HU-14: Descargar imagen del dashboard**
  - Descripción: Como usuario, quiero guardar las gráficas como imagen.
  - Características: Exportar gráfico a PNG/JPEG, selector de gráfica, nombre de archivo simple.

- **HU-15: Registrar objetivo de reducción**
  - Descripción: Como usuario, quiero definir objetivos de reducción de consumo.
  - Características: Campos (métrica/porcentaje/fecha), validación básica, confirmación de creación.

- **HU-16: Ver lista de objetivos de reducción**
  - Descripción: Como usuario, quiero ver mis objetivos y su estado.
  - Características: Listado con metas y progreso, filtros simples, indicadores de estado.

- **HU-17: Eliminar objetivos de reducción**
  - Descripción: Como usuario, quiero borrar un objetivo que ya no necesito.
  - Características: Confirmación previa, eliminación del objetivo, actualización del listado.

- **HU-18: Ordenar ascendentemente los consumos**
  - Descripción: Como usuario, quiero ordenar mis consumos de forma ascendente para visualizarlos mejor.
  - Características: Ordenación por diferentes campos (fecha, cantidad, CO2), actualización de la tabla.

- **HU-19: Ordenar descendentemente los consumos**
  - Descripción: Como usuario, quiero ordenar mis consumos de forma descendente para ver los más recientes primero.
  - Características: Ordenación inversa por diferentes campos, actualización de la tabla.

- **HU-20: Filtrar consumos**
  - Descripción: Como usuario, quiero filtrar mis consumos por diferentes criterios.
  - Características: Filtros por categoría, rango de fechas, cantidad, actualización dinámica.

- **HU-21: Ordenar ascendentemente los objetivos**
  - Descripción: Como usuario, quiero ordenar mis objetivos de forma ascendente.
  - Características: Ordenación por fecha de inicio, fecha fin, estado, actualización de la lista.

- **HU-22: Ordenar descendentemente los objetivos**
  - Descripción: Como usuario, quiero ordenar mis objetivos de forma descendente.
  - Características: Ordenación inversa por diferentes campos, actualización de la lista.

- **HU-23: Filtrar los objetivos**
  - Descripción: Como usuario, quiero filtrar mis objetivos según diferentes criterios.
  - Características: Filtros por estado, rango de fechas, meta CO2, actualización dinámica.

- **HU-24: Añadir notas**
  - Descripción: Como usuario, quiero crear notas para recordar información importante.
  - Características: Campos (título, contenido, color), validación básica, confirmación de creación.

- **HU-25: Ver notas**
  - Descripción: Como usuario, quiero visualizar todas mis notas.
  - Características: Listado de notas, visualización de título y contenido, indicador de fecha.

- **HU-26: Modificar notas**
  - Descripción: Como usuario, quiero editar mis notas existentes.
  - Características: Edición de título, contenido y color, validación, confirmación de cambios.

- **HU-27: Eliminar notas**
  - Descripción: Como usuario, quiero borrar notas que ya no necesito.
  - Características: Confirmación previa, eliminación del registro, actualización del listado.

- **HU-28: Ordenar ascendentemente las notas**
  - Descripción: Como usuario, quiero ordenar mis notas de forma ascendente.
  - Características: Ordenación por fecha, título, actualización de la lista.

- **HU-29: Ordenar descendentemente las notas**
  - Descripción: Como usuario, quiero ordenar mis notas de forma descendente.
  - Características: Ordenación inversa por fecha o título, actualización de la lista.

- **HU-30: Filtrar las notas**
  - Descripción: Como usuario, quiero filtrar mis notas según diferentes criterios.
  - Características: Filtros por fecha, color, palabra clave en título/contenido, actualización dinámica.

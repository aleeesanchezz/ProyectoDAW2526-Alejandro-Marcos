# Guía de Estilos
## EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** 18 de Noviembre de 2025

---

## Índice

1. [Introducción](#1-introducción)
2. [Colores](#2-colores)
3. [Tipografía](#3-tipografía)
4. [Botones](#4-botones)
5. [Formularios](#5-formularios)
6. [Tarjetas](#6-tarjetas)
7. [Tablas](#7-tablas)
8. [Iconos](#8-iconos)
9. [Espaciado](#9-espaciado)
10. [Responsive](#10-responsive)
11. [Mensajes](#11-mensajes)
12. [Gráficos](#12-gráficos)

---

## 1. Introducción

Esta es nuestra guía visual para EcoTrack. Define los colores, tipografías y estilos que usamos en toda la app para mantener la coherencia.

Queremos transmitir sostenibilidad, por eso usamos principalmente verdes y azules.

---

## 2. Colores

### Color Principal - Verde

**Verde Principal:** `#4CAF50` - Botones, encabezados, enlaces  
**Verde Oscuro:** `#388E3C` - Hover de botones  
**Verde Claro:** `#81C784` - Fondos suaves

### Colores por Categoría

**Agua:** `#2196F3` (Azul)  
**Electricidad:** `#FFC107` (Amarillo)  
**Gas:** `#FF5722` (Rojo-Naranja)

### Colores de Estado

**Éxito:** `#4CAF50` (Verde)  
**Error:** `#F44336` (Rojo)  
**Advertencia:** `#FFC107` (Amarillo)  
**Información:** `#2196F3` (Azul)

### Colores Neutros

**Texto Principal:** `#212121` (Gris Oscuro)  
**Texto Secundario:** `#757575` (Gris Medio)  
**Bordes:** `#E0E0E0` (Gris Claro)  
**Fondos:** `#F5F5F5` (Gris Muy Claro)  
**Blanco:** `#FFFFFF`

---

## 3. Tipografía

### Fuente
Usamos **Roboto** porque es gratis, moderna y legible.

### Tamaños

**H1:** `32px` / Bold - Títulos principales  
**H2:** `24px` / Medium - Subtítulos  
**H3:** `20px` / Medium - Títulos de tarjetas  
**Texto normal:** `16px` / Regular  
**Texto pequeño:** `14px` / Regular  
**Texto muy pequeño:** `12px` / Regular

### Interlineado

**Títulos:** `1.2`  
**Texto normal:** `1.5`  
**Listas:** `1.6`

---

## 4. Botones

### Botón Principal
- Fondo: Verde `#4CAF50`
- Texto: Blanco
- Altura: `40px`
- Padding: `12px 24px`
- Bordes redondeados: `4px`
- Hover: Verde Oscuro `#388E3C`
- Uso: Guardar, Enviar, Registrar

### Botón Secundario
- Borde: `1px` verde `#4CAF50`
- Texto: Verde `#4CAF50`
- Fondo: Transparente
- Mismo tamaño que el principal
- Hover: Fondo verde claro
- Uso: Cancelar, Volver, Limpiar

### Botón de Peligro
- Fondo: Rojo `#F44336`
- Texto: Blanco
- Uso: Eliminar, Borrar

---

## 5. Formularios

### Inputs
- Altura: `40px`
- Padding: `10px`
- Borde: `1px sólido #E0E0E0`
- Bordes redondeados: `4px`
- Focus: Borde verde `#4CAF50` de `2px`
- Error: Borde rojo `#F44336` de `2px`

### Labels
- Tamaño: `14px`
- Color: Gris medio `#757575`
- Peso: Medium
- Margen inferior: `8px`

### Select y Textarea
Mismo estilo que los inputs. Textarea con altura mínima de `80px`.

---

## 6. Tarjetas

- Fondo: Blanco
- Borde: `1px sólido #E0E0E0` (opcional)
- Bordes redondeados: `8px`
- Padding: `20px`
- Sombra: `0 2px 4px rgba(0,0,0,0.1)`
- Hover: Sombra más marcada

---

## 7. Tablas

**Encabezado:**
- Fondo: `#F5F5F5`
- Texto: `#212121` / Bold
- Padding: `12px`

**Filas:**
- Fondo: Blanco
- Padding: `12px`
- Borde inferior: `1px sólido #E0E0E0`
- Hover: Fondo `#FAFAFA`

---

## 8. Iconos

Usaremos **Material Icons**.

**Tamaños:** 16px / 24px / 32px

**Colores:**
- Acción: Verde `#4CAF50`
- Error: Rojo `#F44336`
- Información: Azul `#2196F3`
- Neutros: Gris `#757575`

---

## 9. Espaciado

Usamos múltiplos de 8px:

`4px` / `8px` / `16px` / `24px` / `32px` / `48px`

---

## 10. Responsive

### Breakpoints
- **Móvil:** hasta `768px`
- **Tablet:** `768px - 992px`
- **Desktop:** más de `992px`

### Adaptaciones

**Móvil:**
- Menú hamburguesa
- Una columna
- Botones más grandes (44px mínimo)

**Tablet:**
- Dos columnas
- Menú colapsable

**Desktop:**
- Tres columnas
- Menú lateral fijo
- Máximo ancho: `1200px`

---

## 11. Mensajes

### Éxito
- Fondo: Verde claro `#C8E6C9`
- Borde izquierdo: Verde oscuro `#388E3C` (4px)
- Padding: `16px`

### Error
- Fondo: Rojo claro `#FFCDD2`
- Borde izquierdo: Rojo oscuro `#C62828` (4px)
- Padding: `16px`

### Advertencia
- Fondo: Amarillo claro `#FFF9C4`
- Borde izquierdo: Amarillo oscuro `#F57F17` (4px)

### Información
- Fondo: Azul claro `#BBDEFB`
- Borde izquierdo: Azul oscuro `#1976D2` (4px)

---

## 12. Gráficos

Usamos **Chart.js**.

**Gráfico Circular:**
- Agua: `#2196F3`
- Electricidad: `#FFC107`
- Gas: `#FF5722`

**Gráfico de Líneas:**
- Línea: Verde `#4CAF50`
- Área: Verde claro con transparencia

---

## Animaciones

**Transiciones:**
- Hover botones: `0.3s`
- Cambios de color: `0.2s`
- Modales: `0.3s`

Todo con timing `ease` y sutiles.

---

## Accesibilidad

- Contraste mínimo: 4.5:1 para texto normal
- Focus visible con borde verde
- Botones mínimo 44x44px
- Textos alternativos en imágenes

---
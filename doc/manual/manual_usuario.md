# Manual de Usuario — EcoTrack

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** Enero 2026  
**Versión:** 1.0

---

## Índice
1. [Introducción](#1-introducción)
2. [Primeros Pasos](#2-primeros-pasos)
3. [Gestión de Cuenta](#3-gestión-de-cuenta)
4. [Registro de Consumos](#4-registro-de-consumos)
5. [Visualización y Análisis](#5-visualización-y-análisis)
6. [Objetivos de Reducción](#6-objetivos-de-reducción)
7. [Configuración de Perfil](#7-configuración-de-perfil)
8. [Preguntas Frecuentes](#8-preguntas-frecuentes)

---

## 1. Introducción

### ¿Qué es EcoTrack?

**EcoTrack** es una aplicación web diseñada para ayudarte a llevar un control detallado de tu consumo energético y calcular tu huella de carbono. Con EcoTrack puedes:

- Registrar tus consumos de agua, electricidad y gas
- Visualizar gráficos y estadísticas de tu consumo
- Establecer objetivos de reducción de emisiones de CO₂
- Descargar reportes en PDF de tus consumos
- Analizar tendencias y patrones en tu consumo energético

### Acceso a la Aplicación

Para acceder a EcoTrack, abre tu navegador web y dirígete a:
- **Desarrollo local:** http://localhost
- **Servidor de producción:** https://ecotrack-pi.duckdns.org

---

## 2. Primeros Pasos

### 2.1 Crear una Cuenta

1. En la página de inicio, haz clic en el botón **"Registrarse"**
2. Completa el formulario con los siguientes datos:
   - **Nombre completo:** Tu nombre y apellidos
   - **Nombre de usuario:** Un nombre único para identificarte
   - **Correo electrónico:** Tu email (será usado para verificación y recuperación)
   - **Contraseña:** Una contraseña segura (mínimo 8 caracteres)
   - **Confirmar contraseña:** Repite la contraseña
3. Haz clic en **"Registrar"**
4. Recibirás un mensaje de confirmación

### 2.2 Verificar tu Correo Electrónico

1. Revisa tu bandeja de entrada (y spam si no lo encuentras)
2. Busca el email de EcoTrack con el código de verificación
3. Copia el código de 6 dígitos
4. En la página de verificación, introduce el código
5. Haz clic en **"Verificar"**
6. Tu cuenta quedará activada

**Nota:** El código expira en 15 minutos. Si no lo introduces a tiempo, puedes solicitar un nuevo código.

### 2.3 Iniciar Sesión

1. En la página principal, introduce tu **nombre de usuario** y **contraseña**
2. Haz clic en **"Iniciar Sesión"**
3. Serás redirigido a tu dashboard personal

### 2.4 Recuperar Contraseña Olvidada

Si olvidaste tu contraseña:

1. En la página de login, haz clic en **"¿Olvidaste tu contraseña?"**
2. Introduce tu **correo electrónico** registrado
3. Haz clic en **"Enviar código"**
4. Recibirás un email con un código de recuperación
5. Introduce el código en la página de verificación
6. Establece tu nueva contraseña
7. Confirma la nueva contraseña
8. Haz clic en **"Cambiar contraseña"**
9. Ahora puedes iniciar sesión con tu nueva contraseña

---

## 3. Gestión de Cuenta

### 3.1 Ver tu Perfil

1. Haz clic en el **icono de usuario** en la barra de navegación superior
2. Selecciona **"Mi Perfil"** o **"Menú Usuario"**
3. Verás tu información personal:
   - Nombre completo
   - Nombre de usuario
   - Correo electrónico
   - Fecha de registro

### 3.2 Editar tu Perfil

1. En el menú de usuario, haz clic en **"Editar Perfil"**
2. Modifica los campos que desees:
   - Nombre completo
   - Correo electrónico
3. Haz clic en **"Guardar Cambios"**
4. Recibirás una confirmación de que los datos se actualizaron

**Nota:** El nombre de usuario no se puede cambiar una vez creada la cuenta.

### 3.3 Cambiar Contraseña

1. En el menú de usuario, selecciona **"Cambiar Contraseña"**
2. Introduce tu **contraseña actual**
3. Introduce tu **nueva contraseña**
4. Confirma la **nueva contraseña**
5. Haz clic en **"Cambiar Contraseña"**
6. La contraseña se actualizará inmediatamente

**Recomendaciones para una contraseña segura:**
- Mínimo 8 caracteres
- Combina letras mayúsculas y minúsculas
- Incluye números
- Incluye caracteres especiales (@, #, $, etc.)

### 3.4 Cerrar Sesión

1. Haz clic en el **icono de usuario** en la barra superior
2. Selecciona **"Cerrar Sesión"**
3. Serás redirigido a la página de login

### 3.5 Eliminar tu Cuenta

Si deseas borrar permanentemente tu cuenta:

1. Ve al **Menú de Usuario**
2. Haz clic en **"Eliminar Cuenta"**
3. Lee el aviso sobre la eliminación permanente
4. Introduce tu **contraseña** para confirmar
5. Haz clic en **"Eliminar Cuenta Permanentemente"**

**⚠️ ADVERTENCIA:** Esta acción es irreversible. Se borrarán:
- Tu perfil de usuario
- Todos tus consumos registrados
- Todas tus estadísticas
- Todos tus objetivos

---

## 4. Registro de Consumos

### 4.1 Registrar un Nuevo Consumo

1. En el menú principal, haz clic en **"Registrar Consumo"**
2. Completa el formulario con los siguientes datos:
   - **Categoría:** Selecciona entre Agua, Electricidad o Gas
   - **Cantidad:** Introduce el valor numérico del consumo
   - **Unidad:** Se selecciona automáticamente según la categoría
     - Agua: m³ (metros cúbicos)
     - Electricidad: kWh (kilovatios hora)
     - Gas: m³ (metros cúbicos)
   - **Fecha:** Selecciona la fecha del consumo (no puede ser futura)
   - **Notas:** (Opcional) Agrega comentarios o detalles adicionales
3. Haz clic en **"Registrar Consumo"**
4. El sistema calculará automáticamente el CO₂ generado
5. Recibirás una confirmación y el consumo aparecerá en tu historial

**Factores de CO₂ utilizados:**
- Electricidad: 0.385 kg CO₂/kWh
- Gas Natural: 2.03 kg CO₂/m³
- Agua: 0.149 kg CO₂/m³

### 4.2 Ver Historial de Consumos

1. En el menú, selecciona **"Historial de Consumos"** o **"Ver Tabla de Consumos"**
2. Verás una tabla con todos tus consumos que incluye:
   - Fecha del consumo
   - Categoría (Agua, Electricidad, Gas)
   - Cantidad consumida
   - Unidad de medida
   - CO₂ generado (kg)
   - Notas (si las hay)
   - Acciones (editar/eliminar)

### 4.3 Filtrar Consumos

Puedes filtrar los consumos mostrados:

1. **Por categoría:**
   - Selecciona "Todas", "Agua", "Electricidad" o "Gas" en el menú desplegable
   
2. **Por rango de fechas:**
   - Introduce la fecha de inicio
   - Introduce la fecha de fin
   - Haz clic en **"Filtrar"**

3. **Restablecer filtros:**
   - Haz clic en **"Mostrar Todos"** o **"Limpiar Filtros"**

### 4.4 Editar un Consumo

1. En el historial, localiza el consumo que deseas modificar
2. Haz clic en el botón **"Editar"** (icono de lápiz)
3. Se abrirá el formulario de edición con los datos actuales
4. Modifica los campos necesarios
5. Haz clic en **"Guardar Cambios"**
6. El consumo se actualizará y el CO₂ se recalculará automáticamente

### 4.5 Eliminar un Consumo

1. En el historial, localiza el consumo que deseas borrar
2. Haz clic en el botón **"Eliminar"** (icono de papelera)
3. Confirma la eliminación en el diálogo que aparece
4. El consumo se eliminará permanentemente

**Nota:** Esta acción no se puede deshacer.

### 4.6 Descargar PDF de Consumos

1. En el historial de consumos, aplica los filtros deseados (opcional)
2. Haz clic en el botón **"Descargar PDF"** o **"Exportar a PDF"**
3. El navegador descargará automáticamente un archivo PDF
4. El PDF incluirá:
   - Resumen de consumos del período seleccionado
   - Tabla detallada de todos los consumos
   - Total de CO₂ generado
   - Gráficos (si están disponibles)

El archivo se descargará como: `ecotrack_consumos_YYYY-MM-DD.pdf`

---

## 5. Visualización y Análisis

### 5.1 Dashboard Principal

El dashboard es tu página de inicio después de iniciar sesión. Muestra:

1. **Resumen mensual:**
   - Total de CO₂ del mes actual
   - Número de consumos registrados
   - Comparación con el mes anterior

2. **Gráfico circular (Donut):**
   - Distribución porcentual de CO₂ por categoría
   - Colores diferenciados: Agua (azul), Electricidad (amarillo), Gas (naranja)

3. **Gráfico de líneas:**
   - Evolución del CO₂ en los últimos 6 meses
   - Tendencia de consumo

4. **Tarjetas de métricas:**
   - CO₂ total del mes
   - Promedio diario
   - Categoría con mayor consumo

### 5.2 Interpretar los Gráficos

**Gráfico Circular:**
- Muestra qué porcentaje de tu huella de carbono proviene de cada categoría
- Te ayuda a identificar dónde enfocarte para reducir emisiones
- Ejemplo: Si el 60% es electricidad, deberías centrarte en reducir ese consumo

**Gráfico de Evolución:**
- Muestra la tendencia de tu consumo a lo largo del tiempo
- Una línea descendente indica mejora (reducción de emisiones)
- Una línea ascendente indica aumento en el consumo
- Picos puntuales pueden deberse a situaciones excepcionales

### 5.3 Descargar Imagen del Dashboard

1. En la vista del dashboard, localiza el gráfico que deseas guardar
2. Haz clic en el botón **"Descargar Imagen"** o icono de cámara
3. Selecciona el formato deseado (PNG o JPEG)
4. La imagen se descargará automáticamente

**Usos recomendados:**
- Compartir tu progreso en redes sociales
- Incluir en presentaciones o informes
- Guardar como registro histórico

---

## 6. Objetivos de Reducción

### 6.1 ¿Qué son los Objetivos de Reducción?

Los objetivos de reducción te permiten establecer metas personales para disminuir tu huella de carbono en un período determinado. Por ejemplo:
- Reducir 20% las emisiones de electricidad este mes
- Mantener el consumo de agua por debajo de 50 kg CO₂ mensual

### 6.2 Crear un Objetivo de Reducción

1. En el menú, selecciona **"Registrar Objetivo"** o **"Crear Objetivo"**
2. Completa el formulario:
   - **Nombre/Descripción:** Título descriptivo (ej: "Reducir electricidad enero")
   - **Categoría:** Agua, Electricidad, Gas o Todas
   - **Meta de CO₂:** Cantidad máxima de CO₂ permitida (en kg)
   - **Fecha de inicio:** Cuándo comienza el objetivo
   - **Fecha de fin:** Cuándo termina el objetivo
   - **Notas:** (Opcional) Estrategias o recordatorios
3. Haz clic en **"Crear Objetivo"**
4. El objetivo aparecerá en tu lista de objetivos

**Ejemplo práctico:**
- Nombre: "Mes sostenible - Enero 2026"
- Categoría: Todas
- Meta: 100 kg CO₂
- Inicio: 01/01/2026
- Fin: 31/01/2026

### 6.3 Ver Lista de Objetivos

1. En el menú, selecciona **"Mis Objetivos"** o **"Lista de Objetivos"**
2. Verás todos tus objetivos con:
   - Nombre del objetivo
   - Categoría
   - Meta de CO₂
   - CO₂ actual consumido
   - Progreso (barra visual)
   - Estado: En curso / Cumplido / No cumplido
   - Días restantes

### 6.4 Interpretar el Progreso

**Barra de progreso:**
- **Verde:** Vas bien encaminado (< 70% de la meta)
- **Amarillo:** Estás cerca del límite (70-90% de la meta)
- **Rojo:** Has superado la meta (> 100%)

**Estados:**
- **En curso:** El objetivo está activo y aún no ha terminado
- **Cumplido:** Llegaste a la fecha fin sin superar la meta ✅
- **No cumplido:** Superaste la meta antes de la fecha fin ❌

### 6.5 Eliminar un Objetivo

1. En la lista de objetivos, localiza el que deseas eliminar
2. Haz clic en el botón **"Eliminar"** (icono de papelera)
3. Confirma la eliminación
4. El objetivo se borrará permanentemente

**Nota:** Eliminar un objetivo no afecta a tus consumos registrados.

---

## 7. Configuración de Perfil

### 7.1 Notificaciones por Email

EcoTrack envía notificaciones por email para:
- Verificación de cuenta
- Recuperación de contraseña
- Alertas de objetivos (si está configurado)
- Resúmenes mensuales (si está habilitado)

### 7.2 Preferencias de Visualización

Algunas versiones de EcoTrack permiten personalizar:
- Tema claro / oscuro
- Idioma de la interfaz
- Formato de fecha
- Unidades de medida

*(Verifica en tu instalación qué opciones están disponibles)*

---

## 8. Preguntas Frecuentes

### ¿Cómo se calculan las emisiones de CO₂?

EcoTrack utiliza factores de emisión estándar:
- **Electricidad:** 0.385 kg CO₂ por cada kWh consumido
- **Gas natural:** 2.03 kg CO₂ por cada m³ consumido
- **Agua:** 0.149 kg CO₂ por cada m³ consumido (incluye tratamiento y distribución)

**Fórmula:** `CO₂ (kg) = Cantidad consumida × Factor de emisión`

### ¿Puedo modificar un consumo ya registrado?

Sí, puedes editar cualquier consumo desde el historial. El CO₂ se recalculará automáticamente.

### ¿Qué pasa si supero un objetivo?

El objetivo se marcará como "No cumplido" y la barra de progreso se mostrará en rojo. Esto es solo informativo; no hay penalizaciones.

### ¿Los datos son privados?

Sí, todos tus datos son privados. Solo tú puedes ver tus consumos, estadísticas y objetivos. EcoTrack no comparte información con terceros.

### ¿Puedo usar EcoTrack en mi móvil?

Sí, EcoTrack es responsive y se adapta a dispositivos móviles. Puedes acceder desde cualquier navegador web moderno.

### ¿Cómo puedo mejorar mi huella de carbono?

**Consejos prácticos:**

1. **Electricidad:**
   - Apaga luces y dispositivos cuando no los uses
   - Usa electrodomésticos eficientes (clase A+++)
   - Aprovecha la luz natural
   - Regula la temperatura del aire acondicionado/calefacción

2. **Gas:**
   - Mantén la caldera en buen estado
   - Aísla ventanas y puertas
   - Usa programadores para la calefacción
   - Cocina con tapa para reducir tiempo

3. **Agua:**
   - Repara fugas inmediatamente
   - Usa reductores de caudal en grifos
   - Duchas cortas en lugar de baños
   - Lavadora y lavavajillas solo con carga completa

### ¿Puedo exportar todos mis datos?

Sí, puedes descargar tus consumos en formato PDF desde el historial. Esto incluye toda la información registrada en el período seleccionado.

### ¿Qué navegadores son compatibles?

EcoTrack funciona en:
- Google Chrome (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

**Versiones mínimas:** Las versiones más recientes o de hace máximo 2 años.

### ¿Necesito conexión a internet?

Sí, EcoTrack es una aplicación web que requiere conexión a internet para funcionar.

### ¿Hay límite de consumos que puedo registrar?

No hay límite. Puedes registrar tantos consumos como necesites.

### ¿Qué hago si encuentro un error?

Si encuentras algún problema:
1. Actualiza la página (F5)
2. Cierra sesión e inicia sesión nuevamente
3. Limpia la caché del navegador
4. Contacta al soporte técnico o administrador del sistema

---

## Soporte y Contacto

Si necesitas ayuda adicional o tienes sugerencias para mejorar EcoTrack, contacta con:

- **Email de soporte:** ecotrackiescastelar@gmail.com
- **Desarrolladores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano

---

## Glosario

- **CO₂:** Dióxido de carbono, principal gas de efecto invernadero
- **Huella de carbono:** Total de emisiones de CO₂ generadas por tus actividades
- **kWh:** Kilovatio hora, unidad de energía eléctrica
- **m³:** Metro cúbico, unidad de volumen
- **Dashboard:** Panel de control con resumen visual de datos
- **Objetivo de reducción:** Meta personal para disminuir emisiones
- **Factor de emisión:** Coeficiente que convierte consumo en kg de CO₂


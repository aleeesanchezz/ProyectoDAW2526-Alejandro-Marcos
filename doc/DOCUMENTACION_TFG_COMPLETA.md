# DOCUMENTACIÓN COMPLETA DEL PROYECTO ECOTRACK - TFG

**Autores:** Alejandro Sánchez Olivera, Marcos Blasco Serrano  
**Curso:** 2º Desarrollo de Aplicaciones Web  
**Fecha:** Noviembre 2025  
**Versión:** 1.0 - Documentación para Defensa del TFG  

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Requisitos Funcionales](#requisitos-funcionales)
4. [Arquitectura General](#arquitectura-general)
5. [Base de Datos](#base-de-datos)
6. [Backend - Spring Boot](#backend---spring-boot)
7. [Frontend - Angular](#frontend---angular)
8. [Flujos y Rutas](#flujos-y-rutas)
9. [Seguridad y Autenticación](#seguridad-y-autenticación)
10. [Despliegue con Docker](#despliegue-con-docker)
11. [Glosario Técnico](#glosario-técnico)

---

## 1. RESUMEN EJECUTIVO

### ¿Qué es EcoTrack?

EcoTrack es una **aplicación web para gestión de consumos energéticos y cálculo de huella de carbono**. Permite a los usuarios registrar sus consumos de agua, luz y gas, calcular automáticamente el CO₂ generado, visualizar estadísticas mensuales y establecer objetivos de reducción.

### Objetivos del Proyecto

- ✅ Facilitar el registro y seguimiento de consumos energéticos
- ✅ Calcular automáticamente la huella de carbono
- ✅ Mostrar visualizaciones gráficas de datos
- ✅ Permitir establecer y monitorear objetivos de reducción
- ✅ Ser escalable y seguro en producción
- ✅ Ser amigable e intuitivo para el usuario final

### Tecnologías Principales

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Angular 16 + TypeScript + Chart.js |
| **Backend** | Spring Boot 3.3.5 + Java 21 + JPA |
| **Base de Datos** | MySQL 8.0 + InnoDB |
| **Despliegue** | Docker + Docker Compose + Caddy |
| **Proxy Inverso** | Caddy (HTTPS automático) |

---

## 2. DESCRIPCIÓN DEL PROYECTO

### 2.1 Contexto y Justificación

En la era del cambio climático, es fundamental que los individuos conozcan y reduzcan su huella de carbono. EcoTrack surge como solución educativa y práctica para sensibilizar a los usuarios sobre su consumo energético.

### 2.2 Alcance

El proyecto incluye:

**Dentro del Alcance:**
- Registro y autenticación de usuarios
- CRUD de consumos energéticos
- Cálculo automático de CO₂
- Dashboards con gráficos
- Recuperación de contraseña por email
- Exportación de datos a PDF
- Objetivo de reducción de consumo

**Fuera del Alcance:**
- Integración con proveedores de servicios
- Medición automática de consumos
- Análisis predictivo avanzado
- App móvil

### 2.3 Historias de Usuario (Prioridad Alta)

#### HU-01: Registro de Usuario

- **Como** visitante
- **Quiero** crear una cuenta
- **Para** empezar a registrar mis consumos

**Criterios de Aceptación:**
- Formulario con campos: nombre, apellidos, nombre de usuario, email, contraseña
- Validación de unicidad (usuario y email únicos)
- Contraseña cifrada con bcrypt
- Mensaje de confirmación al registrarse

#### HU-02: Inicio de Sesión

- **Como** usuario registrado
- **Quiero** iniciar sesión
- **Para** acceder a mi cuenta

**Criterios de Aceptación:**
- Validar credenciales contra BD
- Crear token JWT o sesión
- Redirigir al dashboard
- Mostrar error si credenciales son incorrectas

#### HU-03: Registrar Consumo

- **Como** usuario autenticado
- **Quiero** registrar un consumo
- **Para** llevar control de mi gasto energético

**Criterios de Aceptación:**
- Formulario con: categoría, cantidad, unidad, fecha, notas
- Validar que cantidad > 0
- Calcular CO₂ automáticamente
- Guardar en BD
- Mostrar confirmación

#### HU-04: Ver Historial de Consumos

- **Como** usuario
- **Quiero** ver mis consumos anteriores
- **Para** analizar patrones

**Criterios de Aceptación:**
- Tabla con todos los consumos del usuario
- Filtros por categoría y fecha
- Paginación
- Botones para editar/eliminar
- Mostrar total de CO₂

#### HU-05: Dashboard Principal

- **Como** usuario
- **Quiero** ver resumen visual
- **Para** entender mi huella de carbono

**Criterios de Aceptación:**
- Gráficos de consumo por categoría
- Evolución de los últimos 6 meses
- Total de CO₂ generado
- Mensaje de bienvenida

#### HU-06: Recuperar Contraseña

- **Como** usuario olvidadizo
- **Quiero** recuperar mi contraseña
- **Para** volver a acceder

**Criterios de Aceptación:**
- Formulario con email
- Envío de código por email
- Validar código
- Permitir cambiar contraseña

---

## 3. REQUISITOS FUNCIONALES

### 3.1 Módulo de Autenticación

```
REQ-01: Sistema de Registro
- Validar campos requeridos
- Verificar unicidad de usuario y email
- Cifrar contraseña
- Guardar en BD

REQ-02: Sistema de Login
- Validar credenciales
- Crear sesión/token
- Redirigir a inicio
- Mantener sesión activa

REQ-03: Recuperación de Contraseña
- Generar código temporal
- Enviar por email
- Validar código
- Permitir cambio de contraseña

REQ-04: Logout
- Cerrar sesión
- Limpiar datos locales
- Redirigir a login
```

### 3.2 Módulo de Consumos

```
REQ-05: Registrar Consumo
- Formulario con 5 campos obligatorios
- Validar datos
- Calcular CO₂ = cantidad × factor
- Guardar en BD

REQ-06: Listar Consumos
- Obtener todos los consumos del usuario
- Implementar paginación (20 registros/página)
- Permitir filtros por categoría y fecha
- Mostrar en tabla ordenable

REQ-07: Modificar Consumo
- Cargar datos en formulario
- Permitir edición
- Validar cambios
- Recalcular CO₂

REQ-08: Eliminar Consumo
- Solicitar confirmación
- Eliminar de BD
- Actualizar estadísticas
- Mostrar confirmación
```

### 3.3 Módulo de Estadísticas

```
REQ-09: Dashboard Principal
- Calcular CO₂ del mes actual
- Mostrar gráfico circular (categorías)
- Mostrar gráfico línea (últimos 6 meses)
- Mostrar total de consumos

REQ-10: Gráficos Interactivos
- Implementar Chart.js
- Actualizar dinámicamente
- Responsivos en móvil
- Mostrar leyendas y valores
```

### 3.4 Módulo de Objetivos

```
REQ-11: Crear Objetivo
- Definir categoría
- Establecer porcentaje de reducción
- Establecer fecha límite
- Guardar en BD

REQ-12: Monitorear Objetivo
- Calcular progreso actual
- Mostrar porcentaje de cumplimiento
- Indicar si se cumple o no
- Permitir editar/eliminar
```

### 3.5 Requisitos No Funcionales

```
RNF-01: Rendimiento
- Cargas deben completarse en < 2 segundos
- Máximo 100ms de latencia en API

RNF-02: Disponibilidad
- 99.5% uptime
- Recuperación automática de fallos

RNF-03: Seguridad
- HTTPS obligatorio
- Contraseñas cifradas (bcrypt)
- Validación doble (cliente + servidor)
- Protección CSRF

RNF-04: Escalabilidad
- Soportar 1000 usuarios simultáneos
- Base de datos indexada
- Caché en memoria cuando sea necesario

RNF-05: Usabilidad
- Interfaz intuitiva
- Responsive design
- Mensajes de error claros
- Guías de ayuda
```

---

## 4. ARQUITECTURA GENERAL

### 4.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE - NAVEGADOR                       │
│              (Angular 16 SPA - Tipo Script)                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│            PROXY INVERSO (CADDY)                             │
│   - Certificados SSL automático                             │
│   - Enrutamiento /api → Backend                             │
│   - Enrutamiento / → Frontend                               │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌──────────────────────────┐  ┌─────────────────────────────┐
│   BACKEND (Spring Boot)  │  │  FRONTEND (Nginx + Angular) │
│  - REST Controllers      │  │  - Rutas SPA               │
│  - Servicios             │  │  - Componentes             │
│  - Repositorios (JPA)    │  │  - Servicios HTTP          │
│  - Lógica de negocio     │  │  - Gráficos (Chart.js)     │
└──────────────┬───────────┘  └─────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│           BASE DE DATOS (MySQL 8.0)                      │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐              │
│  │  USUARIO  │  │ CONSUMO  │  │CATEGORIA │ ...          │
│  └───────────┘  └──────────┘  └──────────┘              │
└──────────────────────────────────────────────────────────┘
```

### 4.2 Componentes Principales

#### Frontend (Cliente)

```
┌─ Angular App
│  ├─ Components (Componentes de UI)
│  │  ├─ LoginComponent
│  │  ├─ RegistrarUsuarioComponent
│  │  ├─ PaginaPrincipalComponent
│  │  ├─ RegistrarConsumoComponent
│  │  ├─ HistorialConsumoComponent
│  │  ├─ DashboardsComponent
│  │  ├─ RegistrarObjetivoComponent
│  │  └─ ... (10+ componentes)
│  │
│  ├─ Services (Servicios HTTP)
│  │  ├─ AuthService (Autenticación)
│  │  ├─ ConsumoService (CRUD Consumos)
│  │  ├─ UsuarioService (CRUD Usuarios)
│  │  ├─ EstadisticasService (Gráficos)
│  │  └─ ObjetivoReduccionService
│  │
│  ├─ Models (Entidades TypeScript)
│  │  ├─ Usuario
│  │  ├─ Consumo
│  │  ├─ Categoria
│  │  ├─ ObjetivoReduccion
│  │  └─ Estado
│  │
│  └─ Routing
│     ├─ / → Login
│     ├─ /usuarios/registrar → Registro
│     ├─ /inicio → Dashboard
│     ├─ /registrar-consumo → Formulario consumo
│     ├─ /historial-consumo → Listado
│     └─ ... (10+ rutas)
```

#### Backend (Servidor)

```
┌─ Spring Boot Application
│  ├─ Controllers (Endpoints REST)
│  │  ├─ ControladorUsuario
│  │  │  ├─ POST /api/usuarios (Registro)
│  │  │  ├─ POST /api/usuarios/login (Login)
│  │  │  ├─ POST /api/usuarios/recuperar-password
│  │  │  └─ ...
│  │  ├─ ControladorConsumo
│  │  │  ├─ GET /api/consumos/{id}
│  │  │  ├─ POST /api/consumos
│  │  │  ├─ PUT /api/consumos
│  │  │  ├─ DELETE /api/consumos/{id}
│  │  │  └─ GET /api/consumos/generar-pdf/{id}
│  │  ├─ ControladorEstadistica
│  │  │  └─ GET /api/estadisticas/{id}
│  │  └─ ControladorObjetivoReduccion
│  │     └─ ...
│  │
│  ├─ Models (Entidades JPA)
│  │  ├─ Usuario (@Entity)
│  │  ├─ Consumo (@Entity)
│  │  ├─ Categoria (Enum)
│  │  ├─ Unidad (Enum)
│  │  ├─ Estado (Enum)
│  │  ├─ ObjetivoReduccion (@Entity)
│  │  └─ PasswordResetToken (@Entity)
│  │
│  ├─ Services (Lógica de Negocio)
│  │  ├─ UsuarioServicio
│  │  ├─ ConsumoServicio
│  │  ├─ EstadisticaServicio
│  │  ├─ ObjetivoReduccionServicio
│  │  ├─ EmailService
│  │  └─ ...
│  │
│  ├─ Repositories (Acceso a Datos)
│  │  ├─ UsuarioRepositorio
│  │  ├─ ConsumoRepositorio
│  │  ├─ EstadisticaRepositorio
│  │  └─ ...
│  │
│  ├─ Security (Configuración de Seguridad)
│  │  ├─ Configuración CORS
│  │  ├─ Encriptación de contraseñas
│  │  └─ ...
│  │
│  ├─ Exception Handlers (Manejo de Errores)
│  │  ├─ EmailExistenteException
│  │  ├─ NombreUsuarioExistenteException
│  │  └─ ...
│  │
│  └─ DTO (Objetos de Transferencia de Datos)
│     ├─ ReiniciarPasswordDto
│     └─ ...
```

---

## 5. BASE DE DATOS

### 5.1 Modelo Entidad-Relación

```
┌─────────────┐         ┌────────────┐         ┌──────────┐
│   USUARIO   │         │  CONSUMO   │         │CATEGORIA │
├─────────────┤   1:N   ├────────────┤   N:1   ├──────────┤
│ id (PK)     │◄────────│ id (PK)    │────────►│ id (PK)  │
│ nombre      │         │ id_usuario │         │ nombre   │
│ apellidos   │         │ categoria  │         │ factor   │
│ username*   │         │ cantidad   │         │          │
│ password    │         │ unidad     │         │          │
│ email*      │         │ fecha      │         │          │
└─────────────┘         │ co2        │         └──────────┘
       │                │ notas      │
       │                └────────────┘
       │
       │                ┌──────────────────┐
       │         1:N    │OBJETIVO_REDUCCION│
       └───────────────►├──────────────────┤
                        │ id (PK)          │
                        │ id_usuario (FK)  │
                        │ categoria        │
                        │ % reduccion      │
                        │ fecha_limite     │
                        │ estado           │
                        └──────────────────┘

* UNIQUE
FK = Foreign Key
```

### 5.2 Tabla: USUARIO

```sql
CREATE TABLE usuario (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Campos:**

| Campo | Tipo | Nulo | Clave | Descripción |
|-------|------|------|-------|-------------|
| id | INT UNSIGNED | NO | PK | Identificador único |
| nombre | VARCHAR(100) | NO | - | Nombre del usuario |
| apellidos | VARCHAR(100) | NO | - | Apellidos del usuario |
| nombre_usuario | VARCHAR(50) | NO | UNIQUE | Username para login |
| password | VARCHAR(255) | NO | - | Contraseña cifrada (bcrypt) |
| email | VARCHAR(100) | NO | UNIQUE | Email del usuario |

**Restricciones:**
- PRIMARY KEY: id
- UNIQUE: nombre_usuario, email
- NOT NULL: todos los campos excepto teléfono

### 5.3 Tabla: CONSUMO

```sql
CREATE TABLE consumo (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria ENUM('Agua', 'Electricidad', 'Gas') NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    unidad VARCHAR(20) NOT NULL,
    fecha DATE NOT NULL,
    co2 DOUBLE NOT NULL,
    notas TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    INDEX (usuario_id),
    INDEX (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Campos:**

| Campo | Tipo | Nulo | Descripción |
|-------|------|------|-------------|
| id | INT | NO | Identificador único |
| usuario_id | INT | NO | Referencia a usuario |
| categoria | ENUM | NO | Agua, Electricidad, Gas |
| cantidad | DECIMAL(10,2) | NO | Cantidad consumida |
| unidad | VARCHAR(20) | NO | m³, kWh, etc. |
| fecha | DATE | NO | Fecha del consumo |
| co2 | DOUBLE | NO | CO₂ generado en kg |
| notas | TEXT | SÍ | Notas adicionales |

### 5.4 Tabla: CATEGORIA

```sql
CREATE TABLE categoria (
    id INT NOT NULL AUTO_INCREMENT,
    nombre ENUM('Agua', 'Electricidad', 'Gas') NOT NULL UNIQUE,
    factor_co2 DECIMAL(10,4) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Datos Iniciales:**

```
Agua: 0.0003 kg CO₂ / litro
Electricidad: 0.3 kg CO₂ / kWh
Gas: 2.0 kg CO₂ / m³
```

### 5.5 Tabla: OBJETIVO_REDUCCION

```sql
CREATE TABLE objetivo_reduccion (
    id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    categoria ENUM('Agua', 'Electricidad', 'Gas') NOT NULL,
    porcentaje_reduccion INT NOT NULL,
    fecha_limite DATE NOT NULL,
    estado ENUM('Activo', 'Completado', 'No Completado') DEFAULT 'Activo',
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    INDEX (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Campos:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | Identificador único |
| usuario_id | INT | Referencia a usuario |
| categoria | ENUM | Agua, Electricidad, Gas |
| porcentaje_reduccion | INT | % a reducir (0-100) |
| fecha_limite | DATE | Fecha límite |
| estado | ENUM | Activo, Completado, No Completado |

### 5.6 Índices y Optimización

```sql
-- Índices para mejorar rendimiento
CREATE INDEX idx_consumo_usuario ON consumo(usuario_id);
CREATE INDEX idx_consumo_fecha ON consumo(fecha);
CREATE INDEX idx_consumo_categoria ON consumo(categoria);
CREATE INDEX idx_objetivo_usuario ON objetivo_reduccion(usuario_id);
```

---

## 6. BACKEND - SPRING BOOT

### 6.1 Estructura de Carpetas

```
src/main/java/com/proyecto/ecotrack_backend/
├── EcotrackBackendApplication.java       (Main)
│
├── Controladores/
│  ├── ControladorUsuario.java            (REST - /api/usuarios)
│  ├── ControladorConsumo.java            (REST - /api/consumos)
│  ├── ControladorEstadistica.java        (REST - /api/estadisticas)
│  └── ControladorObjetivoReduccion.java  (REST - /api/objetivos)
│
├── modelos/                              (JPA Entities)
│  ├── Usuario.java
│  ├── Consumo.java
│  ├── Categoria.java (Enum)
│  ├── Unidad.java (Enum)
│  ├── Estado.java (Enum)
│  ├── ObjetivoReduccion.java
│  └── PasswordResetToken.java
│
├── repositorio/                          (Data Access Layer)
│  ├── UsuarioRepositorio.java (extends JpaRepository)
│  ├── ConsumoRepositorio.java
│  ├── EstadisticaRepositorio.java
│  ├── ObjetivoReduccionRepositorio.java
│  └── PasswordResetTokenRepository.java
│
├── servicio/                             (Business Logic)
│  ├── UsuarioServicio.java (interface)
│  ├── UsuarioServicioImpl.java
│  ├── ConsumoServicio.java (interface)
│  ├── ConsumoServicioImpl.java
│  ├── EstadisticaServicio.java (interface)
│  ├── EstadisticaServicioImpl.java
│  ├── EmailService.java (interface)
│  ├── EmailServiceImpl.java
│  ├── ObjetivoReduccionServicio.java (interface)
│  └── ObjetivoReduccionServicioImpl.java
│
├── seguridad/                            (Security Configuration)
│  ├── ConfiguracionSeguridad.java
│  └── ... (JWT, CORS, etc.)
│
├── dto/                                  (Data Transfer Objects)
│  ├── ReiniciarPasswordDto.java
│  └── ...
│
├── excepciones/                          (Custom Exceptions)
│  ├── EmailExistenteException.java
│  ├── NombreUsuarioExistenteException.java
│  └── ...
│
└── configuracion/                        (Configuration)
   ├── ConfiguracionCORS.java
   └── ...

src/main/resources/
├── application.properties                (Config local)
└── application-prod.properties           (Config producción)
```

### 6.2 Clases Principales

#### 6.2.1 ControladorUsuario

```java
@RestController
@RequestMapping("/api/usuarios")
public class ControladorUsuario {
    
    // POST /api/usuarios - Registro de usuario
    @PostMapping
    public Usuario guardarUsuario(@RequestBody Usuario usuario)
    
    // POST /api/usuarios/login - Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request)
    
    // POST /api/usuarios/recuperar-password - Iniciar recuperación
    @PostMapping("/recuperar-password")
    public ResponseEntity<?> recuperarPassword(@RequestBody String email)
    
    // POST /api/usuarios/verificar-codigo - Validar código
    @PostMapping("/verificar-codigo")
    public ResponseEntity<?> verificarCodigo(@RequestBody Map<String, String> body)
    
    // POST /api/usuarios/reiniciar-password - Cambiar contraseña
    @PostMapping("/reiniciar-password")
    public ResponseEntity<?> reiniciarPassword(@RequestBody ReiniciarPasswordDto dto)
    
    // GET /api/usuarios/{id} - Obtener usuario
    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Integer id)
}
```

#### 6.2.2 ControladorConsumo

```java
@RestController
@RequestMapping("/api/consumos")
public class ControladorConsumo {
    
    // GET /api/consumos/{id} - Listar consumos de usuario
    @GetMapping("/{usuarioId}")
    public List<Consumo> obtenerConsumos(@PathVariable Integer usuarioId)
    
    // POST /api/consumos - Crear consumo
    @PostMapping
    public Consumo crearConsumo(@RequestBody Consumo consumo)
    
    // PUT /api/consumos - Modificar consumo
    @PutMapping
    public Consumo modificarConsumo(@RequestBody Consumo consumo)
    
    // DELETE /api/consumos/{id} - Eliminar consumo
    @DeleteMapping("/{id}")
    public void eliminarConsumo(@PathVariable Integer id)
    
    // GET /api/consumos/generar-pdf/{id} - Generar PDF
    @GetMapping("/generar-pdf/{usuarioId}")
    public ResponseEntity<byte[]> generarPdf(@PathVariable Integer usuarioId)
}
```

#### 6.2.3 ControladorEstadistica

```java
@RestController
@RequestMapping("/api/estadisticas")
public class ControladorEstadistica {
    
    // GET /api/estadisticas/{id} - Obtener estadísticas del usuario
    @GetMapping("/{usuarioId}")
    public EstadisticasDTO obtenerEstadisticas(@PathVariable Integer usuarioId)
}
```

#### 6.2.4 Entidad Usuario

```java
@Entity
@Table(name = "usuario")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellidos;
    
    @Column(unique = true, nullable = false, name = "nombre_usuario")
    private String nombreUsuario;
    
    @Column(nullable = false)
    private String password;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Getters y Setters
}
```

#### 6.2.5 Entidad Consumo

```java
@Entity
@Table(name = "consumo")
public class Consumo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    
    @Column(nullable = false)
    private double cantidad;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Unidad unidad;
    
    @Column(nullable = false)
    private LocalDate fecha;
    
    @Column(nullable = false)
    private double co2;
    
    @Column(nullable = true)
    private String notas;
    
    // Getters y Setters
}
```

### 6.3 Servicios (Lógica de Negocio)

#### UsuarioServicio

**Métodos principales:**

```java
public interface UsuarioServicio {
    
    // Obtener usuario por ID
    Usuario obtenerPorId(Integer id);
    
    // Obtener usuario por nombre de usuario
    Usuario obtenerPorNombreUsuario(String nombreUsuario);
    
    // Guardar usuario (Registro)
    Usuario guardar(Usuario usuario);
    
    // Validar login
    Usuario validarLogin(String nombreUsuario, String password);
    
    // Verificar si email existe
    boolean emailExiste(String email);
    
    // Verificar si username existe
    boolean usuarioExiste(String nombreUsuario);
    
    // Cambiar contraseña
    void cambiarPassword(Integer usuarioId, String newPassword);
    
    // Generar token de recuperación
    String generarTokenRecuperacion(Integer usuarioId);
    
    // Validar token de recuperación
    boolean validarToken(String token);
}
```

**Implementación de registro:**

```java
@Service
public class UsuarioServicioImpl implements UsuarioServicio {
    
    @Autowired
    private UsuarioRepositorio usuarioRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public Usuario guardar(Usuario usuario) {
        // Validar que el usuario no exista
        if (usuarioRepo.existsByNombreUsuario(usuario.getNombreUsuario())) {
            throw new NombreUsuarioExistenteException(
                "El nombre de usuario ya existe"
            );
        }
        
        if (usuarioRepo.existsByEmail(usuario.getEmail())) {
            throw new EmailExistenteException(
                "El email ya está registrado"
            );
        }
        
        // Cifrar contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        // Guardar en BD
        return usuarioRepo.save(usuario);
    }
}
```

#### ConsumoServicio

**Métodos principales:**

```java
public interface ConsumoServicio {
    
    // Obtener consumos de un usuario
    List<Consumo> obtenerPorUsuario(Integer usuarioId);
    
    // Obtener consumos con filtros
    List<Consumo> filtrar(Integer usuarioId, Categoria categoria, 
                          LocalDate fechaInicio, LocalDate fechaFin);
    
    // Crear consumo
    Consumo crear(Consumo consumo);
    
    // Actualizar consumo
    Consumo actualizar(Consumo consumo);
    
    // Eliminar consumo
    void eliminar(Integer id);
    
    // Calcular CO₂
    double calcularCO2(Categoria categoria, double cantidad);
    
    // Obtener CO₂ total del mes actual
    double obtenerCO2MesActual(Integer usuarioId);
    
    // Obtener CO₂ últimos 6 meses
    Map<String, Double> obtenerCO2UltimosSeisMeses(Integer usuarioId);
}
```

**Cálculo de CO₂:**

```java
public double calcularCO2(Categoria categoria, double cantidad) {
    double factor;
    
    switch (categoria) {
        case AGUA:
            factor = 0.0003;  // kg CO₂ / litro
            break;
        case ELECTRICIDAD:
            factor = 0.3;     // kg CO₂ / kWh
            break;
        case GAS:
            factor = 2.0;     // kg CO₂ / m³
            break;
        default:
            factor = 0;
    }
    
    return cantidad * factor;
}
```

#### EmailService

**Métodos principales:**

```java
public interface EmailService {
    
    // Enviar email de recuperación
    void enviarEmailRecuperacion(String destinatario, 
                                 String nombreUsuario, 
                                 String codigo);
    
    // Enviar confirmación de registro
    void enviarConfirmacionRegistro(String destinatario, 
                                    String nombreUsuario);
    
    // Enviar notificación de consumo
    void enviarNotificacion(String destinatario, String mensaje);
}
```

**Implementación:**

```java
@Service
public class EmailServiceImpl implements EmailService {
    
    @Value("${mail.username}")
    private String mailUsername;
    
    @Value("${mail.password}")
    private String mailPassword;
    
    @Override
    public void enviarEmailRecuperacion(String destinatario, 
                                       String nombreUsuario, 
                                       String codigo) {
        try {
            // Crear mensaje
            Message message = new SimpleMailMessage();
            message.setTo(destinatario);
            message.setSubject("Recuperación de contraseña - EcoTrack");
            message.setText("Hola " + nombreUsuario + ",\n\n" +
                           "Tu código de recuperación es: " + codigo + "\n\n" +
                           "Este código expira en 15 minutos.");
            
            // Enviar
            mailSender.send((SimpleMailMessage) message);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar email", e);
        }
    }
}
```

### 6.4 Configuración de Seguridad

#### pom.xml - Dependencias

```xml
<!-- Spring Boot Starter Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Boot Starter Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Connector -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Spring Boot Starter Mail -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT (JSON Web Token) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>
```

#### Configuración CORS

```java
@Configuration
public class ConfiguracionCORS {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:4200", 
                                   "https://tu-dominio.duckdns.org")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

#### Configuración de Contraseñas

```java
@Configuration
public class ConfiguracionSeguridad {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

---

## 7. FRONTEND - ANGULAR

### 7.1 Estructura de Carpetas

```
src/app/
├── app.module.ts                 (Módulo principal)
├── app.component.ts              (Componente raíz)
├── app.component.html
├── app.component.css
│
├── components/                   (Componentes de interfaz)
│  ├── login/
│  │  ├── login.component.ts
│  │  ├── login.component.html
│  │  └── login.component.css
│  │
│  ├── registrar-usuario/
│  │  ├── registrar-usuario.component.ts
│  │  ├── registrar-usuario.component.html
│  │  └── registrar-usuario.component.css
│  │
│  ├── pagina-principal/
│  │  ├── pagina-principal.component.ts
│  │  └── pagina-principal.component.html
│  │
│  ├── registrar-consumo/
│  │  ├── registrar-consumo.component.ts
│  │  └── registrar-consumo.component.html
│  │
│  ├── historial-consumo/
│  │  ├── historial-consumo.component.ts
│  │  └── historial-consumo.component.html
│  │
│  ├── dashboards/
│  │  ├── dashboards.component.ts
│  │  └── dashboards.component.html
│  │
│  ├── modificar-consumo/
│  │  ├── modificar-consumo.component.ts
│  │  └── modificar-consumo.component.html
│  │
│  ├── registrar-objetivo/
│  │  ├── registrar-objetivo.component.ts
│  │  └── registrar-objetivo.component.html
│  │
│  ├── lista-objetivos/
│  │  ├── lista-objetivos.component.ts
│  │  └── lista-objetivos.component.html
│  │
│  ├── co2-chart/
│  │  ├── co2-chart.component.ts
│  │  └── co2-chart.component.html
│  │
│  ├── navbar/
│  │  ├── navbar.component.ts
│  │  └── navbar.component.html
│  │
│  ├── footer/
│  │  └── footer.component.html
│  │
│  ├── ayuda-password/
│  │  └── ayuda-password.component.ts
│  │
│  ├── reiniciar-password/
│  │  └── reiniciar-password.component.ts
│  │
│  ├── verificar-codigo/
│  │  └── verificar-codigo.component.ts
│  │
│  └── menu-usuario/
│     └── menu-usuario.component.ts
│
├── services/                    (Servicios HTTP)
│  ├── auth-service.service.ts
│  ├── usuario.service.ts
│  ├── consumo.service.ts
│  ├── estadisticas.service.ts
│  └── objetivo-reduccion.service.ts
│
├── entidades/                   (Modelos TypeScript)
│  ├── usuario.ts
│  ├── consumo.ts
│  ├── categoria.ts
│  ├── ObjetivoReduccion.ts
│  ├── Estado.ts
│  └── unidad.ts
│
├── assets/                      (Recursos estáticos)
│  ├── images/
│  ├── logos/
│  └── data/
│
└── styles.css                   (Estilos globales)
```

### 7.2 Rutas y Navegación

```typescript
const routes: Routes = [
  // Ruta por defecto - Login
  { path: '', component: LoginComponent },
  
  // Autenticación
  { path: 'usuarios/registrar', component: RegistrarUsuarioComponent },
  { path: 'ayuda-password', component: AyudaPasswordComponent },
  { path: 'reiniciar-password', component: ReiniciarPasswordComponent },
  { path: 'verificar-codigo', component: VerificarCodigoComponent },
  
  // Dashboard
  { path: 'inicio', component: PaginaPrincipalComponent },
  
  // Consumos
  { path: 'registrar-consumo', component: RegistrarConsumoComponent },
  { path: 'historial-consumo', component: HistorialConsumoComponent },
  { path: 'modificar-consumo', component: ModificarConsumoComponent },
  
  // Objetivos
  { path: 'registrar-objetivo', component: RegistrarObjetivoComponent },
  { path: 'lista-objetivos', component: ListaObjetivosComponent },
  
  // Usuario
  { path: 'menu-usuario', component: MenuUsuarioComponent },
];
```

### 7.3 Modelos/Entidades TypeScript

#### Usuario

```typescript
export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    nombreUsuario: string;
    password: string;
    email: string;
    
    constructor(
        id: number,
        nombre: string,
        apellidos: string,
        nombreUsuario: string,
        password: string,
        email: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.email = email;
    }
}
```

#### Consumo

```typescript
export class Consumo {
    id: number;
    usuario_id: number;
    categoria: string;
    cantidad: number;
    unidad: string;
    fecha: string;  // YYYY-MM-DD
    co2: number;
    notas: string;
    
    constructor(
        id: number,
        usuario_id: number,
        categoria: string,
        cantidad: number,
        unidad: string,
        fecha: string,
        co2: number,
        notas: string
    ) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.unidad = unidad;
        this.fecha = fecha;
        this.co2 = co2;
        this.notas = notas;
    }
}
```

#### Categoria

```typescript
export enum Categoria {
    AGUA = 'Agua',
    ELECTRICIDAD = 'Electricidad',
    GAS = 'Gas'
}
```

#### ObjetivoReduccion

```typescript
export class ObjetivoReduccion {
    id: number;
    usuario_id: number;
    categoria: string;
    porcentaje_reduccion: number;
    fecha_limite: string;
    estado: string;
    
    constructor(
        id: number,
        usuario_id: number,
        categoria: string,
        porcentaje_reduccion: number,
        fecha_limite: string,
        estado: string
    ) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.categoria = categoria;
        this.porcentaje_reduccion = porcentaje_reduccion;
        this.fecha_limite = fecha_limite;
        this.estado = estado;
    }
}
```

### 7.4 Servicios HTTP

#### AuthService

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    private usuarioActual: Usuario | null = null;
    
    constructor(private router: Router) { }
    
    // Guardar usuario autenticado
    setUsuario(usuario: Usuario) {
        this.usuarioActual = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    
    // Obtener usuario actual
    getUsuario(): Usuario | null {
        if (!this.usuarioActual) {
            const usuarioString = localStorage.getItem('usuario');
            if (usuarioString) {
                const info = JSON.parse(usuarioString);
                this.usuarioActual = new Usuario(
                    info.id,
                    info.nombre,
                    info.apellidos,
                    info.nombreUsuario,
                    info.password,
                    info.email
                );
            }
        }
        return this.usuarioActual;
    }
    
    // Cerrar sesión
    logout() {
        this.usuarioActual = null;
        localStorage.removeItem('usuario');
        this.router.navigate(['']);
    }
    
    // Verificar si está autenticado
    estaAutenticado(): boolean {
        return this.getUsuario() !== null;
    }
}
```

#### ConsumoService

```typescript
@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
    
    private api: string = '/api/consumos';
    
    constructor(private http: HttpClient) { }
    
    /**
     * Obtener todos los consumos de un usuario
     * GET /api/consumos/{usuarioId}
     */
    obtenerListas(id: any): Observable<Consumo[]> {
        return this.http.get<Consumo[]>(this.api + '/' + id);
    }
    
    /**
     * Guardar un nuevo consumo
     * POST /api/consumos
     */
    guardarConsumo(consumo: Consumo): Observable<Consumo> {
        return this.http.post<Consumo>(this.api, consumo);
    }
    
    /**
     * Modificar un consumo existente
     * PUT /api/consumos
     */
    modificarConsumo(consumo: Consumo): Observable<Consumo> {
        return this.http.put<Consumo>(this.api, consumo);
    }
    
    /**
     * Eliminar un consumo
     * DELETE /api/consumos/{id}
     */
    eliminarConsumo(id: any): Observable<any> {
        return this.http.delete(this.api + '/' + id);
    }
    
    /**
     * Generar PDF con historial de consumos
     * GET /api/consumos/generar-pdf/{usuarioId}
     */
    obtenerPdfConsumos(id: any): Observable<Blob> {
        return this.http.get(this.api + '/generar-pdf/' + id, { 
            responseType: 'blob' 
        });
    }
}
```

#### UsuarioService

```typescript
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
    private api: string = '/api/usuarios';
    
    constructor(private http: HttpClient) { }
    
    // POST /api/usuarios - Registrar nuevo usuario
    registrarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.api, usuario);
    }
    
    // POST /api/usuarios/login - Iniciar sesión
    login(nombreUsuario: string, password: string): Observable<Usuario> {
        return this.http.post<Usuario>(
            this.api + '/login',
            { nombreUsuario, password }
        );
    }
    
    // POST /api/usuarios/recuperar-password - Solicitar recuperación
    recuperarPassword(email: string): Observable<any> {
        return this.http.post(
            this.api + '/recuperar-password',
            { email }
        );
    }
    
    // POST /api/usuarios/verificar-codigo - Validar código
    verificarCodigo(codigo: string): Observable<any> {
        return this.http.post(
            this.api + '/verificar-codigo',
            { codigo }
        );
    }
    
    // POST /api/usuarios/reiniciar-password - Cambiar contraseña
    reiniciarPassword(email: string, newPassword: string): Observable<any> {
        return this.http.post(
            this.api + '/reiniciar-password',
            { email, newPassword }
        );
    }
}
```

#### EstadisticasService

```typescript
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
    
    private api: string = '/api/estadisticas';
    
    constructor(private http: HttpClient) { }
    
    /**
     * Obtener estadísticas de un usuario
     * GET /api/estadisticas/{usuarioId}
     */
    obtenerEstadisticas(usuarioId: number): Observable<any> {
        return this.http.get(this.api + '/' + usuarioId);
    }
}
```

### 7.5 Componentes Principales

#### LoginComponent

```typescript
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    nombreUsuario: string = '';
    password: string = '';
    error: string = '';
    
    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
    ) { }
    
    ngOnInit(): void {
    }
    
    login() {
        if (!this.nombreUsuario || !this.password) {
            this.error = 'Por favor completa todos los campos';
            return;
        }
        
        this.usuarioService.login(this.nombreUsuario, this.password)
            .subscribe({
                next: (usuario) => {
                    this.authService.setUsuario(usuario);
                    this.router.navigate(['/inicio']);
                },
                error: (error) => {
                    this.error = 'Usuario o contraseña incorrectos';
                }
            });
    }
    
    irARegistro() {
        this.router.navigate(['/usuarios/registrar']);
    }
    
    recuperarPassword() {
        this.router.navigate(['/ayuda-password']);
    }
}
```

**Template HTML:**

```html
<div class="login-container">
    <h1>EcoTrack</h1>
    <h2>Iniciar Sesión</h2>
    
    <form (ngSubmit)="login()">
        <div class="form-group">
            <label>Nombre de Usuario</label>
            <input 
                type="text" 
                [(ngModel)]="nombreUsuario"
                name="nombreUsuario"
                required
            >
        </div>
        
        <div class="form-group">
            <label>Contraseña</label>
            <input 
                type="password" 
                [(ngModel)]="password"
                name="password"
                required
            >
        </div>
        
        <div *ngIf="error" class="error-message">
            {{ error }}
        </div>
        
        <button type="submit" class="btn-primary">Inicia Sesión</button>
    </form>
    
    <p>¿No tienes cuenta? <a (click)="irARegistro()">Regístrate aquí</a></p>
    <p><a (click)="recuperarPassword()">¿Olvidaste tu contraseña?</a></p>
</div>
```

#### RegistrarConsumoComponent

```typescript
@Component({
  selector: 'app-registrar-consumo',
  templateUrl: './registrar-consumo.component.html',
  styleUrls: ['./registrar-consumo.component.css']
})
export class RegistrarConsumoComponent implements OnInit {
    
    consumo = {
        categoria: '',
        cantidad: 0,
        unidad: '',
        fecha: '',
        notas: ''
    };
    
    categorias = ['Agua', 'Electricidad', 'Gas'];
    
    constructor(
        private consumoService: ConsumoService,
        private authService: AuthService,
        private router: Router
    ) { }
    
    ngOnInit(): void {
    }
    
    guardarConsumo() {
        const usuarioId = this.authService.getUsuario()?.id;
        
        if (!usuarioId) {
            alert('Debes estar autenticado');
            return;
        }
        
        const consumoAGuardar = {
            id: 0,
            usuario_id: usuarioId,
            ...this.consumo
        };
        
        this.consumoService.guardarConsumo(consumoAGuardar)
            .subscribe({
                next: () => {
                    alert('Consumo registrado correctamente');
                    this.router.navigate(['/historial-consumo']);
                },
                error: (error) => {
                    alert('Error al guardar el consumo');
                }
            });
    }
}
```

#### HistorialConsumoComponent

```typescript
@Component({
  selector: 'app-historial-consumo',
  templateUrl: './historial-consumo.component.html',
  styleUrls: ['./historial-consumo.component.css']
})
export class HistorialConsumoComponent implements OnInit {
    
    consumos: Consumo[] = [];
    consumosFiltrados: Consumo[] = [];
    categoriaFiltro: string = 'Todas';
    paginaActual: number = 1;
    registrosPorPagina: number = 20;
    totalCO2: number = 0;
    
    constructor(
        private consumoService: ConsumoService,
        private authService: AuthService
    ) { }
    
    ngOnInit(): void {
        this.cargarConsumos();
    }
    
    cargarConsumos() {
        const usuarioId = this.authService.getUsuario()?.id;
        
        this.consumoService.obtenerListas(usuarioId)
            .subscribe({
                next: (consumos) => {
                    this.consumos = consumos;
                    this.aplicarFiltros();
                    this.calcularTotalCO2();
                },
                error: (error) => {
                    alert('Error al cargar consumos');
                }
            });
    }
    
    aplicarFiltros() {
        if (this.categoriaFiltro === 'Todas') {
            this.consumosFiltrados = this.consumos;
        } else {
            this.consumosFiltrados = this.consumos.filter(
                c => c.categoria === this.categoriaFiltro
            );
        }
    }
    
    calcularTotalCO2() {
        this.totalCO2 = this.consumosFiltrados
            .reduce((sum, c) => sum + c.co2, 0);
    }
    
    eliminarConsumo(id: number) {
        if (confirm('¿Estás seguro?')) {
            this.consumoService.eliminarConsumo(id)
                .subscribe({
                    next: () => {
                        this.cargarConsumos();
                    },
                    error: (error) => {
                        alert('Error al eliminar');
                    }
                });
        }
    }
}
```

### 7.6 Gráficos con Chart.js

#### Co2ChartComponent

```typescript
@Component({
  selector: 'app-co2-chart',
  templateUrl: './co2-chart.component.html',
  styleUrls: ['./co2-chart.component.css']
})
export class Co2ChartComponent implements OnInit {
    
    chartPastel: Chart;
    chartLinea: Chart;
    
    constructor(
        private estadisticasService: EstadisticasService,
        private authService: AuthService
    ) { }
    
    ngOnInit(): void {
        this.cargarGraficos();
    }
    
    cargarGraficos() {
        const usuarioId = this.authService.getUsuario()?.id;
        
        this.estadisticasService.obtenerEstadisticas(usuarioId)
            .subscribe({
                next: (datos) => {
                    this.crearChartPastel(datos);
                    this.crearChartLinea(datos);
                }
            });
    }
    
    crearChartPastel(datos: any) {
        const ctx = document.getElementById('chartPastel') as HTMLCanvasElement;
        
        this.chartPastel = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Agua', 'Electricidad', 'Gas'],
                datasets: [{
                    label: 'CO₂ por Categoría (kg)',
                    data: [
                        datos.co2Agua,
                        datos.co2Electricidad,
                        datos.co2Gas
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    crearChartLinea(datos: any) {
        const ctx = document.getElementById('chartLinea') as HTMLCanvasElement;
        
        this.chartLinea = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datos.meses,
                datasets: [{
                    label: 'CO₂ Total (kg)',
                    data: datos.co2Mensual,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
```

---

## 8. FLUJOS Y RUTAS

### 8.1 Flujo de Registro de Usuario

```
1. Usuario accede a /usuarios/registrar
   ↓
2. Completa formulario (nombre, apellidos, username, email, password)
   ↓
3. Angular valida datos en cliente
   ↓
4. POST /api/usuarios {usuario}
   ↓
5. Backend valida:
   - Email único? (EmailExistenteException si no)
   - Username único? (NombreUsuarioExistenteException si no)
   - Campos requeridos? (ValidationException si no)
   ↓
6. Backend cifra contraseña con bcrypt
   ↓
7. Guarda en BD tabla USUARIO
   ↓
8. Retorna Usuario creado
   ↓
9. Angular muestra "Usuario registrado correctamente"
   ↓
10. Redirige a / (Login)
```

### 8.2 Flujo de Autenticación (Login)

```
1. Usuario accede a / (LoginComponent)
   ↓
2. Completa formulario (username, password)
   ↓
3. POST /api/usuarios/login {username, password}
   ↓
4. Backend busca usuario en tabla USUARIO
   ↓
5. Si no existe → error "Usuario o contraseña incorrectos"
   ↓
6. Si existe, verifica password con bcrypt
   ↓
7. Si no coincide → error "Usuario o contraseña incorrectos"
   ↓
8. Si coincide → retorna datos del Usuario
   ↓
9. Angular guarda en localStorage y en memoria
   ↓
10. Redirige a /inicio (Dashboard)
```

### 8.3 Flujo de Registro de Consumo

```
1. Usuario autenticado accede a /registrar-consumo
   ↓
2. Completa formulario:
   - Categoría (Agua, Electricidad, Gas)
   - Cantidad (número > 0)
   - Unidad (L, kWh, m³)
   - Fecha (no futura)
   - Notas (opcional)
   ↓
3. Angular valida datos
   ↓
4. POST /api/consumos {consumo}
   ↓
5. Backend valida:
   - Usuario autenticado?
   - Cantidad > 0?
   - Fecha no futura?
   ↓
6. Backend calcula CO₂:
   - Si Agua: cantidad × 0.0003
   - Si Electricidad: cantidad × 0.3
   - Si Gas: cantidad × 2.0
   ↓
7. Guarda en tabla CONSUMO:
   INSERT INTO consumo VALUES (...usuario_id, categoria, cantidad, co2...)
   ↓
8. Retorna Consumo creado
   ↓
9. Angular muestra confirmación
   ↓
10. Redirige a /historial-consumo
```

### 8.4 Flujo de Visualización del Historial

```
1. Usuario accede a /historial-consumo
   ↓
2. Angular obtiene ID del usuario actual
   ↓
3. GET /api/consumos/{usuarioId}
   ↓
4. Backend ejecuta:
   SELECT * FROM consumo WHERE usuario_id = {id}
   ORDER BY fecha DESC
   ↓
5. Retorna lista de Consumos
   ↓
6. Angular muestra tabla con paginación (20/página)
   ↓
7. Usuario puede:
   - Filtrar por categoría
   - Filtrar por rango de fechas
   - Ordenar por columnas
   - Editar consumo → /modificar-consumo
   - Eliminar consumo → confirmación → DELETE /api/consumos/{id}
```

### 8.5 Flujo de Dashboard (Estadísticas)

```
1. Usuario accede a /inicio (PaginaPrincipalComponent)
   ↓
2. Angular obtiene ID del usuario
   ↓
3. GET /api/estadisticas/{usuarioId}
   ↓
4. Backend calcula:
   - CO₂ total del mes actual (SUM consumos donde MONTH = mes actual)
   - CO₂ por categoría (AGUA, ELECTRICIDAD, GAS)
   - CO₂ últimos 6 meses (agrupado por mes)
   - Total de consumos registrados (COUNT)
   ↓
5. Retorna objeto EstadisticasDTO
   ↓
6. Angular inicializa componente Co2ChartComponent
   ↓
7. Chart.js crea:
   - Gráfico circular (CO₂ por categoría)
   - Gráfico línea (evolución 6 meses)
   ↓
8. Se muestra dashboard con:
   - Bienvenida "Hola, [nombre]"
   - Tarjetas con métricas
   - Dos gráficos interactivos
```

### 8.6 Flujo de Recuperación de Contraseña

```
1. Usuario accede a /ayuda-password
   ↓
2. Ingresa email
   ↓
3. POST /api/usuarios/recuperar-password {email}
   ↓
4. Backend busca usuario en tabla USUARIO
   ↓
5. Si no existe → error "Email no registrado"
   ↓
6. Si existe:
   - Genera código aleatorio (4-6 dígitos)
   - Crea registro en PasswordResetToken:
     INSERT INTO password_reset_token VALUES 
     (uuid, usuario_id, codigo, fecha_expiracion...)
   - Envía email con código (Gmail SMTP)
   ↓
7. Angular redirige a /verificar-codigo
   ↓
8. Usuario ingresa código recibido
   ↓
9. POST /api/usuarios/verificar-codigo {codigo}
   ↓
10. Backend valida:
    - Código existe en tabla?
    - Código no expirado? (< 15 minutos)
    ↓
11. Si válido → guarda token en sesión
    ↓
12. Angular redirige a /reiniciar-password
    ↓
13. Usuario ingresa nueva contraseña
    ↓
14. POST /api/usuarios/reiniciar-password {newPassword}
    ↓
15. Backend:
    - Obtiene usuario del token
    - Cifra nueva contraseña
    - UPDATE usuario SET password = new_cifrada
    - Elimina token usado
    ↓
16. Angular muestra "Contraseña actualizada"
    ↓
17. Redirige a / (Login)
```

---

## 9. SEGURIDAD Y AUTENTICACIÓN

### 9.1 Medidas de Seguridad Implementadas

#### 1. Cifrado de Contraseñas

```java
// Usar BCrypt (bcrypt genera hash + salt automático)
PasswordEncoder encoder = new BCryptPasswordEncoder();
String passwordCifrada = encoder.encode(passwordPlano);

// Al verificar:
boolean esValida = encoder.matches(passwordPlano, passwordCifrada);
```

**Ejemplo:**
```
Contraseña plana: "miPassword123"
Hash bcrypt: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36GqkWFm
```

#### 2. Validación Doble (Cliente + Servidor)

**Cliente (TypeScript):**
```typescript
// Validar antes de enviar
if (!email.includes('@')) {
    this.error = 'Email inválido';
    return;
}
if (password.length < 8) {
    this.error = 'Contraseña mínimo 8 caracteres';
    return;
}
```

**Servidor (Java):**
```java
@PostMapping
public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario) {
    // Validaciones en servidor
    if (usuario.getEmail() == null || !usuario.getEmail().contains("@")) {
        throw new ValidationException("Email inválido");
    }
    if (usuario.getPassword().length() < 8) {
        throw new ValidationException("Contraseña débil");
    }
    // ... continuar
}
```

#### 3. Protección CORS

```java
@Configuration
public class ConfiguracionCORS {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("https://tu-dominio.duckdns.org")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

#### 4. Unicidad de Email y Username

```java
// En BD:
ALTER TABLE usuario ADD CONSTRAINT UNIQUE (nombre_usuario);
ALTER TABLE usuario ADD CONSTRAINT UNIQUE (email);

// En Java:
if (usuarioRepo.existsByNombreUsuario(usuario.getNombreUsuario())) {
    throw new NombreUsuarioExistenteException(
        "El usuario ya existe"
    );
}
if (usuarioRepo.existsByEmail(usuario.getEmail())) {
    throw new EmailExistenteException(
        "El email ya está registrado"
    );
}
```

#### 5. Tokens de Recuperación Temporal

```java
// Generar token temporal
String token = UUID.randomUUID().toString();
LocalDateTime expiracion = LocalDateTime.now().plusMinutes(15);

PasswordResetToken resetToken = new PasswordResetToken();
resetToken.setToken(token);
resetToken.setUsuario(usuario);
resetToken.setFechaExpiracion(expiracion);
tokenRepository.save(resetToken);

// Validar token
PasswordResetToken token = tokenRepository.findByToken(token);
if (token == null || token.isExpirado()) {
    throw new InvalidTokenException("Token inválido o expirado");
}
```

#### 6. Almacenamiento en localStorage

```typescript
// Guardar usuario
localStorage.setItem('usuario', JSON.stringify(usuario));

// Recuperar usuario
const usuarioString = localStorage.getItem('usuario');
if (usuarioString) {
    const usuario = JSON.parse(usuarioString);
    // ...
}

// Logout
localStorage.removeItem('usuario');
```

### 9.2 Autorizaciones y Control de Acceso

#### Verificar Autenticación

```typescript
// En componentes que requieren autenticación:
ngOnInit(): void {
    const usuario = this.authService.getUsuario();
    if (!usuario) {
        this.router.navigate(['']);  // Redirige a login
        return;
    }
}
```

#### Usar Guard (Angular)

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    
    canActivate(): boolean {
        if (this.authService.estaAutenticado()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
```

**Usar en rutas:**
```typescript
const routes: Routes = [
    { path: '', component: LoginComponent },
    { 
        path: 'inicio', 
        component: PaginaPrincipalComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'registrar-consumo', 
        component: RegistrarConsumoComponent,
        canActivate: [AuthGuard]
    }
];
```

### 9.3 Ambiente Seguro en Producción

#### HTTPS Obligatorio

```yaml
# Caddy configura HTTPS automático
https://tu-dominio.duckdns.org {
    reverse_proxy localhost:8080 {
        header_up X-Forwarded-Proto https
    }
}
```

#### Variables de Entorno Sensibles

```bash
# .env (NO VERSIONADO)
MYSQL_ROOT_PASSWORD=contraseña_fuerte_123
MYSQL_PASSWORD=contraseña_usuario_456
MAIL_PASSWORD=tu_app_password_gmail
JWT_SECRET=clave_secreta_muy_larga_123456789
```

**No incluir en git:**
```bash
# .gitignore
.env
*.properties
secrets/
```

---

## 10. DESPLIEGUE CON DOCKER

### 10.1 Estructura de Despliegue

```
despliegue/
├── docker-compose.yml        (Orquestación)
├── docker/
│   ├── Dockerfile.backend    (Spring Boot)
│   ├── Dockerfile.frontend   (Angular + Nginx)
│   └── Dockerfile.mysql      (MySQL)
├── caddy/
│   └── Caddyfile             (Proxy inverso HTTPS)
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
│       └── default.conf
├── database/
│   ├── initial.sql           (Creación tablas)
│   └── data.sql              (Datos iniciales)
├── config/
│   ├── application-prod.properties
│   └── .env.example
└── scripts/
    ├── init.sh               (Inicializar)
    ├── deploy.sh             (Desplegar)
    ├── health-check.sh       (Verificar salud)
    └── pre-deployment-check.sh
```

### 10.2 Docker Compose

```yaml
version: '3.9'

services:
  # MySQL Database
  mysql:
    build:
      context: ..
      dockerfile: despliegue/docker/Dockerfile.mysql
    container_name: ecotrack-mysql
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE:-ecotrack}
      MYSQL_USER: ${MYSQL_USER:-ecotrack_user}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/initial.sql:/docker-entrypoint-initdb.d/01-initial.sql
      - ./database/data.sql:/docker-entrypoint-initdb.d/02-data.sql
    networks:
      - ecotrack-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 20

  # Spring Boot Backend
  backend:
    build:
      context: ..
      dockerfile: despliegue/docker/Dockerfile.backend
    container_name: ecotrack-backend
    restart: unless-stopped
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/${MYSQL_DATABASE:-ecotrack}
      SPRING_DATASOURCE_USERNAME: ${MYSQL_USER:-ecotrack_user}
      SPRING_DATASOURCE_PASSWORD: ${MYSQL_PASSWORD}
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      SPRING_MAIL_USERNAME: ${MAIL_USERNAME}
      SPRING_MAIL_PASSWORD: ${MAIL_PASSWORD}
    ports:
      - "8080:8080"
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - ecotrack-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Angular Frontend + Nginx
  frontend:
    build:
      context: ..
      dockerfile: despliegue/docker/Dockerfile.frontend
    container_name: ecotrack-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - ecotrack-network

  # Caddy Proxy Inverso
  caddy:
    image: caddy:latest
    container_name: ecotrack-caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    environment:
      DOMAIN: ${DOMAIN:-localhost}
    networks:
      - ecotrack-network

volumes:
  mysql_data:
  caddy_data:
  caddy_config:

networks:
  ecotrack-network:
    driver: bridge
```

### 10.3 Dockerfiles

#### Dockerfile.backend

```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml
COPY Backend/ecotrack-backend/ecotrack-backend/pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY Backend/ecotrack-backend/ecotrack-backend/src ./src

# Build
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy JAR from build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Dockerfile.frontend

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY Frontend/ecotrack/package*.json ./

RUN npm ci

COPY Frontend/ecotrack/ .

RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY despliegue/nginx/nginx.conf /etc/nginx/nginx.conf
COPY despliegue/nginx/conf.d/ /etc/nginx/conf.d/

COPY --from=build /app/dist/ecotrack /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Dockerfile.mysql

```dockerfile
FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE:-ecotrack}
ENV MYSQL_USER=${MYSQL_USER:-ecotrack_user}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

EXPOSE 3306

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
```

### 10.4 Despliegue Paso a Paso

#### Requisitos Previos

```bash
# Instalar Docker y Docker Compose
sudo apt update
sudo apt install docker.io docker-compose

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Verificar instalación
docker --version
docker-compose --version
```

#### 1. Preparar Configuración

```bash
cd despliegue

# Crear archivo .env
cp config/.env.example .env

# Editar variables (IMPORTANTE!)
nano .env
```

**Contenido de .env:**

```bash
# Dominio (cambiar por tu DuckDNS)
DOMAIN=tu-dominio.duckdns.org

# MySQL
MYSQL_DATABASE=ecotrack
MYSQL_USER=ecotrack_user
MYSQL_PASSWORD=contraseña_segura_aqui
MYSQL_ROOT_PASSWORD=root_password_seguro

# Email (Gmail)
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu_app_password_gmail

# CORS
CORS_ALLOWED_ORIGINS=https://tu-dominio.duckdns.org
```

#### 2. Construir Imágenes

```bash
docker-compose build
# Toma 3-5 minutos en primera ejecución
```

#### 3. Iniciar Servicios

```bash
# Iniciar en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Esperar a ver "Started EcotrackBackendApplication"
```

#### 4. Verificación

```bash
# Ver estado de contenedores
docker-compose ps

# Verificar salud de servicios
curl http://localhost/api/actuator/health

# Ver logs de un servicio
docker-compose logs mysql
docker-compose logs backend
docker-compose logs frontend
```

#### 5. Acceder a la Aplicación

```
https://tu-dominio.duckdns.org/
```

### 10.5 Comandos Útiles

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar comando en contenedor
docker-compose exec backend java -version
docker-compose exec mysql mysql -u root -p -e "SHOW DATABASES;"

# Reconstruir imágenes
docker-compose build --no-cache

# Actualizar a nueva versión
docker-compose pull
docker-compose up -d

# Backup de base de datos
docker-compose exec mysql mysqldump -u root -p ecotrack > backup.sql

# Restaurar base de datos
docker-compose exec -T mysql mysql -u root -p < backup.sql

# Ver volúmenes
docker volume ls

# Limpiar recursos no usados
docker system prune -a

# Ver información detallada
docker-compose config
```

### 10.6 Solución de Problemas

#### El frontend no carga

```bash
# 1. Verificar logs
docker-compose logs frontend

# 2. Verificar Nginx
docker-compose exec frontend curl http://localhost

# 3. Reconstruir frontend
docker-compose up -d --build frontend
```

#### El backend no conecta a BD

```bash
# 1. Verificar que MySQL esté listo
docker-compose logs mysql

# 2. Ver si MySQL acepta conexiones
docker-compose exec mysql mysql -h localhost -u root -p

# 3. Recrear MySQL
docker-compose down
docker volume rm despliegue_mysql_data  # CUIDADO: elimina datos
docker-compose up -d mysql
```

#### Errores de HTTPS

```bash
# 1. Ver logs de Caddy
docker-compose logs caddy

# 2. Verificar certificados
docker-compose exec caddy ls -la /data/caddy/certificates/

# 3. Forzar renovación
docker-compose exec caddy caddy reload -c /etc/caddy/Caddyfile
```

---

## 11. GLOSARIO TÉCNICO

| Término | Definición |
|---------|-----------|
| **ACID** | Atomicidad, Consistencia, Aislamiento, Durabilidad (propiedades de BD) |
| **API REST** | Interfaz que permite comunicación HTTP entre cliente y servidor |
| **BCrypt** | Algoritmo de cifrado de contraseñas con salt automático |
| **CORS** | Cross-Origin Resource Sharing (permite requisiciones entre dominios) |
| **DTO** | Data Transfer Object (objeto para transferir datos entre capas) |
| **Enum** | Tipo de dato con valores predefinidos |
| **FK** | Foreign Key (clave foránea, referencia a otra tabla) |
| **HTTP** | HyperText Transfer Protocol (protocolo de comunicación web) |
| **HTTPS** | HTTP Secure (HTTP con cifrado SSL/TLS) |
| **JPA** | Java Persistence API (especificación para acceso a BD) |
| **JWT** | JSON Web Token (token para autenticación stateless) |
| **ORM** | Object Relational Mapping (mapeo de objetos a BD) |
| **PK** | Primary Key (clave primaria, identificador único) |
| **POJO** | Plain Old Java Object (clase Java simple) |
| **Requisito Funcional** | Qué debe hacer el sistema |
| **Requisito No Funcional** | Cómo debe hacerlo (rendimiento, seguridad, etc.) |
| **REST** | Representational State Transfer (arquitectura para APIs) |
| **Singleton** | Patrón que garantiza una única instancia de una clase |
| **SPA** | Single Page Application (aplicación web que carga una sola página) |
| **SQL** | Structured Query Language (lenguaje para BD) |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security (cifrado web) |
| **TypeScript** | Lenguaje de programación (superset de JavaScript) |
| **UUID** | Universally Unique Identifier (identificador único universal) |
| **Validación** | Verificar que los datos cumplan reglas |

---

## CONCLUSIÓN

EcoTrack es un proyecto completo de aplicación web que demuestra:

✅ **Arquitectura moderna** con separación de capas (Frontend/Backend/BD)  
✅ **Tecnologías actuales** (Angular, Spring Boot, MySQL, Docker)  
✅ **Seguridad** con cifrado de contraseñas, validación doble, CORS, HTTPS  
✅ **Base de datos relacional** con integridad referencial e índices  
✅ **Despliegue en producción** con Docker, Caddy y HTTPS automático  
✅ **Funcionalidades completas** desde autenticación hasta gráficos estadísticos  

Este proyecto es apto para ser presentado como TFG (Trabajo Fin de Grado) en un programa de 2º DAW.

---

**Fin de la Documentación**

_Generada: Enero 2026_  
_Para la defensa del TFG_

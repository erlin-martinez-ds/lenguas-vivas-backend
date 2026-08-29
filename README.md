# Lenguas Vivas - Backend

Backend de la plataforma **Lenguas Vivas**, desarrollado para apoyar el aprendizaje, enseñanza y preservación de las lenguas indígenas.

La aplicación proporciona una **API REST** encargada de gestionar la información y la lógica de negocio de la plataforma.

El backend está desarrollado utilizando **NestJS**, **TypeORM** y **MySQL**, aplicando una arquitectura modular y separación de responsabilidades entre entidades, DTOs, servicios y controladores.

---

## Tecnologías utilizadas

* **Node.js**
* **NestJS**
* **TypeScript**
* **TypeORM**
* **MySQL**
* **class-validator**
* **class-transformer**
* **npm**
* **Postman**
* **Git y GitHub**

---

## Requisitos previos

Antes de ejecutar el proyecto se deben tener instalados:

* Node.js
* npm
* MySQL
* Git
* Postman (para realizar las pruebas de la API)

Se recomienda utilizar una versión reciente de Node.js.

Para comprobar las instalaciones:

```bash
node --version
npm --version
mysql --version
git --version
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/erlin-martinez-ds/lenguas-vivas-backend.git
```

### 2. Ingresar al proyecto

```bash
cd lenguas-vivas-backend
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## Configuración de la base de datos

El backend utiliza **MySQL** como sistema gestor de base de datos y **TypeORM** para la comunicación entre NestJS y MySQL.

Antes de ejecutar el proyecto se debe crear la base de datos en MySQL.

Ejemplo:

```sql
CREATE DATABASE lenguas_vivas;
```

El nombre de la base de datos debe coincidir con el valor configurado en la variable `DB_DATABASE`.

---

## Variables de entorno

La conexión con MySQL se configura mediante variables de entorno.

En la raíz del proyecto se debe crear un archivo:

```text
.env
```

Ejemplo de configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=lenguas_vivas
```

### Descripción de las variables

| Variable      | Descripción                       |
| ------------- | --------------------------------- |
| `DB_HOST`     | Servidor donde se encuentra MySQL |
| `DB_PORT`     | Puerto utilizado por MySQL        |
| `DB_USERNAME` | Usuario de MySQL                  |
| `DB_PASSWORD` | Contraseña del usuario de MySQL   |
| `DB_DATABASE` | Nombre de la base de datos        |

> **Importante:** El archivo `.env` contiene información privada y no debe subirse al repositorio de GitHub.

---

## Configuración de TypeORM

La configuración de la conexión se encuentra separada de `AppModule` para mantener una mejor organización del proyecto.

```text
src/
└── config/
    └── database.config.ts
```

TypeORM se encarga de establecer la conexión con MySQL y cargar automáticamente las entidades utilizadas por los diferentes módulos.

---

## Ejecución del proyecto

### Modo desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

Cuando la aplicación se inicia correctamente se mostrará un mensaje similar a:

```text
Nest application successfully started
```

Por defecto, la API estará disponible en:

```text
http://localhost:3000
```

### Ejecutar normalmente

```bash
npm run start
```

### Compilar el proyecto

Para comprobar que el proyecto compila correctamente:

```bash
npm run build
```

### Ejecutar la versión compilada

```bash
npm run start:prod
```

---

# Estructura del proyecto

La estructura principal del backend se organiza mediante módulos:

```text
src/
│
├── config/
│   └── database.config.ts
│
├── roles/
│   ├── dto/
│   │   ├── create-rol.dto.ts
│   │   └── update-rol.dto.ts
│   │
│   ├── entities/
│   │   └── rol.entity.ts
│   │
│   ├── roles.controller.ts
│   ├── roles.module.ts
│   └── roles.service.ts
│
├── app.controller.ts
├── app.module.ts
└── main.ts
```

---

# Arquitectura

El proyecto aplica una separación de responsabilidades entre las diferentes capas.

```text
Cliente / Postman
       │
       ▼
 Controller
       │
       ▼
 Service
       │
       ▼
 TypeORM
       │
       ▼
 MySQL
```

### Entidades

Representan las tablas de la base de datos mediante clases de TypeScript y decoradores de TypeORM.

### DTO

Los **Data Transfer Objects (DTO)** definen la estructura de los datos que pueden recibirse mediante las peticiones HTTP.

También permiten aplicar validaciones sobre los datos recibidos.

### Services

Contienen la lógica de negocio y se encargan de comunicarse con la capa de datos mediante TypeORM.

### Controllers

Se encargan de recibir las peticiones HTTP y exponer los diferentes endpoints de la API REST.

### Modules

Agrupan las entidades, controladores y servicios relacionados con una funcionalidad específica.

---

# Módulos implementados

Actualmente se encuentra implementado:

* [x] Configuración de conexión con MySQL y TypeORM
* [x] Módulo de Roles
* [x] Entidad `Rol`
* [x] DTO de creación
* [x] DTO de actualización
* [x] Validaciones
* [x] CRUD de Roles

Los demás módulos serán incorporados progresivamente durante el desarrollo del proyecto.

---

# API REST

## Módulo de Roles

El módulo de Roles permite administrar los roles utilizados dentro de la plataforma.

### Crear un rol

**Método:**

```text
POST
```

**Endpoint:**

```text
http://localhost:3000/roles
```

**Body:**

```json
{
  "nombre": "Administrador"
}
```

**Respuesta esperada:**

```json
{
  "id_rol": 1,
  "nombre": "Administrador"
}
```

---

### Listar todos los roles

**Método:**

```text
GET
```

**Endpoint:**

```text
http://localhost:3000/roles
```

Devuelve todos los roles registrados en la base de datos.

---

### Consultar un rol por ID

**Método:**

```text
GET
```

**Endpoint:**

```text
http://localhost:3000/roles/:id
```

Ejemplo:

```text
GET http://localhost:3000/roles/1
```

---

### Actualizar un rol

**Método:**

```text
PATCH
```

**Endpoint:**

```text
http://localhost:3000/roles/:id
```

Ejemplo:

```text
PATCH http://localhost:3000/roles/1
```

**Body:**

```json
{
  "nombre": "Administrador del sistema"
}
```

---

### Eliminar un rol

**Método:**

```text
DELETE
```

**Endpoint:**

```text
http://localhost:3000/roles/:id
```

Ejemplo:

```text
DELETE http://localhost:3000/roles/1
```

---

# Validaciones

El proyecto utiliza:

* `class-validator`
* `class-transformer`
* `ValidationPipe`

La validación se configura de manera global en `main.ts`.

Actualmente las peticiones de Roles validan los datos enviados mediante los DTO correspondientes.

Además, se utiliza:

```typescript
whitelist: true
```

para permitir únicamente las propiedades definidas en los DTO.

También se utiliza:

```typescript
forbidNonWhitelisted: true
```

para rechazar peticiones que contengan propiedades no permitidas.

---

# Manejo de errores

La API utiliza códigos de estado HTTP para informar el resultado de las operaciones.

| Código                      | Significado                           |
| --------------------------- | ------------------------------------- |
| `200 OK`                    | Operación realizada correctamente     |
| `201 Created`               | Recurso creado correctamente          |
| `400 Bad Request`           | Datos inválidos o petición incorrecta |
| `404 Not Found`             | Recurso solicitado no encontrado      |
| `500 Internal Server Error` | Error interno del servidor            |

---

# Pruebas con Postman

Para realizar las pruebas se debe iniciar primero el backend:

```bash
npm run start:dev
```

La dirección base de la API es:

```text
http://localhost:3000
```

## Ejemplo de prueba

### Crear un rol

En Postman seleccionar:

```text
POST
```

URL:

```text
http://localhost:3000/roles
```

En:

```text
Body → raw → JSON
```

enviar:

```json
{
  "nombre": "Administrador"
}
```

La respuesta esperada será similar a:

```json
{
  "id_rol": 1,
  "nombre": "Administrador"
}
```

Posteriormente se pueden probar las operaciones:

```text
GET     /roles
GET     /roles/:id
PATCH   /roles/:id
DELETE  /roles/:id
```

---

# Pruebas de validación

También se pueden realizar pruebas enviando información incorrecta para comprobar las validaciones.

Por ejemplo, enviar un objeto vacío:

```json
{}
```

o enviar propiedades no permitidas:

```json
{
  "nombre": "Administrador",
  "campoNoPermitido": "valor"
}
```

La API debe rechazar las peticiones que no cumplan con las reglas establecidas.

---

# Control de versiones

El proyecto utiliza **Git y GitHub** para el control de versiones y el trabajo colaborativo.

No se trabaja directamente sobre `main`.

Cada funcionalidad se desarrolla mediante una rama independiente.

Ejemplos:

```text
feature/configuracion-typeorm
feature/modulo-roles
feature/documentacion-readme
```

## Flujo de trabajo

```text
main
 │
 ├── feature/configuracion-typeorm
 │          │
 │          └── Pull Request → Merge
 │
 ├── feature/modulo-roles
 │          │
 │          └── Pull Request → Revisión → Merge
 │
 └── feature/documentacion-readme
            │
            └── Pull Request → Revisión → Merge
```

Cada funcionalidad debe contar con commits descriptivos y posteriormente integrarse mediante un Pull Request.

---

# Comandos principales

| Comando              | Función                      |
| -------------------- | ---------------------------- |
| `npm install`        | Instalar dependencias        |
| `npm run start`      | Iniciar el proyecto          |
| `npm run start:dev`  | Iniciar en modo desarrollo   |
| `npm run start:prod` | Ejecutar versión compilada   |
| `npm run build`      | Compilar el proyecto         |
| `npm run test`       | Ejecutar pruebas unitarias   |
| `npm run test:e2e`   | Ejecutar pruebas End-to-End  |
| `npm run test:cov`   | Generar reporte de cobertura |

---

# Estado del proyecto

El proyecto se encuentra actualmente en desarrollo.

### Funcionalidades

* [x] Configuración inicial de NestJS
* [x] Configuración de variables de entorno
* [x] Conexión con MySQL
* [x] Configuración de TypeORM
* [x] Módulo de Roles
* [x] CRUD de Roles
* [x] DTOs
* [x] Validaciones
* [x] Manejo de errores
* [x] Documentación inicial
* [x] Módulo de Usuarios
* [x] Módulo de Lenguas
* [x] Módulo de Comunidades
* [ ] Relaciones entre entidades
* [ ] Autenticación y autorización
* [ ] Demás funcionalidades de la plataforma

---

# Proyecto académico

**Materia:** Proyecto de Software 2

El proyecto se desarrolla bajo una modalidad grupal con evaluación individual, utilizando buenas prácticas de desarrollo, arquitectura por capas, control de versiones y trabajo colaborativo mediante GitHub.

---




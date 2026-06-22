# FreelancerHub API

**Autora:** Melisa Rivas  
**Asignatura:** Diseño y Desarrollo de APIs  
**Proyecto:** Parcial — API para registro de freelancers y publicación de servicios

API REST construida con **NestJS**, **TypeORM**, **PostgreSQL**, **JWT** y **Swagger**.

---

## Descripción

FreelancerHub permite que freelancers autenticados publiquen servicios profesionales y que visitantes exploren el catálogo sin necesidad de iniciar sesión.

---

## Requisitos previos

- Node.js 18+
- PostgreSQL
- npm

---

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE freelancerhub;
```

3. Copiar variables de entorno:

```bash
cp .env.example .env
```

4. Editar `.env` con tus credenciales:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=freelancerhub
JWT_SECRET=tu_secreto_jwt
```

---

## Ejecutar el proyecto

```bash
# Modo desarrollo (con hot reload)
npm run start:dev

# Ejecutar seed manual de usuarios (opcional)
npm run seed
```

La API quedará disponible en: `http://localhost:3000`  
Documentación Swagger: `http://localhost:3000/api`

> Al iniciar la aplicación, el seed carga automáticamente los usuarios si no existen en la base de datos.

---

## Usuarios del seed (login simulado)

| Email | Password | Nombre |
|---|---|---|
| melisa.rivas@hub.com | 123456 | Estudiante de APIs |
| freelancer.demo@hub.com | 123456 | Freelancer Demo |
| maria.design@hub.com | 123456 | Maria Gonzalez |
| carlos.dev@hub.com | 123456 | Carlos Mendoza |

> Las contraseñas no están cifradas porque el login es simulado, según lo indicado en el enunciado del parcial.

---

## Endpoints

### Autenticación

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/auth/login` | Público | Obtiene token JWT con email y password |

**Ejemplo:**
```json
POST /auth/login
{
  "email": "melisa.rivas@hub.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Servicios públicos

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/public/services` | Público | Lista todos los servicios disponibles |

**Respuesta:**
```json
[
  {
    "title": "Diseno de logo profesional",
    "category": "Diseno",
    "price": 120,
    "providerName": "Maria Gonzalez"
  }
]
```

---

### Servicios protegidos

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/services` | Protegido (Bearer Token) | Publica un nuevo servicio |

**Headers:**
```
Authorization: Bearer <access_token>
```

**Body:**
```json
{
  "title": "Diseno de logo profesional",
  "category": "Diseno",
  "description": "Incluye 3 propuestas y 2 rondas de ajustes",
  "price": 120
}
```

> El `providerId` se obtiene automáticamente del token JWT. **No debe enviarse en el body.**

---

## Estructura del proyecto

```
src/
├── auth/           # Login JWT, strategy y guard
├── users/          # Entidad y servicio de usuarios
├── services/       # Entidad, DTO y publicación de servicios
├── public/         # Controlador público (GET /public/services)
├── database/       # Seed de usuarios
├── app.module.ts
└── main.ts
```

---

## Pruebas con Postman

Importar el archivo `PRUEBAS_POSTMAN.json` incluido en el proyecto.

La colección valida:
- Login simulado con JWT
- Listado público de servicios
- Publicación protegida con token
- Validación de DTOs
- Swagger activo en `/api`

---

## Tecnologías utilizadas

- NestJS
- TypeORM
- PostgreSQL
- JWT (@nestjs/jwt + passport-jwt)
- Swagger (@nestjs/swagger)
- class-validator / class-transformer

---

## Autora

**Melisa Rivas** — Diseño y Desarrollo de APIs

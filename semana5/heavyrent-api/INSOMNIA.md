# Pruebas con Insomnia — HeavyRent API

## Requisitos previos

1. PostgreSQL con la base `heavyrent` (ver `.env`).
2. Servidor en ejecución: `npm run start:dev`.
3. Credenciales de Google OAuth configuradas en Google Cloud Console con callback:
   `http://localhost:3000/auth/google/redirect`
4. **Stripe test:** clave `STRIPE_SECRET_KEY=sk_test_...` en `.env` (Dashboard → Developers → API keys).

## 1. Obtener JWT (login con Google)

El flujo OAuth requiere **navegador**:

1. Abre: `http://localhost:3000/auth/google`
2. Inicia sesión con Google.
3. Tras el redirect verás un JSON similar a:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "tu@email.com",
    "name": "Tu Nombre",
    "role": "customer"
  }
}
```

4. Copia `access_token` para las peticiones siguientes.

### Rol admin (POST /machines y DELETE /machines)

En PostgreSQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'tu@email.com';
```

Vuelve a iniciar sesión con Google para obtener un token con rol `admin`.

## 2. Insomnia — configuración común

En cada request protegida, pestaña **Auth** → **Bearer Token** → pega el `access_token`.

O header manual:

```
Authorization: Bearer <tu_token>
```

## 3. Endpoints

### GET /machines (público)

- **URL:** `http://localhost:3000/machines`
- **Auth:** ninguna
- **Respuesta:** lista de máquinas con estado `Disponible`

### POST /machines (solo admin)

- **URL:** `http://localhost:3000/machines`
- **Auth:** Bearer con token de usuario `admin`
- **Body (JSON):**

```json
{
  "name": "Excavadora CAT 320",
  "type": "Excavadora",
  "status": "Disponible",
  "dailyRate": 1500
}
```

- **403** si el token es de un `customer`.

### DELETE /machines/:id (solo admin)

- **URL:** `http://localhost:3000/machines/<uuid>`
- **Auth:** Bearer admin
- **200** si no hay reservas activas (Pendiente/Aprobada con `endDate >= hoy`)
- **409** si la máquina tiene reserva activa

### POST /rentals (usuario autenticado + abono 10%)

- **URL:** `http://localhost:3000/rentals`
- **Auth:** Bearer (customer o admin)
- **Body (JSON):**

```json
{
  "machineId": "<uuid-de-maquina-disponible>",
  "startDate": "2026-06-15",
  "endDate": "2026-06-20"
}
```

- **400** si `startDate` es en el pasado.
- **Respuesta** incluye `totalCost`, `depositAmount` (10% del total), `paymentIntentId`, `clientSecret`.

Ejemplo de respuesta:

```json
{
  "rental": { "id": "...", "depositAmount": "900.00", "paymentStatus": "pending", ... },
  "totalCost": 9000,
  "depositAmount": 900,
  "paymentIntentId": "pi_...",
  "clientSecret": "pi_..._secret_..."
}
```

### Confirmar pago Stripe (test)

1. En [Stripe Dashboard → Payments (test)](https://dashboard.stripe.com/test/payments), localiza el Payment Intent o confírmalo con tarjeta de prueba `4242 4242 4242 4242` si usas Stripe.js.
2. Cuando el intent quede en estado `succeeded`, llama:

- **URL:** `http://localhost:3000/rentals/<rental-id>/confirm-payment`
- **Auth:** Bearer (mismo usuario que creó la solicitud)
- **Body:**

```json
{
  "paymentIntentId": "pi_xxxxxxxx"
}
```

- **200** → `paymentStatus` pasa a `paid`.

### GET /rentals (mis solicitudes)

- **URL:** `http://localhost:3000/rentals`
- **Auth:** Bearer
- **Respuesta:** solo las solicitudes del usuario del token (incluye `totalCost`, `depositAmount`, `paymentStatus`).

## 4. Swagger

Documentación interactiva: **http://localhost:3000/api**

Usa el botón **Authorize** para pegar el Bearer token y probar desde el navegador.

## 5. Matriz evaluable

Ver [`MATRIZ_EVALUABLE.md`](MATRIZ_EVALUABLE.md) para el detalle de JWT, validaciones y Google por acción.

## 6. Errores esperados

| Situación | Código |
|-----------|--------|
| Ruta protegida sin token | 401 |
| POST /machines con rol customer | 403 |
| Fecha de inicio en el pasado | 400 |
| Máquina no disponible | 400 |
| DELETE máquina con reserva activa | 409 |
| confirm-payment sin pago succeeded en Stripe | 400 |

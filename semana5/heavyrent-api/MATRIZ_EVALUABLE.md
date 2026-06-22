# Matriz evaluable — HeavyRent API

| Módulo | Acción | JWT | Validaciones | Google | Implementación |
|--------|--------|-----|--------------|--------|----------------|
| Auth | Login con Google | No | Sí (perfil OAuth) | Sí | `GET /auth/google`, `GET /auth/google/redirect` — `AuthGuard('google')` |
| Users | Crear usuario (desde Google) | No | Sí (email, nombre, googleId) | Sí | `UsersService.findOrCreateFromGoogle` en callback OAuth |
| Machines | Crear máquina | Sí (admin) | Sí (`CreateMachineDto`) | No | `POST /machines` — `AuthGuard('jwt')` + `RolesGuard` + `@Roles(admin)` |
| Machines | Listar disponibles | No | No | No | `GET /machines` — público, filtra `Disponible` |
| Rentals | Crear solicitud | Sí | Sí (DTO + fechas + máquina) | No | `POST /rentals` — JWT + validaciones de negocio |
| Rentals | Ver mis solicitudes | Sí | No | No | `GET /rentals` — JWT, filtra por `user.id` |

## Rutas adicionales (TODOS.md)

| Requerimiento | Endpoint / lógica |
|---------------|-------------------|
| No fechas pasadas | `RentalsService.create` |
| Estado "En taller" | `MachineStatus.EN_TALLER` |
| No eliminar con reserva activa | `DELETE /machines/:id` → 409 si hay rental Pendiente/Aprobada con `endDate >= hoy` |
| Abono 10% con Stripe | `POST /rentals` + `POST /rentals/:id/confirm-payment` |

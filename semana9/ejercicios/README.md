# Ejercicio 1 - Cache simple de un endpoint

Proyecto NestJS para practicar caché de respuestas con Redis en el endpoint `GET /courses`.

## Qué hace

- Simula una consulta costosa con una espera de 2 segundos.
- Guarda el resultado en caché con la clave `courses_all`.
- Devuelve la respuesta desde Redis en las siguientes peticiones.
- Expira automáticamente a los 15 segundos.
- Mide el tiempo de respuesta con `console.time` y `console.timeEnd`.

## Requisitos

- Node.js 20 o superior.
- Redis ejecutándose localmente o con Docker.

## Configuración

```bash
npm install
cp .env.example .env
docker compose up -d redis
```

Si no levantas Redis, la API sigue respondiendo, pero la caché no quedará persistida en Redis.

## Ejecutar

```bash
npm run start:dev
```

## Probar

Primera petición:

- tarda cerca de 2 segundos
- responde con `source: "database"`

Segunda petición inmediata:

- responde mucho más rápido
- responde con `source: "redis"`

Después de 15 segundos sin pedirlo de nuevo, vuelve a simular la consulta costosa.

## Endpoint

- `GET /courses`

## Respuesta

```json
{
  "source": "database",
  "cached": false,
  "courses": [
    {
      "id": 1,
      "title": "NestJS Fundamentals",
      "description": "Introducción a módulos, controladores y servicios",
      "durationHours": 8,
      "teacher": "Ana"
    }
  ]
}
```

# Ejercicio 2 - Caché con invalidación manual

API de `productos` en el mismo proyecto que reutiliza el `CacheService`.

## Qué hace

- `GET /products`: devuelve el listado completo (simulando consulta costosa de 2s), cacheado con la clave `products_all` y TTL de 30 segundos.
- `POST /products`: agrega un producto nuevo al arreglo en memoria.
- `DELETE /products/:id`: elimina un producto del arreglo en memoria.
- Cada `POST` o `DELETE` invalida manualmente la caché (`cacheService.del('products_all')`), así la siguiente llamada a `GET /products` trae datos frescos en vez de la versión cacheada.

## Probar

```bash
# 1) Primera llamada: tarda ~2s, source: "database"
curl http://localhost:3000/products

# 2) Segunda llamada inmediata: rápida, source: "redis"
curl http://localhost:3000/products

# 3) Agregar un producto (invalida la caché)
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d "{\"name\":\"Panela\",\"price\":6.5}"

# 4) GET vuelve a tardar ~2s y ya incluye el nuevo producto
curl http://localhost:3000/products

# 5) Eliminar un producto (invalida la caché)
curl -X DELETE http://localhost:3000/products/1

# 6) GET vuelve a tardar ~2s y ya no incluye el producto eliminado
curl http://localhost:3000/products
```

## Endpoints

- `GET /products`
- `POST /products` — body: `{ "name": string, "price": number }`
- `DELETE /products/:id`

# Ejercicio 3 - Caché con claves dinámicas y control de expiración por usuario

API de `dashboard` en el mismo proyecto.

## Qué hace

- `GET /dashboard/:userId`: simula un reporte costoso (2s) y lo cachea con una clave dinámica por usuario: `dashboard_user_<userId>`, así el caché de un usuario no interfiere con el de otro.
- TTL diferenciado según rol (query param `?role=admin`):
  - `role=admin` → TTL de 10 segundos (datos más frescos).
  - sin `role` o cualquier otro valor → TTL de 60 segundos.
- `DELETE /dashboard/:userId/cache`: invalida únicamente la caché de ese usuario, sin afectar a los demás.
- `GET /dashboard/stats`: devuelve el contador de `cache hit` vs `cache miss` (guardado en Redis con `INCR`, con fallback en memoria si Redis no está disponible).

## Probar

```bash
# Usuario regular: primera vez ~2s, source: database
curl http://localhost:3000/dashboard/user_5

# Segunda vez inmediata: rápida, source: redis
curl http://localhost:3000/dashboard/user_5

# Usuario admin: TTL corto de 10s
curl "http://localhost:3000/dashboard/user_9?role=admin"
curl "http://localhost:3000/dashboard/user_9?role=admin"   # rápida, dentro de los 10s
# esperas 11s y repites -> vuelve a tardar ~2s

# Invalidar solo el caché de user_5 (user_9 no se ve afectado)
curl -X DELETE http://localhost:3000/dashboard/user_5/cache
curl http://localhost:3000/dashboard/user_5   # vuelve a tardar ~2s

# Ver métricas acumuladas de hits/misses
curl http://localhost:3000/dashboard/stats
```

## Endpoints

- `GET /dashboard/:userId` — query opcional `?role=admin`
- `DELETE /dashboard/:userId/cache`
- `GET /dashboard/stats`
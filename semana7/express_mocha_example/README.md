# Express + Mocha + Chai

API de ejemplo con Express y pruebas con Mocha, Chai y Supertest.

## Comandos

```bash
npm install
npm test      # ejecutar pruebas
npm start     # levantar servidor en puerto 3000
npm run build # compilar TypeScript
```

## ¿Qué es `.mocharc.json`?

Es el archivo de **configuración de Mocha**. Cuando corres `npm test` (que ejecuta `mocha`), Mocha lee este archivo automáticamente.

### ¿Para qué sirve?

Evita poner opciones largas en `package.json`. En lugar de esto:

```json
"test": "tsx ./node_modules/mocha/bin/mocha test/**/*.spec.ts"
```

podemos dejar solo:

```json
"test": "mocha"
```

y mover el resto a `.mocharc.json`.

### ¿Qué hace cada opción?

| Opción | Función |
|--------|---------|
| `require` | Carga `tsx` para que Mocha pueda ejecutar archivos TypeScript (`.ts`) |
| `extension` | Indica que los tests tienen extensión `.ts` |
| `spec` | Define qué archivos correr (`test/**/*.spec.ts`) |

### ¿Por qué este proyecto lo necesita y otros no?

Este proyecto usa **TypeScript** (`app.spec.ts`, `students.spec.ts`). Node no ejecuta `.ts` directamente, así que Mocha necesita instrucciones extra.

En proyectos con tests en **JavaScript** (`.test.js`), basta con `"test": "mocha"` porque no hace falta compilar ni cargar nada adicional.

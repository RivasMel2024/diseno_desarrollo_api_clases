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

## Mocha — estructura del test

Mocha organiza las pruebas con bloques que se leen casi como frases:

```javascript
describe('Operaciones matemáticas', () => {
  it('resta correctamente', () => {
    // ...
  });
});
```

- `describe` → agrupa pruebas (“Operaciones matemáticas”)
- `it` → describe un caso concreto (“resta correctamente”)

Eso hace que el test se entienda **antes** de ver el código interno.

## Chai — las afirmaciones

Chai es quien verifica el resultado. Con el estilo `expect` suena bastante natural:

```javascript
expect(restar(10, 5)).to.equal(5);
expect(esPar(4)).to.be.true;
expect(res.body).to.have.property('error');
```

Se lee casi como: *“espero que restar(10, 5) sea igual a 5”*.

## Comparación rápida

| Herramienta | Rol |
|-------------|-----|
| **Mocha** | Ejecuta los tests y define la estructura (`describe`, `it`) |
| **Chai** | Comprueba que el resultado sea el esperado (`expect`, `to.equal`, etc.) |
| **Supertest** | (en tu proyecto Express) Hace peticiones HTTP al API para probarlo |

## ¿Es “lenguaje normal”?

- **Sí**, comparado con tests muy técnicos o verbosos.
- **No del todo**, porque sigues escribiendo código JavaScript/TypeScript.

Algo más “lenguaje natural” sería Cucumber, con escenarios así:

```gherkin
Cuando resto 10 menos 5
Entonces el resultado debe ser 5
```

Mocha + Chai están en un punto intermedio: **código real, pero pensado para leerse fácil**. Por eso se usan mucho en cursos y proyectos como los tuyos en `clase_tests` y `express_mocha_example`.
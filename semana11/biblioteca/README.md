# Actividad 2 — Proyecto Biblioteca

API GraphQL (Code First) con NestJS + TypeORM.
Dominio: **Book** — **Author**. Relación `Book` `@ManyToOne` `Author` / `Author` `@OneToMany` `Book`.

## Ejecutar

```bash
npm install
npm run start:dev
```

Playground disponible en: http://localhost:3000/graphql

## Arquitectura

- `author/` y `book/`: cada módulo con Entity, DTO (InputType), Service, Resolver y Module.
- Validación de existencia del `Author` **únicamente** en `BookService.create()` → `NotFoundException`.
- La relación `Book → Author` se resuelve con `@ResolveField()` (sin duplicar lógica en las queries).

## Ejemplos para GraphQL Playground

### 1. Crear autor
```graphql
mutation {
  createAuthor(input: { name: "Gabriel Garcia Marquez" }) {
    id
    name
  }
}
```

### 2. Crear libro (author válido)
```graphql
mutation {
  createBook(input: { title: "Cien años de soledad", authorId: 1 }) {
    id
    title
    authorId
  }
}
```

### 3. Crear libro con author inexistente → NotFoundException
```graphql
mutation {
  createBook(input: { title: "Libro fantasma", authorId: 999 }) {
    id
    title
  }
}
```
Respuesta esperada: `"Author with id 999 not found"` (status 404).

### 4. Query anidada: books → author (una sola petición)
```graphql
query {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

### 5. Consultas auxiliares
```graphql
query {
  authors { id name }
  book(id: 1) { id title author { name } }
  author(id: 1) { id name }
}
```

# GraphQL + NestJS Projects

## Objetivo

Este repositorio contiene 3 proyectos independientes para practicar GraphQL con NestJS.

Cada proyecto debe realizar exactamente la misma arquitectura y las mismas buenas prácticas.

La única diferencia entre proyectos es el dominio.

---

# Reglas generales

Todos los proyectos deben cumplir con las siguientes reglas.

## Arquitectura

Utilizar arquitectura estándar de NestJS.

Cada módulo debe contener:

- Entity
- DTOs
- Resolver
- Service
- Module

---

## Base de datos

Las entidades deben utilizar TypeORM.

Las relaciones deben implementarse utilizando:

- @ManyToOne
- @OneToMany

según corresponda.

---

## GraphQL

Utilizar GraphQL Code First.

Cada entidad debe tener:

- ObjectType
- InputType
- Resolver
- Mutations
- Queries

---

## Validaciones

Toda relación debe validarse antes de guardar.

Si la entidad relacionada no existe debe lanzar:

```ts
NotFoundException
```

Nunca crear registros con relaciones inválidas.

---

## ResolveField

Las relaciones deben resolverse mediante:

```ts
@ResolveField()
```

No duplicar lógica dentro de las queries principales.

---

## Entregables

Cada proyecto debe terminar con:

- mutation funcionando
- query funcionando
- relación anidada funcionando
- probado en GraphQL Playground

---

# Actividad 1

# Proyecto Blog

## Dominio

Post
Comment

## Objetivo

Agregar comentarios a publicaciones.

## Modelo

Post

↓

Comment

(Relación Muchos a Uno)

---

## Entity

Crear:

Comment

Campos:

- id
- content
- createdAt

Relación:

Comment

↓

Post

@ManyToOne

Post

↓

Comment[]

@OneToMany

---

## DTO

Modificar:

CreateCommentInput

Agregar:

```ts
postId
```

Debe ser obligatorio.

---

## Service

En:

CommentService.create()

Validar:

- buscar el Post
- si no existe

lanzar

```ts
NotFoundException
```

---

## Resolver

Crear

```ts
@ResolveField()
post()
```

Debe resolver el Post asociado al Comment.

---

## Query Final

Debe permitir consultar:

Comments

↓

Post

en una sola petición GraphQL.

---

## Entrega

Debe funcionar:

- createComment
- query comments
- post anidado

---

# Actividad 2

# Proyecto Biblioteca

## Dominio

Book
Author

## Objetivo

Relacionar libros con autores.

---

## DTO

Modificar:

CreateBookInput

Agregar:

```ts
authorId
```

obligatorio.

---

## Service

En:

BookService.create()

Validar que:

- exista el Author

Si no:

```ts
NotFoundException
```

---

## Resolver

Crear:

```ts
@ResolveField()
author()
```

Debe devolver el Author del Book.

---

## Query Final

Consultar:

Books

↓

Author

en una sola petición.

---

## Entrega

Debe funcionar:

- createBook
- books
- author anidado

---

# Actividad 3

# Proyecto Soporte Técnico

## Dominio

Ticket
Agent

## Objetivo

Asignar tickets a agentes.

---

## DTO

Modificar:

CreateTicketInput

Agregar:

```ts
agentId
```

obligatorio.

---

## Service

En:

TicketService.create()

Validar:

- Agent existe

Si no:

```ts
NotFoundException
```

---

## Resolver

Crear:

```ts
@ResolveField()
agent()
```

---

## Query Final

Consultar:

Tickets

↓

Agent

en una sola petición.

---

## Entrega

Debe funcionar:

- createTicket
- tickets
- agent anidado

---

# Buenas prácticas

- Código limpio
- Mantener separación de responsabilidades
- No duplicar lógica
- Validaciones en Service
- Resolver únicamente resuelve relaciones
- DTOs únicamente validan entrada
- Relaciones usando TypeORM
- GraphQL Code First
- Código modular
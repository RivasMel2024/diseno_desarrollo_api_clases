import express, { Request, Response } from 'express';

export interface Student {
  nombre: string;
  edad: number;
  email: string;
}

const students: Student[] = [];

export function resetStudents(): void {
  students.length = 0;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStudent(body: unknown): { valid: true; student: Student } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Datos inválidos' };
  }

  const { nombre, edad, email } = body as Record<string, unknown>;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return { valid: false, error: 'El nombre es obligatorio' };
  }

  if (typeof edad !== 'number' || edad <= 0) {
    return { valid: false, error: 'La edad debe ser un número mayor a 0' };
  }

  if (typeof email !== 'string' || !isValidEmail(email)) {
    return { valid: false, error: 'El email no tiene un formato válido' };
  }

  return {
    valid: true,
    student: { nombre: nombre.trim(), edad, email },
  };
}

const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.post('/sum', (req: Request, res: Response) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  res.json({ result: a + b });
});

app.post('/students', (req: Request, res: Response) => {
  const validation = validateStudent(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  students.push(validation.student);
  res.status(201).json(validation.student);
});

app.get('/students', (req: Request, res: Response) => {
  res.json(students);
});

export default app;

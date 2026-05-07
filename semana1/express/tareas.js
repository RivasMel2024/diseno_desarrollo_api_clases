const express = require('express');
const app = express();
app.use(express.json());

let tareas = [
    { id: 1, titulo: 'Tarea 1', descripcion: 'Estudiar Node.js' },
    { id: 2, titulo: 'Tarea 2', descripcion: 'Preparar presentación' },
];

// GET - obtener tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// POST - crear nueva tarea
app.post('/tareas', (req, res) => {
    const nueva = { id: Date.now(), titulo: req.body.titulo }
    tareas.push(nueva);
    res.status(201).json(nueva);
})

// PUT - actualizar tarea
app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id)

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.titulo = req.body.titulo;
    res.json(tarea);
});
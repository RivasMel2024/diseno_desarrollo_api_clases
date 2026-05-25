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

    // Se busca el id de la tarea que se quiere actualizar
    const tarea = tareas.find(t => t.id == req.params.id) // find devuelve el primer elemennto del array que cumpla con la condicion

    // Devuelve error si no lo encuentra
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // El req body es el cuerpo de la solicitud, es decir, los datos que se envían para actualizar la tarea. 
    // Asi que sobre el titulo actual se sobreescribe con base a lo que recibio del body
    tarea.titulo = req.body.titulo;
    res.json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
    tareas = tareas.filter(t => t.id != req.params.id ) // devuelve un nuevo array con todos los elementos que cumplen la condicion
    res.status(204).send()
})

app.listen(3000, () => {
    console.log(`Corriendo en el puerto 3000`);
    
})
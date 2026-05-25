const express = require('express');
const app = express();
const PORT = 8080

app.use(express.json());

const asignados = [
    { id: 1, nombre: "Melisa Rivas" },
    { id: 2, nombre: "Juan Perez" },
    { id: 3, nombre: "Ana Solis" }
]

let tareas = [
    {
        id: 1, 
        titulo: 'Tarea 1', 
        descripcion: 'Estudiar Node.js' ,
        asignado: asignados.find(a => a.id === 1),
        peso: 1,
        horaRegistro: new Date().toLocaleTimeString(),
    }
];

nextIdTarea = 2
nextIdAsignado = 4

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.status(200).json(tareas)
})

// Crear una tarea
app.post('/tareas', (req, res) => {
    const { titulo, descripcion, asignadoId, peso } = req.body
    
    if(!titulo || !asignadoId ){
        res.status(400).send({ message: "El título y el ID del asignado son requeridos" })
    }
    
    const asignado = asignados.find(a => a.id === Number(asignadoId))
    if (!asignado) {
        return res.status(404).send({ message: "Asignado no encontrado" })
    }

    nuevaTarea = {
        id: nextIdTarea++,
        titulo,
        descripcion,
        asignado,
        peso,
        horaRegistro: new Date().toLocaleTimeString()
    }

    tareas.push(nuevaTarea)

    res.status(201).json(nuevaTarea)
})

// Crear en batch
app.post('/tareas/batch', (req, res) => {
    const nuevasTareas = req.body

    nuevasTareas.forEach(t => {
        tareas.push({
            id: nextIdTarea++,
            titulo: t.titulo,
            descripcion: t.descripcion,
            asignadoId: asignados.find(a => a.id === Number(t.asignadoId)),
            peso: t.peso,
            horaRegistro: new Date().toLocaleTimeString()
        })
    });

    res.status(201).send({ message: "Nuevas tareas registradas", payload: tareas })

})

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id)

    if(!tarea){
        return res.status(404).send({ message: "Tarea no encontrada" })
    }

    res.status(200).json({ message: "Tarea encontrada", payload: tarea })
})

// Eliminar en batch
app.delete('/tareas/batch', (req, res)=>{
    const { ids } = req.body

    tareas = tareas.filter(t => !ids.includes(t.id))

    res.status(204).json({message: "Tareas eliminadas", payload: tareas})
})

app.delete('/tareas/:id', (req, res) => {
   const tareaId = parseInt(req.params.id)

    const tarea = tareas.find(t => t.id === tareaId)
    if (!tarea) {
        return res.status(404).send({ message: "Tarea no encontrada" })
    }

    tareas = tareas.filter(t => t.id !== tareaId)

    return res.status(200).json({ message: "Tarea eliminada", payload: tareas })
})


app.listen(PORT, () => {
    console.log(`Sistema corriendo en el puerto http://localhost:${PORT}`);
})
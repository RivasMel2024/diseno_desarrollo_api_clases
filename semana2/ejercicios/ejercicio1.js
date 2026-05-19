// Tienda de abarrotes "Don Chico"

import express from 'express';

const app = express()
const PORT = 8080

app.use(express.json());

const productos = []

const ventas = []


app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const newProduct = {
        id: Date.now(),
        nombre: req.body.nombre,
        precioU: req.body.precioU,
        categoria: req.body.categoria,
        stock: req.body.stock,
        unidadMedida: req.body.unidadMedida,
        fechaVencimiento: req.body.fechaVencimiento,
        proveedor: req.body.proveedor
    };

    productos.push(newProduct);
    res.json(newProduct);
});






app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

// Mostrar solo los primeros 5 usuarios del endpoint

const obtenerDatos = async () => {
    try {
        const response = await fetch("http://jsonplaceholder.typicode.com/users")
        const datos = await response.json()
        console.log(datos.splice(0, 5));
        
    } catch (error) {
        console.log(`Mensaje de error: ${error}`);
        
    }
}

obtenerDatos()
const obtenerDatos = async () => {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users'); 
        const datos = await respuesta.json();
        console.log(datos.slice(0, 5))
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }

}

obtenerDatos()
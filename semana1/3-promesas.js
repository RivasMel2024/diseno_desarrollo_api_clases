const obtnerDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Datos obtenidos');
            console.log("termino....");
        }, 2000);

        console.log("luego de la promesa...");
    });
}

obtnerDatos().then(data=> console.log(data));
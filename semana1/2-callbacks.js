function saludar(nombre, callback) {
    console.log(`Hola, ${nombre}`);
    callback() // mandar una funcion a traves de un parametro
}


saludar("Ana", () => console.log("Callback ejecutada")) // se manda una funcion anonima como callback
/* Obtener perfil completo de un usuario
    Cantidad de los posts
    Los titulos de los albumes
*/

const obtenerPerfilCompleto = async (userId) => {
    try {

        const [user, posts, albumes] = await Promise.all([

            fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
                .then(response => {
                    if(!response.ok) throw new Error('usuario')
                    return response.json()
                }), // de forma inmediata despues de traer el usuario completo lo convertimos en json

            fetch(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then(response => {
                    if(!response.ok) throw new Error('posts')
                    return response.json()

                }),

            fetch(`http://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                .then(response => {
                    if(!response.ok) throw new Error('albumes')
                    return response.json()
                })
        ])

        console.log({ 
            usuario: user.name,
            post: posts.length,
            albumes: albumes.map(album => album.title)
        });
        
    } catch (error) {
        console.log(`Fallo al obtener: ${error.message}`);
        
    }
};

obtenerPerfilCompleto(10)
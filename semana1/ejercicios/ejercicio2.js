const obtenerPostConAutor = async (postId) => {
    const postResponse = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`) // primeor obtenemos el post con el id que nos pasan por parámetro
    const post = await postResponse.json() // luego obtenemos el json del post para poder acceder a su userId

    const userId = post.userId // una vez qye 
    const userResponse = await fetch (`http://jsonplaceholder.typicode.com/users/${userId}`)
    const user = await userResponse.json()

    console.log({
        titulo: post.title,
        descripcion: post.body,
        autor: user.name
    });
}

obtenerPostConAutor(2)
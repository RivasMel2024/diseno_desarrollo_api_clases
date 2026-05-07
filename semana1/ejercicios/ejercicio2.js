const obtenerPostConAutor = async (postId) => {
    try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        const postData = await postResponse.json();

        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        const userData = await userResponse.json();

        return {
            post: postData.title,
            autor: userData
        };
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

obtenerPostConAutor(1).then(resultado => console.log(resultado));
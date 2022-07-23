const API_URL = 'http://localhost:8006/api/usuario'

export const userInfo = async () => {
    
    let user

        await fetch(`${API_URL}/user`, { method: 'GET'})
        .then(res => res.json())
        .then(data =>  user = data)
        .catch(err => console.log(err, 'soy err'))

    return user
}

export const userLogin = async (credentials) => {
    
    let user

        await fetch(`${API_URL}/login`, { method: 'POST', body: JSON.stringify({ username: credentials.username, password: credentials.password }) })
        .then(res => res.json())
        .then(data =>  console.log(data, 'soy data'))
        .catch(err => console.log(err, 'soy err'))

    return user
}

export const userRegister = async (credentials) => {
    
    let user

        await fetch(`${API_URL}/registro`, { method: 'POST', body: JSON.stringify({ username: credentials.username, password: credentials.password, email: credentials.email, nombre: credentials.nombre, direccion: credentials.direccion, telefono: credentials.telefono, edad: credentials.edad, foto: credentials.foto }) })
        .then(res => res.json())
        .then(data =>  console.log(data, 'soy data'))
        .catch(err => console.log(err, 'soy err'))

    return user
}

// acordarme de desisntalar AXIOS
const API_URL = 'http://localhost:8006/api/productos'

export const getProductos = async (id) => {
    
    let prods

    if(id != undefined) {
        await fetch(`${API_URL}/${id}`, { method: 'GET'})
        .then(res => res.json())
        .then(data => prods = data)
        .catch(err => console.log(err, 'soy err'))
    } else {
        await fetch(`${API_URL}/`, { method: 'GET'})
        .then(res => res.json())
        .then(data =>  prods = data)
        .catch(err => console.log(err, 'soy err'))
    }

    return prods
}

export const newProductos = async (form) => {

    let prods
    
        await fetch(`${API_URL}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)})
        .then(res => res.json())
        .then(data => prods = data)

    return prods
}

export const actualizarProd = async (data) => {

    let { nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock} = data
    console.log(data, 'soy data')
    let prods
    await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
    .then(res => res.json())
    .then(data => prods = data)

return prods
}

export const eliminarProd = async (id) => {

    let prods

    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => prods = data )

return prods
}
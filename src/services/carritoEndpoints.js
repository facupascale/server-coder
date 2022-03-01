const API_URL = 'http://localhost:8080/api/carrito'

export const crearCarrito = async () => {
    
    let cart

        await fetch(`${API_URL}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json())
        .then(data => cart = data)

    return cart
}

export const eliminarCarrito = async (id) => {
    
    let cart

        await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json())
        .then(data => cart = data)

    return cart
}

export const productosEnCarrito = async (id) => {
    
    let cart

        await fetch(`${API_URL}/${id}/productos`, { method: 'GET' })
        .then(res => res.json())
        .then(data => cart = data)

    return cart
}

export const agregarProductosCarrito = async (dataApi) => {
    
    let cart

        await fetch(`${API_URL}/${dataApi.id}/productos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataApi)})
        .then(res => res.json())
        .then(data => cart = data )

    return cart
}

export const borrarProductosCarrito = async (dataApi) => {
    console.log(dataApi)
    let cart

        await fetch(`${API_URL}/${dataApi.id}/productos/${dataApi.id_prod}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => cart = data )

    return cart
}
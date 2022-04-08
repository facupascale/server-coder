import React, { useEffect, useState } from 'react';
import { crearCarrito, eliminarCarrito, productosEnCarrito, borrarProductosCarrito } from '../services/carritoEndpoints';
import ProductList from '../components/productsList';

export default function Cart({ idCarrito, setIdCarrito, reloadProds, setReloadProds }) {

    const [productos, setProductos] = useState([])
    const cart = 'cart' 

    const createCart = async () => {
        try {
            let data = await crearCarrito()
            setIdCarrito(data.data[0].value._id)
        } catch(err) {
            console.log(err)
        }
    }

    const eliminateCart = async () => {
        try {
            let data = await eliminarCarrito(idCarrito)
            if (data.code == 200) {
                setIdCarrito(undefined)
                alert('Carrito eliminado con exito')
            } else {
                alert('Hubo un error, intente nuevamente')
            } 
        } catch(err) {
            console.log(err)
        }
    }

    const productList = async () => {
        try {
            let data = await productosEnCarrito(idCarrito)
            if (data.code == 200) {
                setProductos(data.data[0].productos)
            } else {
                alert('Hubo un error, intente nuevamente')
            } 
        } catch(err) {
            console.log(err)
        }
    }

    const eliminateProd = async (id) => {
        let dataApi = {
            id: idCarrito,
            id_prod: id,
        }
        try {
            let data = await borrarProductosCarrito(dataApi)
            if (data.code == 200) {
                alert('Producto eliminado con exito')
                setReloadProds(!reloadProds)
            } else {
                alert('Hubo un error, intente nuevamente')
            } 
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        productList()
    },[reloadProds])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span style={{ marginTop: '2%'}}>ID de Carrito: {idCarrito}</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <button onClick={createCart} style={{ marginTop: '2%', marginRight: '1%'}}>Crear Carrito</button>
                <button onClick={eliminateCart} style={{ marginTop: '2%', marginLeft: '1%'}}>Eliminar Carrito</button>
            </div>
            <button onClick={productList} style={{ marginTop: '1%'}}>Actualizar productos en Carrito</button>
            <ProductList productos={productos} cart={cart} eliminateProd={eliminateProd} />
        </div>
    )
}
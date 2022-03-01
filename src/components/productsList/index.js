import React, { useEffect, useState } from 'react'
import NewProducto from '../newProduct'
import { eliminarProd } from '../../services/productosEndpoints'

export default function ProductList({productos, reloadProds, setReloadProds, user, idCarrito, agregarAlCarrito, cart, eliminateProd }) {

    const [modifyProd, setModifyProd] = useState({
        modify: false,
        id: null
    })

    const eliminarProducto = async (id) => {
        try {
            const data = await eliminarProd(id)
            setReloadProds(!reloadProds)
            alert('Se elimino con exito!')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                productos !== undefined && productos.length > 0 ? productos.map(prod => (
                    <>
                        <div key={prod.id} style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            width: '30%',
                            height: '30%', 
                            backgroundColor: 'grey',
                            marginBottom: '1%', 
                            marginTop: '1%', 
                            marginLeft: '2%'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                                <img src={prod.fotoUrl} alt='Foto producto' style={{ resizeMode: 'contain'}}/>
                                <span>Nombre: {prod.nombre}</span>
                            </div>
                            <span>Descripcion: {prod.descripcion}</span>
                            <span>Precio: {prod.precio}</span>
                            <span>ID: {prod.id}</span>
                            <span>Stock: {prod.stock}</span>
                            {idCarrito !== undefined ? <button onClick={() => agregarAlCarrito(prod.id, idCarrito)}>Agregar al carrito</button> : null }
                            {user === 'Admin' ? <button onClick={() => setModifyProd({...modifyProd, modify: true, id: prod.id})}>Modificar</button> : null }
                            {user === 'Admin' ? <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button> : null}
                            {cart === 'cart' ? <button onClick={() => eliminateProd(prod.id)}>Eliminar producto del carrito</button> : null}
                        </div>
                            {modifyProd.modify ===  true && modifyProd.id === prod.id ? <NewProducto  producto={prod} reloadProds={reloadProds} setReloadProds={setReloadProds}/> : null}
                    </>
                ))
                : <span>No hay productos para mostrar...</span>      
            }
        </>
    )
}
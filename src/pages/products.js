import React, { useEffect, useState } from 'react';
import ProductList from '../components/productsList';
import NewProducto from '../components/newProduct';
import Cart from './cart';
import { getProductos } from '../services/productosEndpoints';
import { agregarProductosCarrito } from '../services/carritoEndpoints';

export default function Products({ user }) {
    const [reloadProds, setReloadProds] = useState(false)
    const [prods, setProds] = useState([])
    const [id, setId] = useState('')
    const [idCarrito, setIdCarrito] = useState(undefined)

    const productos = async () => {
        try {
            const data = id !== null ? await getProductos(id) : await getProductos();
            setProds(data.data)
            setId('')
        } catch(err) {
            console.log(err)
        }
    }

    const agregarAlCarrito = async (id, idCart) => {
        let dataApi = {
            id: id,
            idCart: idCart
        }
        try {
            let data = await agregarProductosCarrito(dataApi)
            data.code == 200 ? alert('Se agrego correctamente') : alert('Hubo un error, intente de nuevo mas tarde')
            setReloadProds(!reloadProds)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        productos();
    }, [reloadProds])

    return (
        <>  
            <span style={{ display: 'flex', alignSelf: 'center', marginTop: '3%', fontSize: 28, fontWeight: 800}}>{user}</span>
                <div style={{ marginTop: '5%', marginLeft: '2%', widht: '30%', display: 'flex', justifyContent: 'space-around'}}>
                    <input placeholder='Ingrese el ID del producto' type='number' value={id} onChange={e => setId(e.target.value)} />
                    <button onClick={productos}>Buscar producto</button>
                    <button onClick={() => productos()}>Mostrar todos los productos</button>
                </div>
            {user === 'Admin' && <NewProducto reloadProds={reloadProds} setReloadProds={setReloadProds}/>}
            {productos != undefined ? <ProductList productos={prods} reloadProds={reloadProds} setReloadProds={setReloadProds} user={user} agregarAlCarrito={agregarAlCarrito} idCarrito={idCarrito} /> : null }
            <Cart idCarrito={idCarrito} setIdCarrito={setIdCarrito} reloadProds={reloadProds}  setReloadProds={setReloadProds} />
        </>
    )
} 
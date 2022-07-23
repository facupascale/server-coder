import React, { useState } from 'react'
import { actualizarProd, newProductos } from '../../services/productosEndpoints'

export default function NewProducto({producto, reloadProds, setReloadProds}) {

    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        timestamp: '',
        codigo: '',
        fotoUrl: '',
        precio: '',
        stock: ''
    })

    const agregarProducto = async (e) => {
        e.preventDefault()
        try {
            const data = await newProductos(form)
            if(data.code == 200) {
                alert(data.message);
                setReloadProds(!reloadProds);
                setForm({
                    nombre: '',
                    descripcion: '',
                    timestamp: '',
                    codigo: '',
                    fotoUrl: '',
                    precio: '',
                    stock: ''
                });
            }  else {
                alert('Hubo un error')
            } 
        }catch (err) {
            console.log(err)
        }
    }

    const actualizarProducto = async (e) => {
        e.preventDefault();
        setForm({...form, 
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            timestamp: producto.timestamp,
            id: producto.id,
            codigo: producto.codigo,
            fotoUrl: producto.fotoUrl,
            precio: producto.precio,
            stock: producto.stock
        })
        try {
            const data = await actualizarProd(form)
                alert('Se actualizo con exito!');
                setReloadProds(!reloadProds);
                setForm({
                    nombre: '',
                    descripcion: '',
                    timestamp: '',
                    codigo: '',
                    fotoUrl: '',
                    precio: '',
                    stock: ''
                });
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: '3%', marginBottom: '3%'}}>
            <span style={{ marginBottom: '3%'}}>{producto ? 'Formulario de actualizacion del producto' : 'Formulario de ingreso de producto'}</span>
            <form onSubmit={(e) => producto !== undefined ? actualizarProducto(e) : agregarProducto(e)} style={{ display:' flex', alignItems: 'center', flexWrap: 'wrap', width: '90%', alignSelf: 'center', justifyContent: 'space-around'}}>
                <input type='text' placeholder='Ingresa el nombre' value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}/>
                <input type='text' placeholder='Ingresa el descripcion' value={form.descripcion}  onChange={e => setForm({...form, descripcion: e.target.value})}/>
                <input type='date' placeholder='Ingresa la fecha' value={form.timestamp}  onChange={e => setForm({...form, timestamp: e.target.value})}/>
                <input type='text' placeholder='Ingresa el codigo' value={form.codigo}  onChange={e => setForm({...form, codigo: e.target.value})}/>
                <input type='text' placeholder='Ingresa el url de la imagen' value={form.fotoUrl}  onChange={e => setForm({...form, fotoUrl: e.target.value})}/>
                <input type='number' placeholder='Ingresa el precio' value={form.precio}  onChange={e => setForm({...form, precio: e.target.value})}/>
                <input type='number' placeholder='Ingresa el stock' value={form.stock}  onChange={e => setForm({...form, stock: e.target.value})}/>
                <button>{producto != undefined ? 'Actualizar producto' : 'Agregar producto'}</button>
            </form>
        </div>
        
    )
}
let { db: firebaseDB } = require("../config/firebase/index");

    //getAll
    (async () => {
        try {
            let productos = await firebaseDB.collection('productos').get()
            let productosArray = []
            productos.forEach(doc => {
                productosArray.push({id: doc.id,
                    ...doc.data()})
            });
            console.log(productosArray, 'soy productos')
            return {code: 200, body: productos}
        } catch (err) {
            console.log(err, 'soy err')
        }
    })();

    //getById
    (async (id) => {
        try {
            let productoObject = {}
            let producto = await firebaseDB.collection('productos').doc('kuUW3sApKY7b1xzT67v6').get()
            productoObject = {id: producto.id, ...producto.data()}
            console.log(productoObject, 'soy producto con ID')
            return {code: 200, body: producto};
        } catch(err) {
            console.log(err, 'soy err')
        }
    })();

    //postAdd
    (async (nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock) => {
        try {
            //let producto = [{ nombre: nombre, timestamp: timestamp, id: id, descripcion: descripcion, codigo: codigo, fotoUrl: fotoUrl, precio: precio, stock: stock }]

            let productoEjemplo = [{ nombre: 'facundo', timestamp: Date.now(), descripcion: 1, codigo: 1, fotoUrl: 'ejemplo.com', precio: 200, stock: 1 }]
    
            let productos = firebaseDB.collection('productos')
            for( const product of productoEjemplo) {
                await productos.doc().set(product)
            }
            console.log('se agrego el producto')
            return { code: 200, message: 'Se inserto el producto exitosamente' }
            
        } catch (error) {
            console.log(error)
        }
    })();

    //updateById
    (async (nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock) => {
        try {
           // let producto = { nombre: nombre, timestamp: timestamp, id: id, descripcion: descripcion, codigo: codigo, fotoUrl: fotoUrl, precio: precio, stock: stock }
            let productoEjemplo = { nombre: 'nicolas', timestamp: Date.now(), descripcion: 2, codigo: 2, fotoUrl: '2.com', precio: 100, stock: 2 }
            let productoModificado = await firebaseDB.collection('productos').doc('kuUW3sApKY7b1xzT67v6').update(productoEjemplo)
            console.log('se modifico el producto')
            return productoModificado;
        } catch (err) {
            console.log(err, 'soy err')
        }
    })();
    
    //deleteById
    (async (id) => {
        try {
            let producto = await firebaseDB.collection('productos').doc('kuUW3sApKY7b1xzT67v6').delete()
            console.log('producto eliminado')
            return producto;
        } catch(err) { 
            console.log(err, 'soy err')
        }
    })();

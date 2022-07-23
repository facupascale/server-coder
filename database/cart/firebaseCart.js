let { db: firebaseDB } = require("../config/firebase/index");

//createCart
(async () => {
    try {
        let carrito = { id: Math.floor(Math.random() * 100), productos: [] }
        let cart = await firebaseDB.collection('carrito').doc().set(carrito)
        console.log('se creo el carrito')
        return {code: 200, message: 'Se creo el carrito con exito'}
    } catch (error) {
        console.log(error, 'soy error en createCart')
    }
})();

// DELETE: '/:id' => VACIA UN CARRITO Y LO ELIMINA
// deleteCart
(async (id) => {
    try {
        let id = 'SyN6UQAbp1l8f0W5srHM'
        let result = await firebaseDB.collection('carrito').doc(id).delete()
        console.log('se borro con exito')
        return {code: 200, message: 'Se elimino con exito'}
    } catch (err) {
        return {code: 407, message: 'Hubo un error, intente nuevamente'}
    }
})();

// GET: '/:id/productos' => lista todos los productos guardados en el carrito
//listProdCart
(async (id) => {
    try {
        let result = await firebaseDB.collection('carrito').doc('7Yb2BeojiOsmF5UAoVdE').get()
        let data = result.data()
        console.log(data, 'soy result en list prod cart')
        return {code: 200, message:  'Se listaron los productos con exito', data: data}
    } catch (err) {
        return err
    }
})();

// post: '/:id/productos' => incorpora productos al carrito por su id de producto
//addProdCart
(async (id, idCarrito) => {
    
        try {
            let id = '2czaHXi5GfaISEszRFpI'
            let idCarrito = '7Yb2BeojiOsmF5UAoVdE'
            console.log('me estoy ejecutandos')
            let producto = await firebaseDB.collection('productos').doc(id).get()
            let result = await firebaseDB.collection('carrito').doc(idCarrito).update({productos: producto.data()})
            console.log('se agrego el producto al carrito con exito')
            return {code: 200, message: 'Se agrego el producto con exito'}
        } catch(err) {
            console.log(err)
        }
})();

// delete: '/:id/productos/:id_prod' => eliminar un producto de lcarrito por su id de carrito y de producto
//deleteProdId
(async (id, id_prod) => {
        try {
            let id = '7Yb2BeojiOsmF5UAoVdE'
            let id_prod = '1'
            let result = await firebaseDB.collection('carrito').doc(id).detele({productos: {codigo: id_prod}})
            console.log('eliimino con exito')
            return {code: 200, message: 'Se elimino el producto con exito', data: result}
        } catch(err) {
            return err
        }
})();
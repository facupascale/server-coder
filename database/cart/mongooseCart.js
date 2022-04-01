let { mongoose } = require('../config/mongoDB');
let { Schema, model } = mongoose;
let {ProductoModel} = require('../products/mongooseProductos')

const cartSchema = new Schema({ productos: [{}]})

let cartSchemaModel = new Schema(cartSchema)

let CartModel = new model('Carrito', cartSchemaModel)

class ContenedorMongo {
    constructor(){}

    async createCart() {
        try {
            let cart = CartModel.create({})
            let result = await Promise.allSettled([cart])
            return {code: 200, message: 'Se creo el carrito con exito', data: result}
        } catch (error) {
            console.log(error, 'soy error en createCart')
        }
    }

    // DELETE: '/:id' => VACIA UN CARRITO Y LO ELIMINA
    async deleteCart(id) {
        try {
            let result = await CartModel.deleteOne({_id: id})
            return {code: 200, message: 'Se elimino con exito'}
        } catch (err) {
            return {code: 407, message: 'Hubo un error, intente nuevamente'}
        }
    }

    // GET: '/:id/productos' => lista todos los productos guardados en el carrito
    async listProdCart(id) {
        try {
            let result = await CartModel.find({ _id: id})
            console.log(result, 'soy result en list prod cart')
            return {code: 200, message:  'Se listaron los productos con exito', data: result}
        } catch (err) {
            return err
        }
    }

    // post: '/:id/productos' => incorpora productos al carrito por su id de producto
    async addProdCart(id, idCarrito) {
            try {
                let producto = await ProductoModel.findOne({id: id})
                let result = await CartModel.findOneAndUpdate({_id: idCarrito}, {$push: {productos: producto}})
                return {code: 200, message: 'Se agrego el producto con exito', data: result}
            } catch(err) {
                return err
            }
    }

    // delete: '/:id/productos/:id_prod' => eliminar un producto de lcarrito por su id de carrito y de producto
    async deleteProdId(id, id_prod) {
            try {
                let result = await CartModel.findOneAndUpdate({_id: id}, {$pull: {productos: {id: id_prod}}})
                console.log(result, 'soy result')
                return {code: 200, message: 'Se elimino el producto con exito', data: result}
            } catch(err) {
                return err
            }
    }
}

module.exports = { ContenedorMongo }
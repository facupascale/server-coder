let { mongoose } = require('../config/mongoDB');
let { Schema, model } = mongoose;

const productoSchema = new Schema({
    nombre: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now },
    precio: { type: Number, require: true },
    descripcion: { type: String, require: true },
    codigo: { type: String, require: true },
    fotoUrl: { type: String, require: true },
    id: { type: String, require: true },
    stock: { type: Number, require: true }
})

let productoSchemaModel = new Schema(productoSchema)

let ProductoModel = new model('Producto', productoSchemaModel)

class ContenedorMongo {
    constructor(){
    }

    async getAll() {
        try {
            const productos = await ProductoModel.find({})
            return {code: 200, body: productos}
        } catch (err) {
            console.log(err, 'soy err')
        }
    }

    async getById(id) {
        try {
            let producto = await ProductoModel.find({id: id})
            return {code: 200, body: producto};
        } catch(err) {
            console.log(err, 'soy err')
        }
    }

    async postAdd(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock) {
        try {
            const productosLength = await ProductoModel.find({})
            const inserciones = []
            let producto = [{ nombre: nombre, timestamp: timestamp, id: productosLength.length + 1, descripcion: descripcion, codigo: codigo, fotoUrl: fotoUrl, precio: precio, stock: stock }]
    
            for( const product of producto) {
                inserciones.push(ProductoModel.create(product))
            }
            const result = await Promise.allSettled(inserciones)

            let rejected = result.filter(res => res.status === 'rejected')
            
            if(rejected.length > 0) {
                return { error: 'Error al insertar el producto', code: 406 }
            } else {
                return { code: 200, message: 'Se inserto el producto exitosamente' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock) {
        try {
            let producto = { nombre: nombre, timestamp: timestamp, id: id, descripcion: descripcion, codigo: codigo, fotoUrl: fotoUrl, precio: precio, stock: stock }
            let productoModificado = await ProductoModel.findOneAndUpdate({ id: id }, producto, { new: true })
            return productoModificado;
        } catch (err) {
            console.log(err, 'soy err')
        }
    }
    
    async deleteById(id) {
        try {
            let producto = await ProductoModel.deleteOne({ id: id })
            return producto;
        } catch(err) { 
            console.log(err, 'soy err')
        }
    }
}

module.exports = { ContenedorMongo, ProductoModel}
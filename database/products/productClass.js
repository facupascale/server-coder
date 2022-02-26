const fs = require('fs')


// que props tiene productos => id, timestamp, nombre, descripcion, codigo, foto url, stock

// '/api/productos'

class Producto {
	constructor(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock) {
		this.nombre = nombre
		this.timestamp = timestamp
		this.id = id
		this.descripcion = descripcion
		this.codigo = codigo
		this.fotoUrl = fotoUrl
		this.precio = precio
		this.stock = stock
	}
}

class Contenedor {
	constructor(file = '') {
		this.file = file

		try {
			this.productos = fs.readFileSync(this.file, 'utf-8')
			this.productos = JSON.parse(this.productos)
		} catch (error) {
			this.productos = []
		}
	}

	// get: '/:id?' me permite listas todos los productos disponibles o un producto por su id (disponibles para usuarios y administradores)
	getAll() {
		if (this.productos.length > 0) {
			return {code: 200, message: 'Lectura exitosa', data: this.productos}
		} else {
			return {error: 'No hay ningun producto', code: 405}
		}
	}

	getById(id) {
		let findProduct = this.productos.find((prod) => prod.id == id)
		if (findProduct === undefined) {
			return {error: 'Producto no encontrado', code: 406}
		} else {
			return {code: 200, message: 'Se encontro el producto', data: findProduct}
		}
	}


	// post: '/' => incorpora productos al listado (solo admins)
	async postAdd(nombre, timestamp, id, codigo, fotoUrl, precio, stock) {
		try {
			let newProduct = new Producto(nombre, timestamp, id, codigo, fotoUrl, precio, stock)
			this.productos.push(newProduct)
			await fs.promises.writeFile(this.file, JSON.stringify(this.productos, null, '\t'), () => {

				return {code: 200, message: 'Se agrego el productos exitosamente'}
			})
		} catch (error) {
			return {code: 400, message: 'No se puedo guardar, intente nuevamente en unos minutos'}
		}
	}


	// put: '/:id' => actualizar un producto por su id (solo admins)
	async updateById(nombre, timestamp, id, codigo, fotoUrl, precio, stock) {
		try {

			let index = this.productos.findIndex((prod) => prod.id == id)
			this.productos[index] = {
				nombre: nombre,
				timestamp: timestamp,
				codigo: codigo,
				fotoUrl: fotoUrl,
				precio: precio,
				stock: stock,
				id: id
			}
			await fs.promises.writeFile(this.file, JSON.stringify(this.productos, null, '\t'), () => {
				return {code: 200, message: 'Se ha modificado con exito'}
			})
		} catch (error) {
			return {error: 'Producto no encontrado', code: 406}
		}
	}


	// delete: '/:id' => borra un producto por su id (solo admins)
	async deleteById(id) {
		try {
			let productos = this.productos.filter((prod) => prod.id != id)
			this.productos = productos
			await fs.promises.writeFile(this.file, JSON.stringify(this.productos, null, '\t'), () => {
				return {code: 200, message: 'Se ha borrado con exito'}
			})

		} catch (error) {
			return {code: 400, message: 'ID invalido'}
		}
	}

}

module.exports = {Contenedor, Producto} 

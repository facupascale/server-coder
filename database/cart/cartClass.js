const fs = require('fs')
const {Producto} = require('../products/productClass')

// '/api/carrito'

class Carrito {
	constructor(id, productos = []) {
		this.id = id
		this.productos = productos
	}
}

class ContenedorCarrito {
	constructor(file = '') {
		this.file = file

		try {
			this.carritos = fs.readFileSync(this.file, 'utf-8')
			this.carritos = JSON.parse(this.carritos)
		} catch(error) {
			this.carritos = []
		}
	}

	// POST: '/' => CREA UN CARRITO Y LO DEVUELVE
	async createCart() {
		try {
			let carrito = new Carrito(Math.floor((Math.random() * (100 - 1 + 1)) + 1))
		this.carritos.push(carrito)
		await fs.promises.writeFile(this.file, JSON.stringify(this.carritos, null, '\t'))
		return {code: 200, message: 'Se creo exitosamente', data: carrito}
	} catch (error) {
		return {code: 400, message: 'No se pudo crear el carrito'}
	}
}

	// DELETE: '/:id' => VACIA UN CARRITO Y LO ELIMINA
	async deleteCart(id) {
		let carrito = this.carritos.find((cart) => cart.id == id)
		try {
			if (carrito !== undefined) {
				let carritos = this.carritos.filter((cart) => cart.id != id)
				this.carritos = carritos
				await fs.promises.writeFile(this.file, JSON.stringify(this.carritos, null, '\t'))
				return {code: 200, message: 'Se elimino el carrito exitosamente'}
			} else {
				return {code: 407, message: 'ID invalido'}
			}
		} catch (error) {
			return {code: 500, message: 'Ha ocurrido un error, intente de nuevo en unos instantes'}
		}
	}

	// GET: '/:id/productos' => lista todos los productos guardados en el carrito
	listProdCart(id) {
		let carrito = this.carritos.find(cart => cart.id === id)
		if (carrito !== undefined) {
			return {code: 200, message: 'Se encontro el carrito', data: carrito}
		} else {
			return {code: 407, messag: 'ID invalido'}
		}
	}

	// FALTAN TERMINAR LAS DOS FUNCIONES QUE SIGUEN 

	// post: '/:id/productos' => incorpora productos al carrito por su id de producto
	async addProdCart(id, idCarrito,prodFile) {
		try {
			let producto = fs.readFileSync(prodFile, 'utf-8')
			producto = JSON.parse(producto)
			let addProd = producto.find((prod) => prod.id == id)
			let carritoIndex = this.carritos.findIndex(cart => cart.id == idCarrito)
			this.carritos[carritoIndex].productos.push(addProd)
			await fs.promises.writeFile(this.file, JSON.stringify(this.carritos, null, '\t'))
			return {code: 200, message: 'Se agregaron correctamente los productos'}
		} catch(error) {
			return {code: 406, message: 'El id del producto o del carrito no existe'}
		}
		// aca tengo que leer la bd.txt, parsear la info, buscar el producto por su id y agregarlo al carrito
	}

	// delete: '/:id/productos/:id_prod' => eliminar un producto de lcarrito por su id de carrito y de producto
	async deleteProdId(id, id_prod) {
		try {
			let cartIndex = this.carritos.findIndex((cart) => cart.id == id);
			let carritoFiltrado = this.carritos[cartIndex].productos.filter((prod) =>
				prod.id != id_prod)
			this.carritos[cartIndex] = {
				...this.carritos[cartIndex],
				productos: carritoFiltrado
			}
			await fs.promises.writeFile(this.file, JSON.stringify(this.carritos, null, '\t'))
			return { code: 200, message: 'Se elimino con exito el producto'}
		} catch(error) { 
			return {code: 406, message: 'Ha ocurrido un error, intente de nuevo mas tarde'}
		}
	}
	
}

module.exports = ContenedorCarrito

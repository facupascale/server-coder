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
	createCart() {
			let carrito = new Carrito(Math.floor((Math.random() * (100 - 1 + 1)) + 1))
			this.carritos.push(carrito)
			fs.writeFileSync(this.file, JSON.stringify(this.carritos, null, '\t'))
			return carrito

	}

	// DELETE: '/:id' => VACIA UN CARRITO Y LO ELIMINA
	deleteCart(id) {
		let carrito = this.carritos.find((cart) => cart.id == id)
			if (carrito !== undefined) {
				let carritos = this.carritos.filter((cart) => cart.id != id)
				this.carritos = carritos
				fs.writeFileSync(this.file, JSON.stringify(this.carritos, null, '\t'))
				return {code: 200, message: 'Se elimino el carrito exitosamente'}
			} else {
				return {code: 407, message: 'ID invalido'}
			}
	}

	// GET: '/:id/productos' => lista todos los productos guardados en el carrito
	listProdCart(id) {
		console.log(id)
		let carrito = this.carritos.find(cart => cart.id == id)
		console.log(carrito)
		console.log(this.carritos)
		if (carrito !== undefined) {
			return {code: 200, message: 'Se encontro el carrito', data: carrito}
		} else {
			return {code: 407, messag: 'ID invalido'}
		}
	}

	// post: '/:id/productos' => incorpora productos al carrito por su id de producto
	addProdCart(id, idCarrito,prodFile) {
			let producto = fs.readFileSync(prodFile, 'utf-8')
			producto = JSON.parse(producto)
			let addProd = producto.find((prod) => prod.id == id)
			let carritoIndex = this.carritos.findIndex(cart => cart.id == idCarrito)
			this.carritos[carritoIndex].productos.push(addProd)
			fs.writeFileSync(this.file, JSON.stringify(this.carritos, null, '\t'))
			return {code: 200, message: 'Se agregaron correctamente los productos'}
	}

	// delete: '/:id/productos/:id_prod' => eliminar un producto de lcarrito por su id de carrito y de producto
	deleteProdId(id, id_prod) {
		console.log(id)
			let cartIndex = this.carritos.findIndex(cart => cart.id == id);
			console.log(cartIndex)
			let carritoFiltrado = this.carritos[cartIndex].productos.filter((prod) =>
				prod.id != id_prod)
			this.carritos[cartIndex] = {
				...this.carritos[cartIndex],
				productos: carritoFiltrado
			}
			fs.writeFileSync(this.file, JSON.stringify(this.carritos, null, '\t'))
			return { code: 200, message: 'Se elimino con exito el producto'}
	}
	
}

module.exports = ContenedorCarrito

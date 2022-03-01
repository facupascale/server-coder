const ContenedorCarrito = require('./cartClass')
const express = require('express')
const {Router} = express
const routerCart = Router()


let contenedor = new ContenedorCarrito('bdCarrito.txt')

routerCart.post("/", (req, res, next) => {
	res.json(contenedor.createCart())
})

routerCart.delete("/:id", (req, res, next) => {
	let id = req.params.id
	res.json(contenedor.deleteCart(id))
})

routerCart.get("/:id/productos", (req, res, next) => {
	let id = req.params.id
	res.json(contenedor.listProdCart(id))
})

routerCart.post("/:id/productos", (req, res, next) => {
	let id = req.params.id
	let idCart = req.body.idCart
	let prodFile = 'productsDataBase.txt'
	res.json(contenedor.addProdCart(id, idCart, prodFile))
})

routerCart.delete('/:id/productos/:id_prod', (req, res, netx) => {
	let {id, id_prod} = req.params
	console.log(req.params)
	res.json(contenedor.deleteProdId(id, id_prod))
})

module.exports = routerCart

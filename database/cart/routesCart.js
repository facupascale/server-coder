const ContenedorCarrito = require('./cartClass')
const {ContenedorMongo} = require('./mongooseCart')
const express = require('express')
const {Router} = express
const routerCart = Router()


//let contenedor = new ContenedorCarrito('bdCarrito.txt')
let contenedor = new ContenedorMongo()

routerCart.post("/", async (req, res, next) => {
	let response = await contenedor.createCart()
	res.json(response)
})

routerCart.delete("/:id", async (req, res, next) => {
	let id = req.params.id
	let response = await contenedor.deleteCart(id)
	res.json(response)
})

routerCart.get("/:id/productos", async (req, res, next) => {
	let id = req.params.id
	let response = await contenedor.listProdCart(id)
	res.json(response)
})

routerCart.post("/:id/productos", async (req, res, next) => {
	let id = req.params.id
	let idCart = req.body.idCart
	//let prodFile = 'productsDataBase.txt'
	let response = await contenedor.addProdCart(id, idCart)
	res.json(response)
})

routerCart.delete('/:id/productos/:id_prod', async (req, res, netx) => {
	let {id, id_prod} = req.params
	let response = await contenedor.deleteProdId(id, id_prod)
	res.json(response)
})

// hacer ruta de checkout  para enviar por mail y wsp la orden al ADMIN Y al numero de telefono del usuario la confirmacion del mismo 

module.exports = routerCart

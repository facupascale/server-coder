const {Contenedor} = require('./productClass')
const {ContenedorMongo} = require('./mongooseProductos')
const express = require("express");
const {Router} = express
const router = Router()

// let contenedor = new Contenedor('productsDataBase.txt')
let contenedor = new ContenedorMongo()

router.get("/:id?", async (req, res, next) => {
	let id = req.params?.id
	let response
	if(id) {
		response = await contenedor.getById(id)
	} else {
		response = await contenedor.getAll()
	}
	res.status(200).json(response)
})

router.post("/", async (req, res, next) => {
	const {nombre, timestamp, descripcion, codigo, fotoUrl, precio, stock} = req.body
	if (nombre && timestamp && descripcion && codigo && fotoUrl && precio && stock) {
		await contenedor.postAdd(nombre, timestamp, descripcion, codigo, fotoUrl, precio, stock)
		res.status(200).json({code: 200, message: 'Se agrego con exito!'})
	} else {
		res.json({error: 'Comprobar que todos los datos requeridos han sido enviados', code: 400})
	}
})

router.put("/:id", async (req, res, next) => {
	const {nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock} = req.body
	let response 
	if (nombre && timestamp && id && descripcion && codigo && fotoUrl && precio && stock ) {
		response = await contenedor.updateById(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock)
		res.json(response)
	} else {
		res.json({error: 'Comprobar que todos los datos requeridos han sido enviados', code: 400})
	}
})

router.delete("/:id", async (req, res, next) => {
	let id = req.params.id
	let response = await contenedor.deleteById(id)
	res.json(response)
})

module.exports = router

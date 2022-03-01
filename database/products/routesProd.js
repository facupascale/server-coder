const {Contenedor} = require('./productClass')
const express = require("express");
const {Router} = express
const router = Router()

let contenedor = new Contenedor('productsDataBase.txt')

router.get("/:id?", (req, res, next) => {
	let id = req.params?.id
	id ? res.json(contenedor.getById(id)) : res.json(contenedor.getAll());
})

router.post("/", (req, res, next) => {
	const {nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock} = req.body
	if (nombre && timestamp  && id  && descripcion && codigo && fotoUrl && precio && stock) {
		contenedor.postAdd(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock)
		res.json({code: 200, message: 'Se agrego con exito!'})
	} else {
		res.json({error: 'Comprobar que todos los datos requeridos han sido enviados', code: 400})
	}
})

router.put("/:id", (req, res, next) => {
	const {nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock} = req.body
	if (nombre && timestamp && id && descripcion && codigo && fotoUrl && precio && stock ) {
		res.json(contenedor.updateById(nombre, timestamp, id, descripcion, codigo, fotoUrl, precio, stock))
	} else {
		res.json({error: 'Comprobar que todos los datos requeridos han sido enviados', code: 400})
	}
})

router.delete("/:id", (req, res, next) => {
	let id = req.params.id
	res.json(contenedor.deleteById(id))
})

module.exports = router

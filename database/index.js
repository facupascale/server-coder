const express = require("express");
const app = express();
const cors = require('cors')
const routerProducts = require('./products/routesProd')
const routerCart = require('./cart/routesCart')
const { config } = require('./config')

{/* const allowedOrigins = ['http://localhost:3000'];

const CorsOptions = {
  origin: allowedOrigins
}; */}

app.use(cors(`${config.cors}`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

const server = app.listen(config.port, () => {
	console.log(`Server on http://localhost:${config.port}`);
})

server.on("error", error => console.log(error))
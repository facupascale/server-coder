const express = require("express");
const app = express();
const cors = require('cors')
const PORT = 8080;
const routerProducts = require('./products/routesProd')
const routerCart = require('./cart/routesCart')

const allowedOrigins = ['http://localhost:3000'];

const CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(CorsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

const server = app.listen(PORT, () => {
	console.log(`Server on http://localhost:${server.address().port}`);
})

server.on("error", error => console.log(error))

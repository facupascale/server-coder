const express = require("express");
const app = express();
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { config } = require('./config')
const { mongo_db } = require('./config/index')
{/* const allowedOrigins = ['http://localhost:3000'];

const CorsOptions = {
  origin: allowedOrigins
}; */}


app.use(cors(`${config.cors}`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true, 
  store: MongoStore.create({ mongoUrl: mongo_db.mongo_atlas})
}))

// User login in and registration
app.use(passport.initialize());
app.use(passport.session());
const routerProducts = require('./products/routesProd')
const routerCart = require('./cart/routesCart')
const routerUser = require('./user/routesUser')

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)
app.use('/api/usuario', routerUser)

const server = app.listen(config.port, () => {
	console.log(`Server on http://localhost:${config.port}`);
})

server.on("error", error => console.log(error))
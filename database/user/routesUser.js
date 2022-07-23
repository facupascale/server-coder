const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer')
const uploadPhoto = multer({ dest: './public/userPhotos/' })
const { sendMailGmailWithOptions } = require('../libs/nodeMailer')
const { loggerWarn, loggerConsole } = require('../libs/loggerWinston');
const ContenedorCarrito = require('../cart/cartClass');
const contenedorCarrito = new ContenedorCarrito();
const { ContenedorMongo } = require('../products/mongooseProductos');
const ContenedorProductos = new ContenedorMongo();
const passport = require('./passport');

router.use(express.static('public'));

router.post('/registro', uploadPhoto.single('foto'),
    passport.authenticate('signup', { failureRedirect: '/api/usuario/failsignup', successRedirect: '/api/usuario/successingup' }),
)

router.get('/failsignup', (req, res) => {
    res.send('El usuario ya existe o hubo un error al crearlo');
})

router.get('/successingup', async (req, res) => {

    let lastUserAdded = await User.find({}).sort({ _id: -1 }).limit(1)

    const mailOptions = {
        from: 'The backend of the website <facupascale@gmail.com>',
        to: 'nicolaspascaleok@gmail.com',
        subject: 'New user',
        html: `<h4 style="color: blue;">User: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}, phone: ${lastUserAdded[0].phone}, fecha: ${new Date().toLocaleString()}</h4>`,
    }
    sendMailGmailWithOptions(mailOptions)
    res.send('Usuario registrado')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/usuario/faillogin', successRedirect: '/api/usuario/successlogin' }))

router.get('/faillogin', (req, res) => {
    res.json({message: 'Error al iniciar sesion'})
})

router.get('/successlogin', checkLoggedIn, async (req, res) => {
    // MODIFICAR LA BD PARA QUE SE ASOCIE CON LOS USUARIOS
    const user = req.user.username;
    const id = req.user.id || req.user._id;
    //const photo = req.user.foto || req.user?.photos[0]?.url;

    // const prodctosDB = await ContenedorProductos.getAll();
    // const productosEnCarrito = await contenedorCarrito.listProdCart()
    // const productosFiltrados = productosEnCarrito.filter(producto => producto.userId === id)

    res.json({ username: user, id })
})

// Middleware para comprobar si el usuario esta logueado
function checkLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        req.session.touch();
        loggerConsole.log('debug', 'Usuario logueado')
        next();
    } else {
        loggerWarn.log('warn', 'Usuario no logueado')
        res.send('Usuario no logueado')
    }
}

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ success: true, message: 'User logged out' });
});

router.get("/user", (req, res) => {
    if(req.user) {
        res.send({ succes: true, message: 'User logged', body: req.user}) // the req.user stores the entire user that has been authenticated inside of it
    } else {
        res.send({ success: false, message: 'User not logged in' })
    }
});


module.exports = router
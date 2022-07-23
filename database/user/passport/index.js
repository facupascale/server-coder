const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bCrypt = require('bcrypt');
const { loggerConsole, loggerError, loggerWarn } = require('../../libs/loggerWinston');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null,user);
});

// LocalStrategy con usuario y contraseña

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done) {
        User.findOne({ "username": username }, function(err, user) {
            loggerConsole.log('info', 'Usuario logueado: ' + username);
            if(err) return done(err);
            if(!user) {
                loggerWarn.log('warn', 'Usuario no encontrado: ' + username);
                return done(null, false, loggerConsole.log('warn', 'Usuario o contraseña invalida'));
            }
            if(!isValidPassword(user, password)) {
                loggerWarn.log('warn', 'contraseña invalida');
                return done(null, false, loggerConsole.log('message', 'Usuario o contraseña invalida'));
            }
            return done(null, user)
        });
    }
));

// Creacion de usuario
passport.use('signup', new LocalStrategy({ passReqToCallback: true},
    function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({'username': username}, (err, user) => {
                if(err) {
                    loggerWarn.log('warn', 'Error al crear usuario: ', err);
                    return done(err);
                }
                if(user) {
                    loggerConsole.log('debug', 'Usuario ya existe');
                    return done(null, false, loggerConsole.log('debug', 'Usuario ya existe'));
                }
                loggerConsole.log('debug', 'Usuario creado');
                var newUser = new User();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.nombre = req.body.nombre;
                newUser.email = req.body.email;
                newUser.telefono = req.body.telefono;
                newUser.direccion = req.body.direccion;
                newUser.edad = req.body.edad;

                //este es el path que devuelve multer
                console.log(req.file);
                newUser.foto = req.file;

                newUser.save((err) => {
                    if(err) {
                        loggerConsole.log('debug', 'Error al crear usuario: ', err);
                        loggerError.log('error', 'Error al crear usuario: ', err);
                        throw new Error;
                    }
                    loggerConsole.log('debug', 'Usuario creado');
                    return done(null, newUser);
                })
            })
        }
        process.nextTick(findOrCreateUser);
    }
));

const createHash =(password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});



module.exports = passport;
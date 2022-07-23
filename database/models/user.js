const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema= mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    direccion: { type: String,},
    edad: { type: Number},
    telefono: { type: Number },
    foto: { type: String },
});

// añadimos todas las caracteristicas de passport a nuestro schema

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
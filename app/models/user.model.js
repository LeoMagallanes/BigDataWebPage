// model es para permitirnos enlazar el modelo con nuestra base de datos.
// clase Schema es para generar la estructura de los usuarios.
const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    user: String,
    password: String
});

//Lo exportamos con el método model, 
module.exports = model('user', userSchema);
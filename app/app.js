const express = require('express'); //traer express
const pasth = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

require('dotenv').config(); //Cargamos las variables de entorno(PORT).
require('./config/db'); //Para conectar la base de datos

const app = express(); //Instanciamos express, para poder hacer la integración de las peticiones.

//Config. Para que recojamos los datos y podamos trabajar con ellos.
app.use(cors());
app.use(express.json()); // Le decimos que vamos a usar jsons.
app.use(express.urlencoded({extended: false})); // Le decimos que vamos a usar

// GET /api/users
// GET /api/password
app.use('/api', require('./routes/api')) //Todas las peticiones api las mandamos a api.js. Delegamos las llamadas api.


// Poner la aplicación a escuchar
const PORT = process.env.PORT || 3000; //Que lo agarre de las variables de entorno o lo ponga en el puerto 3000.
//le pasamos el puerto, podemos traerlo de las variables de entorno.
app.listen(PORT, () => { //callback
    console.log("Servidor escuchando en puerto ", PORT);
})

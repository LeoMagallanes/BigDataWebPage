//Encargado de gestionar todas las rutas que tiene nuestra api.
const router = require('express').Router(); //Nos va a permitir ir delegando y mandando peticiones.

router.use('/users', require('./api/users')); //Redirecciamos las llamadas a users.
router.use('/auth', require('./api/auth')); //Redirecciamos las llamadas de autenticación.

module.exports = router; //Lo exportamos para poder usarlo de fuera despues.
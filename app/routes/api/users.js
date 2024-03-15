//Encargado de gestionar todas las rutas que tiene nuestra api.
const router = require('express').Router(); //Nos va a permitir ir delegando y mandando peticiones.

const User = require('../../models/user.model');

//Gestionamos las peticiones de users.

router.get('/', async (req, res) =>{
    try {
        const users = await User.find(); // Con esto traemos todas las canciones.
        res.json(users);
    } catch(error){
        console.log("Dentro de users.js, no funciono");
        res.json({error: error.message});
    }
});
/*
router.get('/:userId', (req, res) =>{

});*/

module.exports = router; //Lo exportamos para poder usarlo de fuera despues.

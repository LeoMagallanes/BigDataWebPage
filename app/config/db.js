//Donde especificamos como se conecta nuestra aplicación con la base de datos de mongodb
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then( () => console.log("connection succesful..."))

//MONGO_URI="mongodb://127.0.0.1:27017/azureWebPage" 
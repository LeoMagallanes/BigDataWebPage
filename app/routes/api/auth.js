// routes/auth.js
const router = require('express').Router();
var bodyParser = require('body-parser');
const User = require('../../models/user.model');

var bodyParser = bodyParser.urlencoded({extended: false});

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username and password
    const user = await User.findOne({ user: username, password: password });

    if (user) {
      // User found, login successful
      res.status(200).json({ message: 'Login successful', user: user, redirectTo: '../../../../index.html', success: true });
      //Mandarlo a una pagina o enviar un mensaje que diga que se inicio correctamente.
    } else {
      // User not found or password incorrect
      res.status(401).json({ message: 'Invalid username or password', redirectTo: '../../../../pages/signup.html', success: false });
    }
  } catch (error) {
    // Internal server error
    console.error(error);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username, password);
    
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ user: username });

      console.log("Buscando si ya esta ese usuario");
      console.log(existingUser);
      if (existingUser) {   
        console.log("User already exists");     
        return res.status(400).json({ message: 'User already exists' });        
      }
  
      // Create a new user
      const newUser = new User({ user: username, password: password });
      await newUser.save();
  
      // User registration successful
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Internal server error
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;

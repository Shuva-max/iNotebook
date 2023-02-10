const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Shuvaisavery$goodcoder';   // my secret sing string 

// Route 1 : Create a User using: POST- "/api/auth/createuser"  , No login require
router.post('/createuser',[   //condition validation and errors msg
    body('name', "Name must contain atleast 3 charactors").isLength({min: 3}),
    body('email', "Enter a valid email id").isEmail(),
    body('password', "password must contain atleast 5 charactors").isLength({min: 5})
], async (req, res)=>{  // It is a async function
    //check the validation and if errors occured then send bad request with error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check wheather the user with the email is exists already 
    try {
        let user = await User.findOne({email: req.body.email});
        if (user){
            // Its very very important to white return otherwise our app will crase whenever user post a bad request
            return res.status(400).json({error:"Sorry a user with this email is already exists"});
        }

        //adding salt by creating bcrypt.genSalt() and create a hash call secPass which is actually store in my db
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a User in our database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
          })
        //   .then(user => res.json(user));
        
        //creating a token to new register user and give the token with my sing as response
        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});
        
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("Internal server errors!!");
    }
})


//Route 2 : compaire a user email and password : POST-"/api/auth/login"  , No login require
router.post('/login', [   //condition validation and errors msg
    body('email').isEmail(),
    body('password',"please enter the password!").exists()
], async(req, res)=>{   // It is a async function
    //check the validation and if errors occured then send bad request with error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        //searching user in db with the help off email
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error: "Please put the right credential..."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please put the right credential..."});
        }

        const data = {
                id:user.id
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});
    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server errors!!");
    }

})


module.exports = router ;
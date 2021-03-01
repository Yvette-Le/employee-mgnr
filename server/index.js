// require dotenv package to read the properties in the .env file.
// never upload .env file to git.
require('dotenv').config()
//import the express module
const express = require('express');
// import the path utils from Node.
const path = require('path')
const cors = require('cors')
const cookSession = require('cookie-session')
const { body, validationResult } = require('express-validator');

// Importing our Login Service Used With the POST Login Route
const loginService = require('./services/loginService')
const fileService = require('./services/fileService')
const { sign } = require('crypto');



// create an instance of express
const app = express()
 
// read the value of PORT NODE_EVN variable in the .env file
// when the index.js file starts up this file is read in and
// we can set configuration variables for the application.
const PORT =  process.env.PORT || 5000 

 
//Middleware For Cross Origin Resource Sharing --> our API is public so any computer can use it
app.use(cors())

//urlencoded is POST data
 app.use(express.urlencoded({extended:true}))
//tranfers json data between client and server
 app.use(express.json())

 //Session Middleware
 app.use(cookSession({
   name:"session",
   keys:['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
 }))

 //Setup Template Engine
 app.set('view engine', 'ejs')
 app.set('views', path.join(__dirname, './views'))
 

//Middleware Serving Static Pages from client directory

//joining the server and client folders together by running static files to server
//{extensions:['html, "htm"]} ignores .html or .htm extensions
//this is only for GET requests so POSTS will result in a 404 error
app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']})
);



//<-- ROUTING LOGIN MIDDLEWARE -->

 // dashboard is a protected route 
 //if session is valid then go to dashboard, if invalid then redirect to login
 app.get('/dashboard', (req, res)=>{
          if(req.session.isValid){
            res.render('dashboard')
          }else{
           res.redirect('/login')
          }
 })

 app.get('/login', (req, res)=>{
   // rendering template from views directory
   res.render('login', {passwordWarning:"", emailWarning:"", email:"", password:""})

 })
 app.post('/login', (req, res)=>{
   // object creating for name value pairs --> requesting content from body
    const credentials = {
      email:req.body.email,
      password:req.body.password
    }
    // isValidUser uses loginService to see if data entered is valid
    const isValidUser =  loginService.authenticate(credentials)
   
       //if isValidUser has a user returned
       if( isValidUser.user !== null){
             // setting a session value isValid
             if(!req.session.isValid){
                 req.session.isValid = true;
             }
             res.redirect('dashboard')
       }

       if(isValidUser.user === null){
         // if user does not exist then display errors
           res.render('login', {
             emailWarning:isValidUser.emailWarning, 
             passwordWarning:isValidUser.passwordWarning,
             email:req.body.email,
             password:req.body.password
            })
       }
  })
    
 
 app.post('/login', (req, res)=>{
// requesting form values from body
   const credentials = {
     email:req.body.email,
     password:req.body.password
    }
  
    const isValidUser = loginService.authenticate(credentials)
   
    res.end()
 })

//<-- ROUTING SIGN UP PAGE MIDDLEWARE -->

//rendering the sign up page from views directory
app.get('/signup', (req, res)=>{
  res.render('signup')
})

app.post('/signup',
// form validation --> checking for min length and valid email
body('name')
.isLength({min:3})
.withMessage('Name must be at least 3 characters'),
body('email')
.isEmail()
.withMessage('Enter a valid email'),
body('password').isLength({min:5})
.withMessage('Password must be at least 5 characters'),
(req, res)=>{

  //if there are errors, do not submit the form
  const errors = validationResult(req)

  //render error messages if sign up not OK --> will be displayed on client side
  if (!errors.isEmpty()) {
    const alert = errors.array()
    res.render('signup', {
      alert
    })
  }

  //redirecting to login if sign up OK
  res.redirect('login')

  //requesting form content from body
  const formContent = {
    name: req.body.name ,
    email:req.body.email,
    password:req.body.password
   }

   //writing form data into users.json file
   const newUser = fileService.writeFileContents('../data/users.json', formContent, null, 2)
    newUser
})

app.get('/users', function(req, res) {
  res.render('users')
});

// <-- FINAL MIDDLEWARE: 404 ERROR -->

//catches any request not defined by the above middlewares and returns 404.html from client directory 
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});


//telling express to listen for incoming requests on specific port
app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});

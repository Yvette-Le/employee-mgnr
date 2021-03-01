# Employee Manager

- This app uses node and express in order to register a new user. Upon valid registation, the user will be redirected to a login page where they can enter their credentials. 
- If login validation is completed, users will be redirected to a dashboard page.
- The dashboard page will allow users to manage their accounts

### Installation
- Use NPM to install all modules
```
npm install
```
- We used the following modules which can be found in the following links:
[Express](https://expressjs.com/), [Express Validator](https://www.npmjs.com/package/express-validator), [CORS](https://www.npmjs.com/package/cors), [Cookie Session](https://www.npmjs.com/package/cookie-session)

### Usage
- Bringing in all modules required
``` 
require('dotenv').config()
const express = require('express');
const path = require('path')
const cors = require('cors')
const cookSession = require('cookie-session')
const { body, validationResult } = require('express-validator');
```
-Using all modules required to run app
```
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookSession({
   name:"session",
   keys:['SDFLU9iw2308dlsfuwe2adfl', 'LDFA34gsdfgFOPW2323DA7FS2']
 }))

 //setup templating Engine
 app.set('view engine', 'ejs')
 app.set('views', path.join(__dirname, './views'))

//joining the server and client folders together by running static files to server
 app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']})
);
```
- Importing our login service used with the POST login route
```
const loginService = require('./services/loginService')
```
- Use GET to render login page from views directory
```
app.get('/login', (req, res)=>{
   res.render('login')
 })
```
- Use POST to request the data in the body by the name identified
```
 app.post('/login', (req, res)=>{
    const credentials = {
      email:req.body.email,
      password:req.body.password
    }
```
### License
- MIT


 


 
  
//fileService brings in the read and write abilities
const fileService = require('./fileService')

//authenticate the email and password --> will return true if valid and false if invalid
exports.authenticate = (credential)=>{
 
 //taking data from users.json and making a copy to credentials
   const {email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
   
 //reducing the array to a single value
   const authUser =  users.reduce((authObj, user)=>{

    //if email entered matches existing data then return true, otherwise return false
    if(user.email === email){
      authObj.validEmail = true;
    }else{
       // email error
    }

      //if password entered matches existing data then return true, otherwise return false
    if(user.password === password){
      authObj.validPassword = true;
    }else{
      // password error
    }

    //if valid email and valid password then initial value equals current value
    if(authObj.validEmail===true && authObj.validPassword===true){
        authObj.user = user;
    }
         
    return authObj

   }, {validEmail:false, validPassword:false, user:null})

//short if() else statement - tertiary operator
//                                               true : false
   const auth0 = authUser.user ? {user:authUser.user}: formatErrors(authUser);
   return auth0
}
 
//validation messages
const formatErrors = function(user){
  let passwordWarning = ""
  let emailWarning = ""

  //if email and password is not valid then this will be the warning messages shown
  if(user.validPassword === false){passwordWarning= `Incorrect password`}
  if(user.validEmail === false){ emailWarning= `Incorrect email`}

  return {user:null, emailWarning, passwordWarning}
}

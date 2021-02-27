const fileService = require('./fileService')

const checking = (allOK) =>{
const {email, password} = {...allOK}
const newUser = fileService.getFileContents('../data/users.json')
console.log(newUser)
}

checking({email:"test@test.com", password:"hello"})
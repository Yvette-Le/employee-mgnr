const fs = require('fs')
const path = require('path')

exports.getFileContents = (filePath)=>{
    //parse takes json data and converts to an array of objects
   let fileContents = fs.readFileSync(path.join(__dirname, filePath))
   fileContents = JSON.parse(fileContents)
   return fileContents
     
}

//fileContents is an array of objects, so you have to convert back to json data when writing
exports.writeFileContents = (filePath, data) =>{
    let fileContents = fs.readFileSync(path.join(__dirname, filePath))
    fileContents = JSON.parse(fileContents)
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)

}


 

 
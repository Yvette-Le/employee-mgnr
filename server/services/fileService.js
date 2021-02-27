/* 
       Read and Write File Utility
       Commonjs Modules
       exports.funcName = ()=>{}

       import
       require('module name)


       use readFileSync and writeFileSync
    
*/

const fs = require('fs')
const path = require('path')


exports.getFileContents = (filePath)=>{
    //parse takes json data and converts to an array of objects
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   return fileContents
     
}


exports.writeFileContents = (filePath, data) =>{
    let fileContents = getFileContents(filePath)
    fileContents.push(data)

    //fileContents is an array of objects, so you have to convert back to json data
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
}




 

 
const path = require('path');

// process.mainModule.filename - gives us the path to the file 
// that is responsible to the fact that our application is running
// so it will be the root directory
module.exports = path.dirname(process.mainModule.filename);
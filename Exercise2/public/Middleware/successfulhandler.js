const http = require('http')

let successfulhandler = (req, res, next) => {
    if (res.statusCode > 199 && res.statusCode < 300) {
        console.log(`the server has responded with the code ${res.statusCode} and has succesfully run`)
        next()
    } else {
        next()
    }
}

module.exports = successfulhandler
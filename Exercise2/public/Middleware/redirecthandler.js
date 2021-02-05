const http = require('http')

let redirecthandler = (req, res, next) => {
    console.log(res.statusCode)
    if (res.statusCode > 299 && res.statusCode < 400) {
        console.log(`the server has throw the error code ${res.statusCode} and will now redirect you`)
        res.writeHead(301,{location: '/'})
        res.end()
        next()
    } else {
        next()
    }
}

module.exports = redirecthandler
const http = require('http')

let informationhandler = (req, res, next) => {
    if (res.statusCode > 99 && res.statusCode <200) {
        console.log(`The server has returned ${res.statusCode} and will continue`)
        next()
    } else {
        next()
    }
}
module.exports = informationhandler
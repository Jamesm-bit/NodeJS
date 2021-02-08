const http = require('http')

let clienterrorhandler = (req, res, next) => {
    if (res.statusCode > 399 && res.statusCode < 500) {
        res.render('what you are looking for does not exist please check what you are trying to check')
    } else {
        next()
    }
}

module.exports = clienterrorhandler
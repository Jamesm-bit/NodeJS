const http = require('http')

let servererrorhandler = (req, res, next) => {
    if (res.statusCode > 499) {
        res.render('the server is experiencing issues please try again in a few minuets or contact support')
    } else {
        next()
    }
}

module.exports = servererrorhandler
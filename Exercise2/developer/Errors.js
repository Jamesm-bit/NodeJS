const informationhandler = require('./Middleware/informationhandler.js')
const successfulhandler = require('./Middleware/successfulhandler.js')
const redirecthandler = require('./Middleware/redirecthandler.js')
const clienterrorhandler = require('./Middleware/clienterrorhandler.js')
const servererrorhandler = require('./Middleware/servererrorhandler.js')
const notfoundhandler = require('./Middleware/404Error.js')
const badrequesthandler = require('./Middleware/400Error.js')

const errorHandler = (error, req, res, next) => {
    informationhandler(error,res,next)
    successfulhandler(error,res,next)
    redirecthandler(error,res,next)
    clienterrorhandler(error,res,next)
    servererrorhandler(error,res,next)
    notfoundhandler(error,res,next)
    badrequesthandler(error,res,next)
}
module.exports = errorHandler
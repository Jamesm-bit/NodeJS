const fileSystem = require('fs')
const util = require('util')
const log_File = fileSystem.createWriteStream(__dirname + '/request.log', { flags: 'w' })

// when a request is logged it writes the ip that made the request as well as the type of request to a log file
let requestLogger = (req, res, next) => {
    log_File.write(util.format(`the ip ${req.ip} made a ${req.method} request`) + '\n')
    next()
}

module.exports = requestLogger
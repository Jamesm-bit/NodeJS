const fileSystem = require('fs')
const util = require('util')
const log_File = fileSystem.createWriteStream(__dirname + '/request.log', { flags: 'w' })


let requestLogger = (req, res, next) => {
    log_File.write(util.format(`the ip ${req.ip} made a ${req.method} request`) + '\n')
    next()
}

module.exports = requestLogger
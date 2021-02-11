const createError = require('http-errors')

//checks for a 400 error and send text to the server notifing user of the error
let badrequestlogger = (error, res, next) => {
    console.log('reached the 400 error handler')
    if (error.status === 400) {
        console.log('Error status: ', error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json({ message: error.message })
    }
    return 'no errors found'
}

module.exports = badrequestlogger

//checks for 400 errors and send a message to the user notifing of the error
let clienterrorhandler = (error, res, next) => {
    console.log('reached the 400 handler')
    if(error.status > 399 && error.status < 500 && error.status != 404 && error.status != 400) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('error code 400 has been thrown')
        res.send('400 error')
    } else {
        next()
    }
}

module.exports = clienterrorhandler

//if the request is succesful it logs it in the server console and continues
let successfulhandler = (error, res, next) => {
    console.log('reaching the 200 handler')
    if(error.status > 199 && error.status < 300) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('error code 200 has been thrown')
        res.send('200 error')
    } else {
        next()
    }
}

module.exports = successfulhandler
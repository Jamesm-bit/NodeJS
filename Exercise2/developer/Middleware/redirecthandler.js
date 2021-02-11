
//checks for 300 errors and redirects to the home page.
let redirecthandler = (error, res, next) => {
    console.log('reached the 300 handler')
    if(error.status > 299 && error.status < 400) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('error code 300 has been thrown')
        res.send('300 error')
    } else {
        next()
    }
}

module.exports = redirecthandler
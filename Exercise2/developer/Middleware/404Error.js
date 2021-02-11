
// this checks for a 404 error and sends a messages communicating an error
const notfoundlogger = (error,res,next) => {
    console.log('reached the 404 error')
    if(error.status === 404) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('{message:error.message}')
    } else {
        next()
    }
}

module.exports = notfoundlogger
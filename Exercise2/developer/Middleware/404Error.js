
// this checks for a 404 error and sends a messages communicating an error
const notfoundlogger = (req,res,next) => {
    console.log(res.statusCode)
    if(res.statusCode === 404) {
        res.status(404).end('<h1>This was not found</h1>')
    } else {
        next()
    }
}

module.exports = notfoundlogger

//checks for a 400 error and send text to the server notifing user of the error
let badrequestlogger = (req,res,next) => {
    if(res.statusCode === 400) {
        res.status(400).end('<h1>This is a Bad Request</h1>')
    } else {
        next()
    }
    
}

module.exports = badrequestlogger
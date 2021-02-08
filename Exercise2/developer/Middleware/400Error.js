let badrequestlogger = (req,res) => {
    console.log('400 error')
    res.status(400).end('<h1>This is a Bad Request</h1>')
}

module.exports = badrequestlogger
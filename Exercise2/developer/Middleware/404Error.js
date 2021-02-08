let notfoundlogger = (req,res) => {
    res.status(404).end('<h1>This was not found</h1>')
}

module.exports = notfoundlogger
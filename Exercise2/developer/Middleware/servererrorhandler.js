
// if the server returns an error code higer than 500 it tells the user that the server is having server issues
let servererrorhandler = (error, res, next) => {
    console.log('reached the 500 error')
    if(error.status > 499 ) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('error code 200 has been thrown')
        res.send('500 error')
    } else {
        next()
    }
}

module.exports = servererrorhandler
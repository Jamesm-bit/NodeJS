
//checks for 100 error codes and returns them without preventing running
let informationhandler = (error, res,next) => {
    console.log('reaching the 100 handler')
    if(error.status > 99 && error.status < 200) {
        console.log('Error status: ',error.status)
        console.log('Message: ', error.message)
        res.status(error.status)
        res.json('error code 100 has been thrown')
        res.send('100 error')
        return 100
    } else {
        next()
    }
    
}
module.exports = informationhandler
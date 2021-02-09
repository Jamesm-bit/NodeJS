
//checks for 400 errors and send a message to the user notifing of the error
let clienterrorhandler = (req, res, next) => {
    if (res.statusCode > 399 && res.statusCode < 500) {
        res.render('what you are looking for does not exist please check what you are trying to check')
    } else {
        next()
    }
}

module.exports = clienterrorhandler
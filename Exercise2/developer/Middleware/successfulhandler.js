
//if the request is succesful it logs it in the server console and continues
let successfulhandler = (req, res, next) => {
    if (res.statusCode > 199 && res.statusCode < 300) {
        console.log(`the server has responded with the code ${res.statusCode} and has succesfully run`)
        next()
    } else {
        next()
    }
}

module.exports = successfulhandler
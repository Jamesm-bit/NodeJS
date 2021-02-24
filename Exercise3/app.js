require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintexPassword = 'not_bacon';
const jwt = require('jsonwebtoken')



require('./passport-setup.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const PORT = process.env.PORT || 5000

try {
    mongoose.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
} catch (error) {
    console.log(' The mongoose clients has not connected and threw this error: ', error)
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model('User', userSchema)

// used to get all users in the database
async function getAllUsers() {
    return await User.find()
}

//used to sheck if an inputted user is in the database and if it is send an access token to the html
async function checkforuser(userName, userPassword, userEmail) {
    let usersList = await getAllUsers()
    let user = {
        userName,
        userPassword,
        userEmail
    }
    return new Promise(resolve => {
        for(item in usersList){
            bcrypt.compare(userPassword, usersList[item].password, function (err, result) {
                if (result) {
                    console.log('the password matched something in the data base')
                    if (userName == usersList[item].username || userEmail == usersList[item].email) {
                        //console.log('the username matched somthing in the data base at the same posisition as the password '+userName+' '+usersList[item].username)
                        console.log('the email matched something at the same postion as the password ')
                        try {
                            const token = jwt.sign({user},'secretkey')
                            resolve(token)
                        } catch {
                            resolve('An error occured getting the token')
                        }
                    }
                }
            })
        }
        resolve('user not found')
    }) 
}

//adds the user to the database
async function addUser(userName, userPassword, userEmail) {
    const user = new User({
        username: userName,
        password: userPassword,
        email: userEmail
    })
    try {
        const result = await user.save()
    } catch (err) {
        console.log('There was an error when adding the name to the data base and it threw this error: ', err)
    }
}

//looks for the requested user in the data base and if the function cant find it then the function adds the user to the database
async function findUser(res, userName, userPassword, userEmail) {
    console.log(userName)
    const userNameFind = await User.find({ user: userName })
    const userEmailFind = await User.find({ email: userEmail })
    if (userNameFind.length == 0 && userEmailFind.length == 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(userPassword, salt, function (err, hash) {
                addUser(userName, hash, userEmail)
            })
        })
    } else {
        res.end()
    }
    res.redirect('http://localhost:5000/')
}

//when a user signs up it takes the inputted username, password and email
app.post('/signup', (req, res) => {
    findUser(res, req.body.username, req.body.password, req.body.email)
})

//sends the html for the home screen to the browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/index.html'));
})

app.post('/', async (req, res) => {
    let returnedtoken = await checkforuser(req.body.username,req.body.password,req.body.email) 
    console.log(returnedtoken)
})

//sends the html for the sign up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/signup.html'));
})

//sends the list of all the users in the database to the browser
app.get('/users', async (req, res) => {
    const allUsers = await getAllUsers()
    res.json(allUsers)
})

//used for the google authentication
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

//used for the facebook authentication
app.get('/facebook', passport.authenticate('facebook'))

//used for the github authentication
app.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

//used to tell the user they are signed in
app.get('/signedin', (req, res) => {
    res.json('Logged in')
})

//verifys the token sent and if it is good it redirects to the signed in screen
app.get('/homesignin', (req,res) => {
    jwt.verify(req.headers.authorization,'secretkey',(error,authData) => {
        if(error) {
            res.status(403).json('your credentials were not authorized either because they were incorrect or because you tried to access something incorrectly')
        } else {
            res.json('you are signed in');
        }
    })
})

app.use(express.static(path.join(__dirname, 'public/')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
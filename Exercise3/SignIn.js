require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const path = require('path')
const bodyParser = require('body-parser');
const passport = require('passport');

require('./passport-setup.js')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

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

async function getAllUsers() {
    return await User.find()
}
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

async function findUser(res, userName, userPassword, userEmail) {
    console.log(userName)
    const userNameFind = await User.find({ user: userName })
    const userEmailFind = await User.find({ email: userEmail })
    if (userNameFind.length == 0 && userEmailFind.length == 0) {
        addUser(userName, userPassword, userEmail)
    } else {
        res.end()
    }
    res.redirect('http://localhost:5000/')
}

app.post('/signup', (req, res) => {
    findUser(res, req.body.username, req.body.password, req.body.email)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/index.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/signup.html'));
})

app.get('/users', async (req,res) => {
    const allUsers = await getAllUsers()
    res.json(allUsers)
})

app.get('/google', passport.authenticate('google', {scope:['profile','email']}))

app.get('/facebook', passport.authenticate('facebook'))

app.get('/github', passport.authenticate('github', { scope: ['user:email']}))

app.get('/signedin', (req,res) => {
    res.json('Logged in')
})
app.use(express.static(path.join(__dirname, 'public/')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
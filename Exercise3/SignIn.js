const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const path = require('path')

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

const user = mongoose.model('User', userSchema)

async function addUser(userName, userPassword, userEmail) {
    const user = new user({
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

async function findUser(userName, userPassword, userEmail) {
    const userName = await user.find({ user: userName })
    const userEmail = await user.find({ email: userEmail })
    if (userName.length == 0 || userEmail == 0) {
        addUser(userName, userPassword, userEmail)
    } else {
        res.end()
    }
}

app.post('/signup', (req, res) => {
    console.log(req.body)
    /*
    findNames(req.body.username, req.body.password, req.body.email)
    */
    res.json('Added')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/index.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML/signup.html'));
})

app.use(express.static(path.join(__dirname, 'public/')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
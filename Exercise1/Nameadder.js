const mongoose = require('mongoose');
const http = require('http')
const fs = require('fs');
const express = require('express');
const path = require('path')
const app = new express()
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const nameSchema = new mongoose.Schema({
    id: Number,
    fname: String,
    lname: String
});
const Name = mongoose.model('Name', nameSchema)

async function updateName(f, l) {

}

async function addName(i, f, l) {
    let fname = toString(f)
    const name = new Name({
        id: i,
        fName: 'fname',
        lName: 'toString(l)'
    })
    console.log(name)
    const result = await Name.create({
        id: i,
        fName: fname,
        lName: toString(l)
    })
    console.log(result)
}

app.post('/', (req, res) => {
    const findName = Name.findById(req.body.id)
    if (!findName) {
        findName.set({
            fName: req.body.fName,
            lName: req.body.lName
        })
    } else {
        addName(req.body.id, req.body.fName, req.body.lName)
    }
})

app.get('/', (req, res) => {
    console.log('get request recived')
    res.send('Test')
})

app.use(express.static(path.join(__dirname, 'html')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

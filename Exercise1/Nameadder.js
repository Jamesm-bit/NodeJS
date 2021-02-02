const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = new express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db = null
let namesCollection = null
const PORT = process.env.PORT || 5000

MongoClient.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        db = client.db('Users')
        namesCollection = db.collection('names')
    })
mongoose.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const nameSchema = new mongoose.Schema({
    id: Number,
    fName: String,
    lName: String
});
const Name = mongoose.model('Name', nameSchema)



async function addName(i, f, l) {
    const name = new Name({
        id: i,
        fName: f,
        lName: l
    })
    const result = await name.save()
}

async function findNames(i, f, l) {
    const name = await Name
        .find({ id: i })
    if (name.length == 0) {
        addName(i, f, l)
    } else {
        const result = await Name.findOneAndUpdate({ id: i }, {
            fName: f,
            lName: l
        },{useFindAndModify: false})
    }

}

async function deleteName(i) {
    const result = await Name.findOneAndDelete({id:i}, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
        }
    })
}

app.post('/', (req, res) => {
    findNames(req.body.id, req.body.fName, req.body.lName)
    res.json('Added')
})

app.post('/delete', (req,res) => {
    console.log(req.body.id+" deleted at this index")
    deleteName(req.body.id)
    res.json('deleted item')
})

app.get('/names', (req, res) => {
    const allNames = db.collection('names').find().toArray()
        .then(result => {
            res.json(result)
        }).catch(error => console.error(error))
})

app.use(express.static(path.join(__dirname, 'html')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
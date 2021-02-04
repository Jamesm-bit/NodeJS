const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = new express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db = null
let namesCollection = null
const PORT = process.env.PORT || 5000

try {
    MongoClient.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            db = client.db('Users')
            namesCollection = db.collection('names')
        })
        console.log('MongoClient connected')
} catch (error) {
    console.log('The mongo Client has not connected and threw this error: ', error)
}
try {
    mongoose.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
} catch (error) {
    console.log(' The mongoose clients has not connected and threw this error: ', error)
}




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const nameSchema = new mongoose.Schema({
    id: Number,
    fName: String,
    lName: String
});
const Name = mongoose.model('Name', nameSchema)

async function getAllNames() {
    console.log(db.collection('names').find().toArray())
    return db.collection('names').find().toArray()
}

async function addName(i, f, l) {
    const name = new Name({
        id: i,
        fName: f,
        lName: l
    })
    try {
        const result = await name.save()
    } catch(err) {
        console.log('There was an error when adding the name to the data base and it threw this error: ',err)
    }
    
}

async function findNames(i, f, l) {
    const name = await Name
        .find({ id: i })
    if (name.length == 0) {
        addName(i, f, l)
    } else {
        try {
            const result = await Name.findOneAndUpdate({ id: i }, {
                fName: f,
                lName: l
            }, { useFindAndModify: false })
        } catch(err) {
            console.log('there was an error when updating and it threw this error: ',err)
        }   
    }
}

async function deleteName(i) {
    const result = await Name.findOneAndDelete({ id: i }, (err, docs) => {
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

app.post('/delete', (req, res) => {
    console.log(req.body.id + " deleted at this index")
    deleteName(req.body.id)
    res.json('deleted item')
})

app.get('/names', (req, res) => {
    try {
        const allNames = getAllNames()
        .then(result => {
            res.json(result)
        })
        console.log(allNames)
    } catch(err) {
        console.log(err)
        res.send('There was an issue with getting the database')
    }
})

app.use(express.static(path.join(__dirname, 'HTML')))
app.use(express.static(path.join(__dirname, 'JavaScript')))
app.use(express.static(path.join(__dirname, 'CSS')))
app.use(express.static(path.join(__dirname, 'CSS')))
app.use(express.static(path.join(__dirname, 'Middleware')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
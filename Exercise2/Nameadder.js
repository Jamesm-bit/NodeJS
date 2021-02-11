const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = new express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createError = require('http-errors')
const requestLogger = require('./developer/Middleware/requestlogger.js')
const informationhandler = require('./developer/Middleware/informationhandler.js')
const successfulhandler = require('./developer/Middleware/successfulhandler.js')
const redirecthandler = require('./developer/Middleware/redirecthandler.js')
const clienterrorhandler = require('./developer/Middleware/clienterrorhandler.js')
const servererrorhandler = require('./developer/Middleware/servererrorhandler.js')
const notfoundhandler = require('./developer/Middleware/404Error.js')
const badrequesthandler = require('./developer/Middleware/400Error.js')
const errorCodes = require('./developer/Middleware/Errors.js')


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

// returns all the items in the MongoDB server
async function getAllNames() {
    return await Name.find()
}

//takes an inputed id, first name and last name and adds them to the database
async function addName(idNum, firstName, lastName) {
    const name = new Name({
        id: idNum,
        fName: firstName,
        lName: lastName
    })
    try {
        const result = await name.save()
    } catch(err) {
        console.log('There was an error when adding the name to the data base and it threw this error: ',err)
    }
    
}

// checks to see if an name exists at a particular id and if it does updates at that index other wise it creates at the specific id
async function findNames(idNum, firstName, lastName) {
    const name = await Name
        .find({ id: idNum })
    if (name.length == 0) {
        addName(idNum, firstName, lastName)
    } else {
        try {
            const result = await Name.findOneAndUpdate({ id: idNum }, {
                fName: firstName,
                lName: lastName
            }, { useFindAndModify: false })
        } catch(err) {
            console.log('there was an error when updating and it threw this error: ',err)
        }   
    }
}

// deletes an entry at a specific id number
async function deleteName(idNum) {
    try{
        const result = await Name.findOneAndDelete({ id: idNum }) 
    } catch(err) {
        console.log('Error when deleteing the feild: ', err)
    }
    
}

// when someone calls a post request to the default directory it adds the passed first name, last name and id to the fundNames function
app.post('/', (req, res) => {
    findNames(req.body.id, req.body.fName, req.body.lName)
    res.json('Added')
})

// when an id is posted to the /delete directory it passes the id to the deleteName function
app.post('/delete', async (req, res) => {
    console.log(req.body.id + " deleted at this index")
    await deleteName(req.body.id)
    res.json('deleted item')
})

// when a get request is passed to /names it returns all the dataum points in the connected database
app.get('/names', async (req, res) => {
    try {
        const allNames = await getAllNames()
        res.json(allNames)
    } catch(err) {
        console.log(err)
        res.send('There was an issue with getting the database')
    }
})



// used for testing error code 300
app.get('/redirect', (req,res) => {
    res.status(301)
    res.send('not here')
})

app.post('/unavalible', (req,res) => {
    throw createError(400, "this is unavalible")
})

app.get('/notexist', (req,res) => {
    res.statusCode = 404;
    res.send('Not exist')
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./public/HTML/index.html'));
})

app.use(express.static(path.join(__dirname, 'public/')))
app.use(requestLogger)
/*
app.use(informationhandler)
app.use(successfulhandler)
app.use(redirecthandler)
app.use(clienterrorhandler)
app.use(servererrorhandler)
app.use(notfoundhandler)
app.use(badrequesthandler)
*/

app.use((error,req,res,next) => {
    console.log('Error status: ', error.status)
    console.log('Message: ', error.message)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express()
MongoClient.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/Users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('connected to Database')
        const db = client.db('names2')

        const namesCollection = db.collection('names')



        app.use(bodyParser.urlencoded({ extended: true }))
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/html/', (req, res) => {
            db.collection('names').find().toArray()
                .then(result => {
                    console.log(result)
                    res.json(result)
                    /*
                    res.render('index.ejs', {}, {async:true})
*/
                }).catch(error => console.error(error))
        })

        app.post('/', (req, res) => {

            namesCollection.insertOne(req.body)
                .then(result => {
                    console.log('instered')
                })
                .catch(error => console.error(error))

            res.redirect('/')
        })

        app.put('/', (req, res) => {
            console.log(req.body)
            namesCollection.findOneAndUpdate(

            )
            res.redirect('/')
        })
        app.use(express.static(path.join(__dirname, 'html')))
        app.listen(3000, () => {
            console.log('listening on 3000')
        })
    })





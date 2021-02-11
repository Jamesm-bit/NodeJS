const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = new express()
const createError = require('http-errors')
const errorhandler = require('./developer/Errors')

const PORT = process.env.PORT || 5000

app.post('/testing', (req,res,next) => {
    throw createError(400, 'this is not avalible')
})
app.post('/information', (req,res,next) => {
    throw createError(101, 'this is not avalible')
})
app.post('/success', (req,res,next) => {
    throw createError(201, 'this is not avalible')
})
app.post('/redirect', (req,res,next) => {
    throw createError(301, 'this is not avalible')
})
app.post('/notfound', (req,res,next) => {
    throw createError(401, 'this is not avalible')
})
app.post('/servererror', (req,res,next) => {
    throw createError(501, 'this is not avalible')
})
app.post('/400error', (req,res,next) => {
    throw createError(400, 'this is not avalible')
})
app.post('/getting', (req,res,next) => {
    throw createError(404, 'this is not avalible')
})
/*informationhandler,successfulhandler,redirecthandler,clienterrorhandler,servererrorhandler,badrequesthandler,*/
app.use(errorhandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
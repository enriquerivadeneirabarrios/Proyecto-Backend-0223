const express = require('express');
const logger = require('morgan');    
const cors = require('cors')        //permite el cruce de informacion de forma libre

require('dotenv').config    //t5. encriptado de secret

const app = express()


app.use(express.json())   //permite el envío de objetos a traves de rutas
app.use(logger('dev'))      //ocupa morgan. sirve mostrar la ruta y el codigo de estado llamados por postman( o los llamados al servidor)
app.use(cors())

const indexRouter = require('./routers/index')

app.use('/index', indexRouter)

/*
const {connect} = require('./db-t3/connect')
const userRouter = require('./routers-t2/usuarios-t4')

app.use('/v1', apiRouter)           //las apis generalmente se versionan, por eso v1*/


connect()

module.exports = app

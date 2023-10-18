const mongoose = require('mongoose');        //hay que instalar mongoose para poder conectarse con mongoDb
mongoose.set('strictQuery', false);
require('dotenv').config()                  //dotenv es una libreria que permite encrpitar strings para que no quede plasmado en el codigo. 

const connect = async () => {
    try{
        await mongoose.connect(process.env.CONNECT_MONGO);  //con la configuracion de dotenv, en el archivo .env se encuentra el codigo
        console.log('base de datos conectada')
    } catch {
        console.log('error al conectar la base de datos')

    }
}

module.exports = {connect}
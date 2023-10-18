const {Schema, model} = require('mongoose')

const schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
    },
    img:{
        type: String
    },


})

const Products = model('Products', schema);  //se pone Serie, en mayuscula y singular porque cuando se cree aparecera en minusculas y plural
module.exports = {Products}
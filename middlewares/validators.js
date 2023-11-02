const {validationResult} = require('express-validator');
const {Products} = require('../models/Products')

class Validators {

    validarCampos (req,res,next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errores:errors.array()})
        }
        next();
    }

    async productoExiste (nombre) {
        const producto = await Products.findOne({nombre});
        if (producto){
            throw new Error("El producto ya existe en la base de datos")
        }
    }

    async productoNoExiste (nombre) {
        const producto = await Products.findOne({nombre});
        if (!producto){
            throw new Error("El producto no existe en la base de datos")
        }
    }

    async productoRemovido (nombre) {
        const producto =await Products.findOne({nombre});
        if (!producto.disponible) {
            throw new Error("El producto no está disponible")
        }
    }

    async productoDisponible (nombre) {
        const producto =await Products.findOne({nombre});
        if (producto.disponible) {
            throw new Error("El producto está disponible")
        }
    }


}


module.exports = new Validators

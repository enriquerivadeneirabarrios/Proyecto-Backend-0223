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
        const producto = await await Products.findOne({nombre});
        if (producto){
            throw new Error("El producto ya existe en la base de datos")
        }
    }

}


module.exports = new Validators

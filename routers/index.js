const express = require ('express');
const {check} = require('express-validator')
const router = express.Router();
const IndexController = require('../controllers/indexController')
const Validators = require('../middlewares/validators')

router.get('/info', IndexController.info )  


router.get('/listadeproductos',IndexController.getProducts )

router.post('/agregarproducto',[
    check('nombre').custom(Validators.productoExiste),
    Validators.validarCampos
],IndexController.postProduct )

router.patch('/editarproducto', IndexController.updateProduct )

router.patch('/editarstock',
[
    check("nombre","El nombre es obligatorio").not().isEmpty(), 
    check("stock","El stock es obligatorio").not().isEmpty(),
    check("stock","El stock debe ser un numero").isNumeric(),
    Validators.validarCampos
]
,IndexController.updateQuantity)

router.delete('/borrarproducto', IndexController.delete )
router.delete('/removerproducto', IndexController.removeProduct)

router.get('/monedasdisponibles', IndexController.availableCurrencies)

router.get('/cambiarmoneda',
 [
    check("nombre","El nombre es obligatorio").not().isEmpty(), 
    check("moneda","La moneda es obligatoria").not().isEmpty(), 
    check('nombre').custom(Validators.productoExiste),
    Validators.validarCampos
]
, IndexController.fromCLPTo)

module.exports = router
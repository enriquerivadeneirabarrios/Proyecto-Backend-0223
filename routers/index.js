const express = require ('express');
const {check} = require('express-validator')
const router = express.Router();
const IndexController = require('../controllers/indexController')
const Validators = require('../middlewares/validators')

router.get('/info', IndexController.info )  


router.get('/listadeproductos',IndexController.getProducts )
router.get('/listacompletadeproductos',IndexController.getAllProducts )

router.post('/agregarproducto',[
    check('nombre').custom(Validators.productoExiste),
    Validators.validarCampos
],IndexController.postProduct )

router.patch('/editarproducto',[
    check('nombre').custom(Validators.productoExiste),
    check('nombre').custom(Validators.productoRemovido),
    Validators.validarCampos
] ,IndexController.updateProduct )

router.patch('/editarstock',
[
    check("nombre","El nombre es obligatorio").not().isEmpty(), 
    check("stock","El stock es obligatorio").not().isEmpty(),
    check("stock","El stock debe ser un numero").isNumeric(),
    Validators.validarCampos
]
,IndexController.updateQuantity)

router.delete('/borrarproducto',[
    check('nombre').custom(Validators.productoNoExiste),
    Validators.validarCampos
] ,IndexController.delete )

router.delete('/removerproducto',[
    check('nombre').custom(Validators.productoNoExiste),
    Validators.validarCampos
]  ,IndexController.removeProduct)

router.patch('/reactivarproducto',[
    check('nombre').custom(Validators.productoDisponible),
    Validators.validarCampos
], IndexController.reactivateProduct)

router.get('/monedasdisponibles', IndexController.availableCurrencies)

router.get('/cambiarmoneda',
 [
    check("nombre","El nombre es obligatorio").not().isEmpty(), 
    check("moneda","La moneda es obligatoria").not().isEmpty(), 
    check('nombre').custom(Validators.productoNoExiste),
    check('nombre').custom(Validators.productoRemovido),
    Validators.validarCampos
]
, IndexController.fromCLPTo)

module.exports = router
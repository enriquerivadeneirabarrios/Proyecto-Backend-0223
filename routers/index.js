const express = require ('express');
const {check} = require('express-validator')
const router = express.Router();
const IndexController = require('../controllers/indexController')

router.get('/info', IndexController.info )  
router.get('/listadeproductos',IndexController.getProducts )
router.post('/agregarproducto',IndexController.postProduct )
router.patch('/editarproducto', IndexController.updateProduct )
router.patch('/editarstock',
    //check("nombre","El nombre es obligatorio").not().isEmpty(), 
    //check("stock","El stock es obligatorio").not().isEmpty()
IndexController.updateQuantity)

router.delete('/borrarproducto', IndexController.delete )
router.delete('/removerproducto', IndexController.removeProduct)

module.exports = router
const express = require ('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')

router.get('/info', IndexController.info )  
router.get('/listadeproductos',IndexController.getProducts )
router.post('/agregarproducto',IndexController.postProduct )
router.patch('/editarproducto', IndexController.updateProduct )

router.delete('/borrarproducto', IndexController.delete )
router.delete('/removerproducto', IndexController.removeProduct)

module.exports = router
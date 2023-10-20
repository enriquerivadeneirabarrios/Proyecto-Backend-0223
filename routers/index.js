const express = require ('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')

router.get('/info', IndexController.info )  
router.get('/lista',IndexController.getProducts )
router.post('/crear',IndexController.postProduct )
router.patch('/editarh', IndexController.updateProduct )
router.put('/editart', IndexController.put)
router.delete('/borrar', IndexController.delete )

module.exports = router
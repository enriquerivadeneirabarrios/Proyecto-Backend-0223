const express = require ('express');
const router = express.Router;
const IndexController = require('../controllers/indexController')

router.get('/info', IndexController.test )  
router.get('/lista',IndexController.get )
router.post('/crear',IndexController.post )
router.patch('/editarh', IndexController.patch )
router.put('/editart', IndexController.put)
router.delete('/borrar', IndexController.delete )

module.exports = router
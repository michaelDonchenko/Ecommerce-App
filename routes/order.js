const express = require('express')
const router = express.Router()
const {userById} =  require('../controllers/user')
const isAuth = require('../middleware/isAuth')
const {isAdmin} = require('../controllers/user')
const {create,} = require('../controllers/order')


//middlewere
router.param('userId', userById)
// router.param('orderId', orderById)


router.get('/list/:userId',  isAuth, isAdmin, )
router.get('/status-values/:userId', isAuth, isAdmin, )
router.put('/:orderId/status/:userId', isAuth, isAdmin, )

router.post('/create/:userId', isAuth, create )





module.exports = router
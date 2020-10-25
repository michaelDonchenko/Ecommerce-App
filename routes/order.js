const express = require('express')
const router = express.Router()
const {userById} =  require('../controllers/user')
const isAuth = require('../middleware/isAuth')
const {isAdmin} = require('../controllers/user')
const {create, listOrders,} = require('../controllers/order')


//middlewere
router.param('userId', userById)
// router.param('orderId', orderById)

router.get('/list/:userId',  isAuth, isAdmin, listOrders)
router.post('/create/:userId', isAuth, create )


module.exports = router
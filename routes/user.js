const express = require('express')
const { allUsers, userById, read, listOrders, listOrdersByUser, } = require('../controllers/user')
const router = express.Router()


router.get('/', allUsers)
router.get('/:userId', read)
router.get('/user-orders/:userId', listOrdersByUser)


//middlewere
router.param('userId', userById)


module.exports = router
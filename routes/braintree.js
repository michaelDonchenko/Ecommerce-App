const express = require('express')
const router = express.Router()
const {userById} =  require('../controllers/user')
const { generateToken, processPayment } = require('../controllers/braintree')
const isAuth = require('../middleware/isAuth')


//middlewere
router.param('userId', userById)

router.get('/getToken/:userId', isAuth,  generateToken)
router.post('/payment/:userId', isAuth, processPayment)


module.exports = router
const express = require('express')
const { userById, isAdmin } = require('../controllers/user')
const isAuth = require('../middleware/isAuth')
const { create, productById, remove, photo} = require('../controllers/product')
const { list } = require('../controllers/product')
const router = express.Router()


router.post('/create/:userId', isAuth, isAdmin, create)
router.get('/', list)
router.delete('/:productId/:userId', isAuth, isAdmin, remove)
router.get('/photo/:productId', photo)

//middleware
router.param('userId', userById)
router.param('productId', productById)

module.exports = router
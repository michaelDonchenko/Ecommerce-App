const express = require('express')
const {read, categoryById, list, create, update, remove} = require('../controllers/category')
const { userById, isAdmin } = require('../controllers/user')
const isAuth = require('../middleware/isAuth')
const router = express.Router()

router.get('/:categoryId', read)
router.get('/', list)
router.post('/create/:userId', isAuth, isAdmin, create)
router.delete('/:categoryId/:userId', isAuth, isAdmin, remove)

router.param('categoryId', categoryById)
router.param('userId', userById)

module.exports = router
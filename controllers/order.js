const {Order, CartItem} = require('../models/Order')


exports.orderById = (req,res,next,id) => {
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err,order) => {
      if (err || !order) {
        return res.status(400).json({error: err})
      }
      req.order = order
      next()
    })
}

exports.create = (req,res) => {
  // console.log('Create order:', req.body)

  req.body.user = req.profile
  const order = new Order(req.body)
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({error: error})
    }
    res.json(data)  
  })
}


//sorting orders by createdAt
///orders/list/${userId}?sortBy=createdAt&order=desc`


exports.listOrders = async (req,res) => {

  let order = req.query.order ? req.query.order : 'desc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'

  await Order.find()
  // .populate('user')
  .sort([[sortBy, order]])
  .exec((error, orders) => {
    if (error) {
      return res.status(400).json({error: error})
    }
    res.json(orders)
  })
}


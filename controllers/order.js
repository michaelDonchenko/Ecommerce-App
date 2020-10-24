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
  .populate('user', '_id name email adress')
  .sort([[sortBy, order]])
  .exec((error, orders) => {
    if (error) {
      return res.status(400).json({error: error})
    }
    res.json(orders)
  })
}

exports.getStatusValues = (req,res) => {
  res.json(Order.schema.path('status').enumValues)
}


exports.updateOrderStatus = (req,res) => {
  Order.update(
    {_id: req.body.orderId},
    {$set: {status: req.body.status}},
    (error, order) => {
      if (error) {
        return res.status(400).json({error: error})
      }
      res.json(order)
    }
  )
}
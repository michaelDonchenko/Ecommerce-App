const User = require('../models/User')
const {Order} = require('../models/Order')

exports.allUsers = async (req, res,) => {
 try {
  const users = await User.find().select('-password')
  res.json(users)

 } catch (err) {
    return res.json({msg: 'No users found'})
 }  
}

exports.userById = async (req, res, next, id) => {
   try {
    const user = await User.findById(id).select('-password')
    req.profile = user
    next()

    } catch (err) {
        return res.status(404).json({
          msg: 'User not found'
        })
     } 
  }

exports.read = async (req, res) => {
  try {
    return res.json(req.profile) 
  } catch (err) {
    return res.status(404).json({
      msg: 'User not found'
    })
  } 
}

exports.isAdmin = async (req, res, next) => {
  try {
   if (req.profile.role === 0) {
     return res.json({msg: 'User is not admin, access denied!'})
   }
   next()

   } catch (err) {
       return res.status(404).json({
         msg: 'User not found'
       })
    } 
 }


 exports.listOrdersByUser = async (req,res) => {
   try {
    const orders = await Order.find()
    console.log(req.profile.id)
    const ordersByUser = orders.filter(order => order.user == req.profile.id)
    
     return res.json(ordersByUser)
   } catch (err) {
    return res.status(404).json({
      msg: 'Orders not found'
    })
   }
 }

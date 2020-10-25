const Product = require('../models/Product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')


//create new product
exports.create = (req, res) => {
  //formidble package for photo handeling
  let form = formidable.IncomingForm()
  form.keepExtentions = true
  form.parse(req, (err, fields, files) => {
    //error handle
    if (err) {
      return res.status(400).json({
        msg: 'Image could not be uploaded'
      })
    }
    //check for all the fields
    const {name, description, price, category,} = fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        msg: 'All fields are required'
      })
    }
    if (description.length >= 2000) {
      return res.status(400).json({
        msg: 'Description cannot be longer than 2000 characters'
      })
    }
    if (name.length >= 32) {
      return res.status(400).json({
        msg: 'Name cannot be longer than 32 characters'
      })
    }
    //creating the product
    let product = new Product(fields)
    //populating the photo info
    if (files.photo) { 
      //check for the photo to be less than 1mb
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          msg: 'Image cannot be bigger than 1mb'
        })
      }
    product.photo.data = fs.readFileSync(files.photo.path)
    product.photo.contentType = files.photo.type
  }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          msg: err
        })
      }
      res.json(result)
    })
  })
}


//middlewere product by Id
exports.productById = async (req, res, next, id) => {
  await Product.findById(id)
  .populate('category')
  .exec((err, product) => {
    if (err || !product) {
     return res.status(400).json({
       msg: 'Product not found'
     })
    }
    req.product = product
    next()
  })
}

//display product
exports.read = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)
}

//delete product
exports.remove = (req, res) => {
  let product = req.product
  product.remove((err, deleted) => {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    }
    res.json({message: "deleted successfully"})
  })
}

//sorting products by sell/arival
//by sell = /products?sortBy=sold&order=desc&limit=4
//by arived = /products?sortBy=createdAt&order=desc&limit=4
// *if no params are chosen, all the products will be returned
exports.list = async (req, res) => {

  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : ''
  
   await Product.find()
   .select('-photo')
   .populate('category')
   .sort([[sortBy, order]])
   .limit(limit)
   .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          msg: err
        })
      }
      res.json(products)
    })
  }

  exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set('Content-Type', req.product.photo.contentType)
      return res.send(req.product.photo.data)
    }
    next()
  }

  



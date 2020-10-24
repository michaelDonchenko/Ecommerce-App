
const Category = require('../models/Category')

exports.categoryById = async (req, res, next, id) => {
  await Category.findById(id).exec((err, category) => {
    if (err || !category) {
     return res.status(400).json({msg: 'Category not found'})
    }
    req.category = category
    next()
  })
}


exports.create = async (req, res) => {
  let {name} = req.body
  try {
    const exist = await Category.findOne({name: name})
    if (exist) 
      return res.status(400).json({msg: 'Category with that name aleady exists'})

      category = new Category({name: req.body.name})
      await category.save()
      res.json({category}) 
   
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

 exports.read = (req, res) => {
  return res.json(req.category)
}

exports.remove = (req, res) => {
  let category = req.category
  category.remove((err, result) => {
    if (err) {
      return res.status(400).json({msg: err})
    }
    return res.json({msg: 'Deleted'})
  })
}


exports.list = async (req, res) => {
  await Category.find().exec((err, results) => {
    if (err || !results) {
      return res.json({msg: 'No results found'})
    }
    res.json({results})
  })
}
import React, {useContext, useEffect, useState} from 'react'
import Jumbotron from '../../layout/Jumbotron'
import AuthContext from '../../../context/auth/authContext'
import CategoryContext from '../../../context/category/categoryContext'
import ProductContext from '../../../context/product/productContext'

const CreateProduct = () => {
  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const categoryContext = useContext(CategoryContext)
  const {categories, listCategories} = categoryContext

  const productContext = useContext(ProductContext)
  const {createProduct, error, message, clearError, clearMessage} = productContext

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    formData: '',
  })

  const {
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    formData,
  } = values

  useEffect(() => {
    loadUser() 
    listCategories()
  }, [])

  useEffect(() => {
    setValues({...values, formData: new FormData()})
  }, [])

  const handleChange = name => event => {
    clearError()
    clearMessage()
    //check if the change reffered to the photo upload
    //if so grab the file otherwise grab the target value
      const value = name === 'photo' ? event.target.files[0] : event.target.value
      setValues({...values, [name]: value })
      formData.set(name, value)
  }

  const submit = async e => {
    e.preventDefault()
    await createProduct(user._id , formData)
  }

  return (
    <div>
      <Jumbotron title='Create Product Page' description='Please create a new product' />
      <div className="container">
      {
        message && <div className="alert alert-success" role="alert">{message}</div>
      }  
      {
          error && <div className="alert alert-danger" role="alert">{error}</div>
      }

      <form className="mb-5" onSubmit={submit} >
        <h4 className="mb-3">Upload Photo:</h4>
        <div className="form-group">
          <label className="btn btn-raised btn-primary submit_button">
            <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Name</label>
          <input onChange={handleChange('name')} type="text" className="form-control myInput" value={name} />
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Description</label>
          <textarea style={{height: '50px'}} onChange={handleChange('description')} className="form-control myInput" value={description} />
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Price</label>
          <input onChange={handleChange('price')} type="number" className="form-control myInput" value={price} />
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Category</label>
          <select onChange={handleChange('category')} className="form-control">
              <option >Please select</option>
            {
              categories && 
              categories.map((category) => {
                return <option value={category._id} >{category.name}</option>
              })
            }   
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Quantity</label>
          <input onChange={handleChange('quantity')} type="number" className="form-control myInput" value={quantity} />
        </div>

        <div className="form-group">
          <label className="text-muted formLable">Shipping</label>
          <select onChange={handleChange('shipping')} className="form-control">
              <option >Please select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
          </select>
        </div>

        <div>
          <button type="submit" className="btn btn-raised btn-primary submit_button">Create Product</button>
        </div>
      </form>
    </div>

    </div>
  )
}

export default CreateProduct

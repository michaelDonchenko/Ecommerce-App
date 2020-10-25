import React, {useContext, useEffect, useState} from 'react'
import Jumbotron from '../../layout/Jumbotron'
import AuthContext from '../../../context/auth/authContext'
import ProductContext from '../../../context/product/productContext'

const ManageProducts = () => {

  const [run, setRun] = useState(false)

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const productContext = useContext(ProductContext)
  const {listAllProducts, allProducts, removeProduct, message, error} = productContext

  useEffect(() => {
    loadUser()  
  }, [])

  useEffect(() => {
    listAllProducts()
  }, [run])

  const deleteProduct = async product => {
   setRun('Run')
   await removeProduct(product._id, user._id)
   setRun(false)
  }


  return (
    <div>
      <Jumbotron title='Manage Products Page' description='Admin can update/delete products' />

      <div className="container"> 
      {message && <div className="alert alert-success" role="alert">{message}</div>}  
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <ul className="list-group list-group-flush">
          {
            allProducts && allProducts.map((p) => 
            (
            <li 
              key={p._id} className="list-group-item">Product: <strong className="ml-2">{p.name}</strong> Category: {p.category.name}
              <button onClick={() => deleteProduct(p)}  type="button" class="btn btn-danger ml-3">delete</button>
            </li>
            ))
          }
          </ul>
      </div>
    </div>
  )
}

export default ManageProducts

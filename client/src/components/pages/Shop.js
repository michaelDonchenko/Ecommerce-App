import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../context/auth/authContext'
import '../../css/formPages.css'
import ProductContext from '../../context/product/productContext'
import Jumbotron from '../layout/Jumbotron'
import Card from '../core/Card'
import '../../css/shop.css'

const Shop = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const productContext = useContext(ProductContext)
  const { listAllProducts, allProducts, filterProducts, filtered} = productContext

  // const categoryContext = useContext(CategoryContext)
  // const {listCategories} = categoryContext

  useEffect(() => {
    loadUser()  
  }, [])

  useEffect(() => {
    listAllProducts() 
  }, [])

  const [text, setText] = useState('')

  const onChange = (e) => {
    setText(e.target.value)
   if (e.target.value !== undefined) {
    filterProducts(e.target.value)
   } 
  }


  return (
    <div>
      <Jumbotron title='Shop page' description={<p className="lead">Here you can search and filter the products</p>}/>
      <h3 className="mt-4 mb-4 ml-4">Products by search</h3>
        <div className="row shopDiv" style={{marginRight: '0'}}>
          <div className="col-4">
            <div class="input-group ml-3">
              <div class="input-group-prepend mr-3">
                <span><i class="fas fa-search fa-1x"></i></span>
              </div>
                 <input onChange={onChange} style={{maxWidth: '80%'}} type="text" value={text} className="form-control myInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Search product by name/category"/>
              </div>
              <h5 style={{color: 'gray'}} className="mt-4 mb-4 ml-4">Products are sorted from newest to oldest</h5>
           </div>
            <div className="home__products col-8">
            {
              allProducts && !filtered && allProducts.map((p) => (<Card  product={p} />)) 
            }
            {
              filtered && filtered.map((p) => (<Card  product={p} />)) 
            }
            </div>  
        </div>
       
    </div>
  )
}

export default Shop

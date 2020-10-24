import React, { useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import ProductContext from '../../context/product/productContext'
import Card from '../core/Card'
import Jumbotron from '../layout/Jumbotron'
import '../../css/home.css'
import CartContext from '../../context/cart/cartContext'

const Home = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const productContext = useContext(ProductContext)
  const {listBestSellers, bestSellers} = productContext

  useEffect(() => {
    loadUser()  
  }, [])

  useEffect(() => {
    listBestSellers('sold') 
  }, [])

 

  return (
    <div>
      <Jumbotron title='Home Page' description={<p class="lead">{user && `Hello ${user.displayName}, Welcome back.`}</p>} />
        <h3 className="mt-4 mb-4 ml-4">Best Sellers:</h3>
        <div className="home__products">
            {
              bestSellers && bestSellers.map((p) => (<Card product={p} />))
            }
        </div>  
         
    </div>
    
  )
}

export default Home

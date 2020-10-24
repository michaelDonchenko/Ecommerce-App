import React, { useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import CartContext from '../../context/cart/cartContext'
import Card from '../core/Card'
import Jumbotron from '../layout/Jumbotron'
import '../../css/cart.css'
import Checkout from './Checkout'

const Cart = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const cartContext = useContext(CartContext)
  const {cart, getCart, } = cartContext

  useEffect(() => {
    loadUser()  
  }, [])

 
  {useEffect(() => {
    getCart()
  }, [localStorage.getItem('cart')])}


  return (

    <div>
      <Jumbotron title='Cart Page' description='Watch your shopping Cart and Summary' />
      <div className="container-fluid">
          <div className="row cart__info">
           
              <div className=" col-6 cartLeft">
              <h2 className="mb-3" >{`Your cart has ${cart ? (cart.length) : ('0')} Items.`}</h2>
              <div className="cart__items">
                {
                  cart && cart.map((item) => (
                      <Card product={item} itemInCart={true} 
                      />
                  )) 
                }
              </div>
              
            </div>
            <div className="col-6 cartSummary">
              <h2 className="mb-5">Your Cart summary:</h2>
              <hr />
              <Checkout />
            </div>
         </div> 
       </div>
      
    </div>
  )
}

export default Cart

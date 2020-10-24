import React, { useContext, useEffect, useState} from 'react'
import AuthContext from '../../context/auth/authContext'
import CartContext from '../../context/cart/cartContext'
import OrderContext from '../../context/order/orderContext'
import DropIn from "braintree-web-drop-in-react";
import Spinner from '../layout/Spinner';


const Checkout = () => {
  const authContex = useContext(AuthContext)
  const {loadUser, user, } = authContex

  const cartContext = useContext(CartContext)
  const {cart, getCart, getBraintreeClientToken,
    clientToken, proccessPayment , paymentSuccess } = cartContext


  const orderContext = useContext(OrderContext)  
  const {createOrder} = orderContext

  const [data, setData] = useState({
    instance: {},
    error: '',
    loading: false,
    adress: '',
  })

  const change = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    loadUser()  
  }, [])

  useEffect(() => {
    getCart()
  }, [localStorage.getItem('cart')])


   const checkout = async () => {
     setData({...data, loading: true})
    await getBraintreeClientToken(user._id)
    setData({...data, loading: false})
   }

  const getTotal = () => {
    return cart.reduce((currentValue,nextValue) => {
      return  currentValue + nextValue.count * nextValue.price          
    }, 0)
  }
    
    

  const showDropin = () => (
    <div>
    {clientToken !== null && cart && cart.length > 0 ? (
    <div>
      <div className="form-group mt-4 mb-2">
        <label style={{fontWeight: '600', fontSize: '1.3rem'}} className="text-muted formLable">Please enter delivery adress:</label>
        <input onChange={change} value={data.adress} autoComplete="off" name='adress' type="text" className="form-control myInput"></input>
      </div>
     <DropIn
      options={{ authorization: clientToken.clientToken }}
      onInstance={(instance) => (data.instance = instance)}
    />
    <button onClick={buy} className="btn btn-raised btn-success btn-block mb-4">Buy</button>
    </div>
    
    ) : (null)}
  </div>
  )

  const buy = () => {
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let deliveryAdress = data.adress
    let nonce
    let amount = getTotal()
    let getNonce = data.instance.requestPaymentMethod()
    .then(response => {
      // console.log('Data:', data)
      nonce = response.nonce
      // once you have nonce (card type, card number) then send nonce as 'paymentMethodNonce'
      // and also total to be charged
      const paymentData = {
        amount: amount,
        paymentMethodNonce: nonce,
      } 
      let processRes = proccessPayment(user._id, paymentData)
      .then( paymentRes => {
          const createOrderData = {
            products: cart,
            transaction_id: paymentRes.transaction.id,
            amount: paymentRes.transaction.amount,
            address: deliveryAdress,
          }
          let orderRes = createOrder(user._id , createOrderData)
          .then(res => console.log(res))  
          
        }
      )  
  }).catch(err => {
    // console.log('droping err:', err)
  })
    
  
}


  return (
    <div>
      <h3 style={{color: 'red'}} className="mb-3 mt-3">Total: ${getTotal()}</h3>
      <h5 className="mb-3" style={{color: 'gray'}}>*You need to have items in cart in order to process payment. </h5>
      <button className="btn btn-raised btn-success" 
      onClick={checkout}>Continue to Checkout</button>
       
      <div>
      {data.loading && <Spinner />}
      {showDropin()}
      {paymentSuccess ? (
      <div className="alert alert-success mt-2 mb-2" role="alert">Thanks your payment was Succesfull</div>) : null}
      </div>
      
    </div>
  )
}

export default Checkout

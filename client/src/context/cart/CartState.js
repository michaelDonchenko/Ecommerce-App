import React, { useReducer } from 'react'
import axios from 'axios'
import CartContext from './cartContext'
import CartReducer from './CartReducer'
import {
  NEW_CART_ITEM,
  ADD_TO_CART_ERROR,
  GET_CART_ITEMS,
  CART_LOAD_ERR,
  CART_ITEM_DELETED,
  CART_DELETE_ERROR,
  CLIENT_TOKEN,
  CLIENT_TOKEN_FAIL,
  PROCCESS_PAYMENT,
  PAYMENT_ERR,
  EMPTY_CART,
  EMPTY_CART_ERR,
} from '../types'
import setAuthToken from '../../utills/setAuthToken'


const CartState = props => {
  let initialState = {
    cart: [],
    err: null,
    message: null,
    clientToken: null,
    paymentSuccess: false,
  }

  const [state, dispatch] = useReducer(CartReducer, initialState)


  //setting auth token for headers
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

 const addItem = (item, next) => {
    let cart = []
    try {
      if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
          ...item,
          count: 1
        })
        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart
  
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
          return cart.find(p => p._id === id);
        });
  
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
      }
      dispatch({
        type: NEW_CART_ITEM,
        payload: 'New item in cart'
      })
    } catch (err) {
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: err
      })  
    }
  }

const getCart = async () => {
    if (typeof window !== undefined) {
      try {
        if (localStorage.getItem('cart')) {
          let cart = JSON.parse(localStorage.getItem('cart'))
          dispatch({
            type: GET_CART_ITEMS,
            payload: cart
          })
        }
      }
       catch (err) {
        dispatch({
          type: CART_LOAD_ERR,
          payload: err,
        })
      } 
    }
  } 
  
 const removeItem = (productId) => {
      let cart = []
     try {
      if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
          if (product._id === productId) {
            cart.splice(i, 1)
          }
        })
         localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
          type: CART_ITEM_DELETED,
          payload: 'Item deleted'
        })
      }   
     } catch (err) {
        dispatch({
          type: CART_DELETE_ERROR,
          payload: err
        })
     }
  } 

  const getBraintreeClientToken = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await axios.get(`/braintree/getToken/${userId}`, config) 
      dispatch({
        type: CLIENT_TOKEN,
        payload: res.data
      }) 
    } catch (err) {
      dispatch({
        type: CLIENT_TOKEN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const proccessPayment = async (userId ,paymentData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }, 
    }
    try {
      const res = await axios.post(`/braintree/payment/${userId}`, JSON.stringify(paymentData), config)
      emptyCart() 
      dispatch({
        type: PROCCESS_PAYMENT,
        payload: res.data
      })
      return res.data
    } catch (err) {
      dispatch({
        type: PAYMENT_ERR,
        payload: err.response.data.msg,
      })
    }
  }

   const emptyCart = async () => {
    if (typeof window !== undefined) {
      try {
        localStorage.removeItem('cart')
        dispatch({
          type: EMPTY_CART
        })
      } catch (error) {
        dispatch({
          type: EMPTY_CART_ERR
       })
      }   
    }
  }

    

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        err: state.err,
        message: state.message,
        clientToken: state.clientToken,
        paymentSuccess: state.paymentSuccess,
        addItem,
        getCart,
        removeItem,
        getBraintreeClientToken,
        proccessPayment,
        emptyCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
   )
  }


export default CartState
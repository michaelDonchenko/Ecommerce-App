import React, {useReducer} from 'react'
import axios from 'axios'
import ProductContext from './productContext'
import ProductReducer from './ProductReducer'
import {
  LIST_PRODUCTS_FAIL,
  LIST_PRODUCTS_SUCCESS,
  PRODUCT_CREATED,
  PRODUCT_FAILED,
  CLEAR_PRODUCT_ERROR,
  CLEAR_PRODUCT_MESSAGE,
  LIST_ALL_PRODUCTS,
  FILTERED_PRODUCTS,
  CLEAR_FILTERED,
  PRODUCT_DELETED,
  PRODUCT_DELETE_FAIL,
} from '../types'
import setAuthToken from '../../utills/setAuthToken'


const ProductState = props => {
  const initialState =  {
    bestSellers: [],
    allProducts: [],
    filtered: null,
    product: null,
    error: null,
    message: null,
  }


  const [state, dispatch] = useReducer(ProductReducer, initialState)

  //setting auth token for headers
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const listBestSellers = async (sortBy) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try { 
      const res = await axios.get(`/products?sortBy=${sortBy}&order=desc&limit=5`, config)  
      dispatch({
        type: LIST_PRODUCTS_SUCCESS,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: LIST_PRODUCTS_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  const listAllProducts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try { 
      const res = await axios.get(`/products?sortBy=createdAt&order=desc`, config)  
      dispatch({
        type: LIST_ALL_PRODUCTS,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: LIST_PRODUCTS_FAIL,
        payload: err
      })
    }
  }

  const createProduct = async (userId, product) => {
    try {
      const res = await axios.post(`/products/create/${userId}`, product)
      dispatch({
        type: PRODUCT_CREATED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: PRODUCT_FAILED,
        payload: err.response.data.msg
      })
    }
  }

  const clearError = () => {
    dispatch({
      type: CLEAR_PRODUCT_ERROR,
    })
  }

  const clearMessage = () => {
    dispatch({
      type: CLEAR_PRODUCT_MESSAGE,
    })
  }

  const filterProducts = (text) => {
    dispatch({
      type: FILTERED_PRODUCTS,
      payload: text
    })
  }

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTERED,
    })
  }

  const removeProduct = async (productId, userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await axios.delete(`/products/${productId}/${userId}`, config)
      dispatch({
        type: PRODUCT_DELETED,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  return (
    <ProductContext.Provider
    value={{
     bestSellers: state.bestSellers,
     allProducts: state.allProducts,
     filtered: state.filtered,
     product: state.product,
     error: state.error,
     message: state.message,
     listBestSellers,
     createProduct,
     clearError,
     clearMessage,
     listAllProducts,
     filterProducts,
     clearFilter,
     removeProduct,
    }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
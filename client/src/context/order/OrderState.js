import React, {useReducer} from 'react'
import axios from 'axios'
import OrderContext from './orderContext'
import OrderReducer from './OrderReducer'
import {
    CREATE_ORDER,
    ORDER_CREATE_ERR,
    GET_ORDERS_ERR,
    USER_ORDERS,
    LIST_ORDERS,
} from '../types'
import setAuthToken from '../../utills/setAuthToken'


const OrderState = props => {
    const initialState =  {
      userOrders: [],
      createdOrder: null,
      err: null,
      allOrders: [],
    }
  
    const [state, dispatch] = useReducer(OrderReducer, initialState)
  
    //setting auth token for headers
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

      const createOrder = async (userId ,createOrderData) => {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }, 
        }
        try {
          const res = await axios.post(`/order/create/${userId}`, JSON.stringify(createOrderData), config)
          dispatch({
            type: CREATE_ORDER,
            payload: res.data
          }) 
          return res.data
        } catch (err) {
          dispatch({
            type: ORDER_CREATE_ERR,
            payload: err,
          })
        }
      }

      const getUserOrders = async (userId) => {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }, 
        }
        try {
          const res = await axios.get(`/users/user-orders/${userId}`, config)
          dispatch({
            type: USER_ORDERS,
            payload: res.data
          })
          return res
          
        } catch (err) {
          dispatch({
            type: GET_ORDERS_ERR,
            payload: err,
          })
        }
      }

      const listAllOrders = async (userId) => {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }, 
        }
        try {
          const res = await axios.get(`/order/list/${userId}`, config)
          dispatch({
            type: LIST_ORDERS,
            payload: res.data
          })
          return res.data
          
        } catch (err) {
          dispatch({
            type: GET_ORDERS_ERR,
            payload: err.response.data.msg
          })
        }
      }


    return (
        <OrderContext.Provider
        value={{
            userOrders: state.userOrders,
            createdOrder: state.createdOrder,
            err: state.err,
            allOrders: state.allOrders,
            createOrder,
            getUserOrders,
            listAllOrders,
        }}
        >
          {props.children}
        </OrderContext.Provider>
      )
    }
    
    export default OrderState
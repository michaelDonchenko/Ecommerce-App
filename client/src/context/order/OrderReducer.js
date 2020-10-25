import {
    CREATE_ORDER,
    ORDER_CREATE_ERR,
    GET_ORDERS_ERR,
    USER_ORDERS,
    LIST_ORDERS,
  } from '../types'


  export default (state, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                createdOrder: action.payload
            }
        case ORDER_CREATE_ERR:
        case GET_ORDERS_ERR:    
            return {
                ...state,
                err: action.payload
            }  
        case USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload
            }
            case LIST_ORDERS:
                return {
                    ...state,
                    allOrders: action.payload
                }             
        default:
            return state
        }
      }
    
import {
  NEW_CART_ITEM,
  ADD_TO_CART_ERROR,
  CLIENT_TOKEN,
  CLIENT_TOKEN_FAIL,
  GET_CART_ITEMS,
  CART_LOAD_ERR,
  CART_ITEM_DELETED,
  CART_DELETE_ERROR,
  PROCCESS_PAYMENT,
  PAYMENT_ERR,
  EMPTY_CART,
  EMPTY_CART_ERR,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case NEW_CART_ITEM:
      return {
        ...state,
        message: action.payload,
      }
      case ADD_TO_CART_ERROR:
        case PAYMENT_ERR: 
        case CLIENT_TOKEN_FAIL: 
        case CART_DELETE_ERROR:
        case CART_LOAD_ERR:
        case EMPTY_CART_ERR:    
        return {
          ...state,
          error: action.payload,
        }
         case GET_CART_ITEMS:
           return {
             ...state,
             cart: action.payload,
           }
             case CART_ITEM_DELETED:
              return {
              ...state,
                message: action.payload,
              }
                case CLIENT_TOKEN:
                  return {
                  ...state,
                    clientToken: action.payload,
                  }
                    case PROCCESS_PAYMENT:
                      return {
                      ...state,
                        message: action.payload,
                        paymentSuccess: action.payload.success,
                      } 
                      case EMPTY_CART:
                        return {
                        ...state,
                          cart: []
                        } 
                      

                      
                       
    default:
      return state
  }
}
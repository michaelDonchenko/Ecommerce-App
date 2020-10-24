import { 
  CLEAR_PRODUCT_ERROR,
  CLEAR_PRODUCT_MESSAGE,
  LIST_PRODUCTS_FAIL,
  LIST_PRODUCTS_SUCCESS,
  PRODUCT_CREATED,
  PRODUCT_FAILED,
  LIST_ALL_PRODUCTS,
  FILTERED_PRODUCTS,
  PRODUCT_DELETED,
  PRODUCT_DELETE_FAIL,
  } from '../types'


export default (state, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        bestSellers: action.payload,
      }
      case LIST_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
      case PRODUCT_CREATED:
      return {
        ...state,
        product: action.payload,
        message: 'Product created succefully'
      }
      case PRODUCT_FAILED:
      return {
        ...state,
        error: action.payload,
      }
      case CLEAR_PRODUCT_MESSAGE:
      return {
        ...state,
        message: null
      }
      case CLEAR_PRODUCT_ERROR:
      return {
        ...state,
        error: null
      }
      case LIST_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      }
      case FILTERED_PRODUCTS:
      return {
        ...state,
        filtered: state.allProducts.filter(product => {
          //creating regular expression with global && not sensetive
          const regex = RegExp(`${action.payload}`, 'gi')
          //this will return anything the text we passed match in with the message 
          return product.name.match(regex) || product.category.name.match(regex)
        })
      }
      case PRODUCT_DELETED:
        return {
          ...state,
          message: 'Product Deleted',
          error: null
        }
        case PRODUCT_DELETE_FAIL:
        return {
          ...state,
          error: action.payload,
          message: null
        }
    default:
      return state
  }
}
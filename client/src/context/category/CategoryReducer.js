import {
  CREATE_FAIL,
  CREATE_SUCCESS,
  LIST_FAIL,
  LIST_SUCCESS,
  CLEAR_CATEGORY_ERRORS,
  CATEGORY_DELETED,
  CATEGORY_DELETE_FAIL,
  CLEAR_CATEGORY_MESSAGE,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
        message: 'Category Created'
      }
      case CREATE_FAIL:
      case LIST_FAIL:  
      case CATEGORY_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        message: null,
      }
      case LIST_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }
      case CLEAR_CATEGORY_ERRORS:
        return {
          ...state,
          error: null,
        }
      case CATEGORY_DELETED:
        return {
          ...state,
          message: 'Deleted succefully',
          error: null
        }  
       case CLEAR_CATEGORY_MESSAGE:
         return {
           ...state,
           message: null
         } 
    default:
      return state
  }
}
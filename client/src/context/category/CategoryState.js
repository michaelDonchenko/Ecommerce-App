import React, {useReducer} from 'react'
import axios from 'axios'
import CategoryContext from './categoryContext'
import CategoryReducer from './CategoryReducer'
import {
  CREATE_SUCCESS, 
  CREATE_FAIL,
  LIST_SUCCESS,
  LIST_FAIL,
  CLEAR_CATEGORY_ERRORS,
  CATEGORY_DELETED,
  CATEGORY_DELETE_FAIL,
  CLEAR_CATEGORY_MESSAGE,
} from '../types'
import setAuthToken from '../../utills/setAuthToken'


const CategoryState = props => {
  const initialState =  {
    categories: [],
    category: null,
    error: null,
    message: null,
  }

  const [state, dispatch] = useReducer(CategoryReducer, initialState)

  //setting auth token for headers
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  const createCategory = async (name, userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }, name,
    }
    try {
      const res = await axios.post(`/categories/create/${userId}`, config)
      dispatch({
        type: CREATE_SUCCESS,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: CREATE_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  const listCategories = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await axios.get('/categories', config)
      dispatch({
        type: LIST_SUCCESS,
        payload: res.data.results
      })
      
    } catch (err) {
      dispatch({
        type: LIST_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const removeCategory = async (categoryId, userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await axios.delete(`/categories/${categoryId}/${userId}`, config)
      dispatch({
        type: CATEGORY_DELETED,
        payload: res.data
      })
      
    } catch (err) {
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  const clearErrors = () => {
    dispatch({
      type: CLEAR_CATEGORY_ERRORS,
    })
  }

  const clearMessage = () => {
    dispatch({
      type: CLEAR_CATEGORY_MESSAGE,
    })
  }

  return (
    <CategoryContext.Provider
    value={{
      categories: state.categories,
      category: state.category,
      error: state.error,
      message: state.message,
      createCategory,
      listCategories,
      clearErrors,
      removeCategory,
      clearMessage,
    }}
    >
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState
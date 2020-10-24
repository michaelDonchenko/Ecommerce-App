import React, {useEffect, useContext, useState} from 'react'
import AuthContext from '../../../context/auth/authContext'
import Jumbotron from '../../layout/Jumbotron'
import CategoryContext from '../../../context/category/categoryContext'


const CreateCategory = () => {
  
  const [run, setRun] = useState(false)

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex
  

  const categoryContext = useContext(CategoryContext)
  const {createCategory, listCategories, error, clearErrors, categories, removeCategory, message, clearMessage} = categoryContext
  
  useEffect(() => { 
    listCategories()
  }, [run])

  useEffect(() => {
    loadUser() 
  }, [])

  const [name, setName] = useState('')

  const change = e => {
    clearMessage()
    clearErrors()
    setName(e.target.value)
  }

  const submit = async e => {
    e.preventDefault()
    setRun('run')
    await createCategory(name, user._id)
    setName('')
    setRun(false)
  }

  const deleteCategory = async c =>{
    setRun('run')
    await removeCategory(c._id, user._id)
    setRun(false)
  }


  return (
    <div>
      <Jumbotron title='Create Category Page' description='Please create a new category' />
      <div className='container'>
      {
        message && <div className="alert alert-success" role="alert">{message}</div>
      }  
      {
        error && <div className="alert alert-danger" role="alert">{error}</div>
      }
        <form onSubmit={submit}>
            <div className="form-group">
              <label className="text-muted formLable">Category Name</label>
              <input onChange={change} value={name} autoComplete="off" name='name' type="text" className="form-control myInput" required></input>
            </div>
            <button type="submit" className="btn btn-raised btn-primary submit_button">Create</button>
        </form> 
      </div>  

      <div className="container">
        <h3 className='mt-5'>All Categories</h3>
        <ul className="list-group list-group-flush">
          {
            categories.map( c => (
              <li key={c._id} className="list-group-item">{c.name} <button onClick={() => deleteCategory(c)} type="button" class="btn btn-danger">delete</button></li>
            ))
          }
        </ul>
      </div> 
    </div>
  )
}

export default CreateCategory

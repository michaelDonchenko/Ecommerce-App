import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import Jumbotron from '../layout/Jumbotron'

const AdminDashboard = () => {
  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex
  

  useEffect(() => {
    loadUser()  
  }, [])

  const userInfo = () => {
    return (
      <div className="card mb-5">
      <h3 className="card-header">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">Display Name: {user && user.displayName}</li>
        <li className="list-group-item">Email: {user && user.email}</li>
        <li className="list-group-item">Role: {user && user.role === 1 ? 'Admin' : 'Registered User'}</li>
      </ul>
    </div> 
    )
  }

  const adminLinks = () => {
    return (
      <div className="card">
             <h4 className="card-header">Admin Links</h4>
             <li className="list-group-item">
               <Link className="nav-link" to="/create/category">
                 Create Category
               </Link>
             </li>
             <li className="list-group-item">
               <Link className="nav-link" to="/create/product">
                 Create Product
               </Link>
             </li>
             <li className="list-group-item">
               <Link className="nav-link" to={`/manage/products`}>
                 Update and Delete products
               </Link>
             </li>
          </div>
    )
  }

  return (
    <div>
      <div>
      <Jumbotron title='Dashboard' description={<p class="lead">Here you can create product and categories, <br/>
       And watch all users orders history.</p>} />
      </div>
       <div class="container">
          <div class="row">
            <div class="col-6">
              {
                adminLinks()
              }
            </div>
            <div class="col-6">
            {
              userInfo()
            }
            </div> 
        </div>
     </div>      
    </div>
    
  )
}

export default AdminDashboard
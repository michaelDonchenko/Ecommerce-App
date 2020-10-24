import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext'
import {Route, Redirect} from 'react-router-dom'



const AdminRoute = ({component: Component, ...rest}) => {

  const authContext = useContext(AuthContext)
  const {isAuth, user} = authContext

  return (
    <Route 
    {...rest}
    render={props => user && user.role === 0 || !isAuth ? (<Redirect to="/error-page" />) : (<Component {...props} />)}
     />
  )
}

export default AdminRoute
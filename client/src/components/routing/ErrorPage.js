import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'

const ErrorPage = () => {
  const authContext = useContext(AuthContext)
  const {loadUser} = authContext

  useEffect(() => {
    loadUser()
  },[])


  return (
    <div className="container">
      <h2 className="mt-4">Error 401 unauthorized, only Admin users have access to this page!</h2>
    </div>
  )
}

export default ErrorPage

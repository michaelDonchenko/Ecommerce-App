import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../context/auth/authContext'
import OrderContext from '../../context/order/orderContext'
import UserOrder from '../core/UserOrder'
import Jumbotron from '../layout/Jumbotron'
import Spinner from '../layout/Spinner'
import '../../css/dashboard.css'



const Dashboard = () => {
  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  const orderContext = useContext(OrderContext)  
  const {getUserOrders} = orderContext

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    loadUser() 
  }, [])

  useEffect(() => {
    setLoading(true)
    loadUser().then(
      res => {
         let user = res
         getUserOrders(user._id)
         .then(res => setOrders(res.data))
         setLoading(false)
      }
    ) 
  }, [])
  
  const userInfo = () => {
    return (
      <div>
        <h3 className="mb-3" style={{fontWeight: '600'}}>User Information</h3>
        <div className="card mb-5">
        <ul className="list-group">
          <li className="list-group-item">Display Name: {user && user.displayName}</li>
          <li className="list-group-item">Email: {user && user.email}</li>
          <li className="list-group-item">Role: {user && user.role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div> 
    </div>
    )
  }


  return (
    <div>
      <div>
      <Jumbotron title='Dashboard' description={<p class="lead">Here you can manage your Account, <br/>
       And watch your purchase history.</p>} />
      </div>
       <div class="container dashContainer">
          <div class="row dashboardDiv">
            <div class="col-6">
              <div>
                <h3 className="mb-3" style={{fontWeight: '600'}}>Purchase history</h3>
                {orders.length === 0 && loading && <Spinner />}
                {orders.length === 0 && !loading && <h4 style={{color: 'grey'}}>You have No order history.</h4>}
                {orders && orders.map(order => <UserOrder order={order} />)}
              </div>
              
            </div>
            <div class="col-6">
             {userInfo()}
            </div> 
        </div>
     </div>      
    </div>
    
  )
}

export default Dashboard

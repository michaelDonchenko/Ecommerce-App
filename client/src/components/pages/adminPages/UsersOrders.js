import React, {useContext, useEffect} from 'react'
import Jumbotron from '../../layout/Jumbotron'
import AuthContext from '../../../context/auth/authContext'
import OrderContext from '../../../context/order/orderContext'
import '../../../css/usersOrders.css'

const UsersOrders = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, listUsers, allUsers} = authContex

  const orderContext = useContext(OrderContext)  
  const {listAllOrders, allOrders} = orderContext

  
  useEffect(() => {
    loadUser().then(
      user => {
        listAllOrders(user._id)
      }
    ) 
  }, [])

  useEffect(() => {
    listUsers()
  }, [])

  return (
    <div>
       <Jumbotron title='Users and Orders' description='This page is gor showing all the users and orders of the app.' />
       <div className="container">
         <div className="row infoDiv">
           <div className="col-6">
             <h3>Users</h3>
             <ul className="list-group list-group-flush">
             {
               allUsers && allUsers.map(user => (
                 <div className="card mb-2">
                  <li className="list-group-item">User ID: {user._id}</li>
                  <li className="list-group-item">Role: {user.role}</li>
                  <li className="list-group-item">Email: {user.email}</li>
                 </div> 
               ))
             }
             </ul>
           </div>
           <div className="col-6">
             <h3>Orders</h3>
             <ul className="list-group list-group-flush">
             {
               allOrders && allOrders.map(order => (
                 <div className="card mb-2">
                  <li className="list-group-item">Transaction ID: {order.transaction_id}</li>
                  <li className="list-group-item">Total amount: ${order.amount} </li>
                  <li className="list-group-item">Ordered by: {order.user}</li>
                  <li className="list-group-item">Delivery address: {order.address}</li>
                 </div>
               ))
             }
             </ul>
           </div>
         </div>
       </div> 
    </div>
  )
}

export default UsersOrders

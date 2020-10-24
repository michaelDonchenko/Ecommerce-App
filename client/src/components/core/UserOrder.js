import React from 'react'
import moment from 'moment'

const userOrder = ({order}) => {
    return (
        <div className="card my-2">
            <h4 className="ml-2 mt-3" style={{fontWeight: '600'}}>Order Info:</h4>
         <ul class="list-group">
            <li class="list-group-item">Transaction ID: {order.transaction_id}</li>
            <li class="list-group-item">Total amount: ${order.amount}</li>
            <li class="list-group-item">Delivery Address: {order.address}</li>
            <li class="list-group-item">Created: {moment(order.createdAt).fromNow()}</li>
            <h5 className="ml-2 mt-3" style={{fontWeight: '600'}}>Products of the order:</h5>
            <li class="list-group-item">
                {order.products.map(
                 product => (
                 <ul class="list-group">
                     <li class="list-group-item">Product name: {product.name}</li>
                     <li class="list-group-item">Product Price: ${product.price}</li>
                 </ul>))}
            </li>
         </ul>  
        </div>
    )
}

export default userOrder

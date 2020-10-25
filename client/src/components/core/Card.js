import React, {useContext} from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import '../../css/card.css'
import ShowImage from './ShowImage'
import CartContext from '../../context/cart/cartContext'


const Card = ({product, itemInCart=false}) => {

  const cartContext = useContext(CartContext)
  const {addItem, removeItem} = cartContext


  const modal = () => (
    <div class="modal fade" id={product._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="exampleModalLongTitle">{product.name}</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div className="mb-4">
             <ShowImage item={product} />
          </div>
          {product.description}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  )

  const AddToCartModal = () => (
    <div class="modal fade" id={`${product._id}addToCart`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">{product.name}</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div className="mb-4">
             <ShowImage item={product} />
        </div>
         <h4> Add this product to Cart? </h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <Link>
           <button onClick={addToCart} type="button" class="btn addToCart ml-2" data-dismiss="modal">Add to Cart</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )

const showAddToCartButton = () => {
  return (
    <Link>
         <button  data-toggle="modal" data-target={`#${product._id}addToCart`}  className="btn btn-raised btn-primary submit_button my-2 ml-2">Add to Cart</button>
    </Link>
    )
  }

   //adding the item to the local storage
   const addToCart = () => {
    addItem(product, () => {})
  }

  const showRemoveButton = () => (
    <button onClick={() =>
     { 
      removeItem(product._id)
    }  
    } 
      className="btn btn-danger mt-2 mb-2 ml-2 mr-2">Remove from Cart</button>
  )
    
  

  return (
    <div>
      <div className="col mb-3 myCard">
        <div className='card product__card'>  
          <div className="card-header card__name">
              {product.name}
          </div>
          <div className='card-body'>
                <div className="mb-4">
                 <ShowImage item={product} />
                </div>
                <p className="card__p">Price: ${product.price}</p>
                <p className="card__p">Category: {product.category && product.category.name}</p>
                <p className="card__p">Created {moment(product.createdAt).fromNow()}</p>

                <Link >
                    <button className="btn btn-info mt-2 mb-2 ml-2 mr-2" data-toggle="modal" data-target={`#${product._id}`}>View Description</button>
                </Link>
                <br />
                {
                  itemInCart === false && product.quantity >= 1 && (
                   showAddToCartButton()  
                  )
                }
                {
                  itemInCart === true && (
                    <div>
                       {showRemoveButton()}
                    </div>           
                  )
                }
                {
                  modal()
                }   
                {
                  AddToCartModal()
                }
          </div>
        </div>
    </div>
    </div>
  )
}

export default Card

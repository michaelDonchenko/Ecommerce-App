import React from 'react'


const ShowImage = ({item}) => {
  return (
    <div className="product__image">
      <img src={`/products/photo/${item._id}`}
          style={{
            maxHeight: '220px', maxWidth: '100%', minHeight:'220px' 
         }}
       />
    </div>
  )
}

export default ShowImage
import React from 'react'

const Jumbotron = ({title, description}) => {

  return (

    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        {description}
      </div>
    </div>
  )
}

export default Jumbotron

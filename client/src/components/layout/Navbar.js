import React, {useContext, Fragment, useEffect,} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import '../../css/navbar.css'
import CartContext from '../../context/cart/cartContext'


const Navbar = () => {

  const authContext = useContext(AuthContext)
  const {isAuth, logout, user} = authContext

  const cartContext = useContext(CartContext)
  const {cart, getCart, } = cartContext

  const onLogout = () => {
    logout()
  }

  {useEffect(() => {
    getCart()
  }, [localStorage.getItem('cart')])}

  const authLinks = (
    <Fragment>
      {
        user && user.role === 1 ? (<Link className="navLink" to="/admin/dashboard"><i class="fas fa-clipboard fx-2 mr-1"></i>Dashboard</Link>) : (<Link className="navLink" to="/dashboard"><i class="fas fa-clipboard fx-2 mr-1"></i>Dashboard</Link>)
      }
     <Link className="navLink" to="/"><i class="fas fa-home fx-2 mr-1"></i>Home</Link>
     <Link className="navLink" to='/shop'><i class="fas fa-store fx-2 mr-1"></i>Shop</Link>
     <Link className="navLink" to='/cart'>
       {cart ? (cart.length) : ('0')}
       <i class="fas fa-shopping-cart fx-2 mr-1 ml-1"></i>
       Cart
     </Link>
     <Link to='' onClick={onLogout} className="navLink"><i className="fas fa-sign-out-alt fx-2 mr-1"></i>Logout</Link>
    </Fragment>
  ) 
  const guestLinks = (
    <Fragment> 
      <Link className="navLink" to='/register'>Register</Link>
      <Link className="navLink" to='/login'>Login</Link>
    </Fragment>
  )
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light myNav">
    <span className="navbar-brand navLogo">Ecommerce App</span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navIcon"><i className="fas fa-bars"></i></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      {
       isAuth ?  authLinks :  guestLinks
      }
      </div>
    </div>
  </nav>
  )
}

export default Navbar

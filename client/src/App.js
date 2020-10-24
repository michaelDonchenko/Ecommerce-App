import React from 'react';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import './css/app.css'
import AuthState from './context/auth/AuthState';
import setAuthToken from './utills/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import ErrorPage from './components/routing/ErrorPage';
import AdminRoute from './components/routing/AdminRoute';
import CreateCategory from './components/pages/adminPages/CreateCategory';
import CategoryState from './context/category/CategoryState';
import ProductState from './context/product/ProductState';
import CreateProduct from './components/pages/adminPages/CreateProduct';
import Shop from './components/pages/Shop';
import ManageProducts from './components/pages/adminPages/ManageProducts';
import Cart from './components/pages/Cart';
import CartState from './context/cart/CartState';
import OrderState from './context/order/OrderState';


const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return (
    <AuthState>
      <CartState>
      <OrderState>
      <ProductState>
      <CategoryState>
        <Router> 
          <div className="app">
            <Navbar />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/shop" component={Shop} />
                  <PrivateRoute exact path="/cart" component={Cart} />
                  <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                  <AdminRoute exact path="/create/category" component={CreateCategory} />
                  <AdminRoute exact path="/create/product" component={CreateProduct} />
                  <AdminRoute exact path="/manage/products" component={ManageProducts} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/error-page" component={ErrorPage} />
                </Switch>
          </div>
        </Router>
      </CategoryState>
      </ProductState>
      </OrderState>  
      </CartState>
    </AuthState>
    
  );
}

export default App;

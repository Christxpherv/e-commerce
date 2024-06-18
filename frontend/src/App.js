import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

import './App.css'; // Importing the CSS file for styling

function App() {
  const [searchVisible, setSearchVisible] = useState(false); // State for search bar visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(false); // State for loading indicator
  const searchInputRef = useRef(null); // Ref for search input

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const closeSearch = () => {
    setSearchVisible(false);
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const searchProducts = useCallback(() => {
    setLoading(true);
    const regex = new RegExp(searchQuery, 'i'); // Create regex for case-insensitive search
    const filtered = products.filter((product) =>
      regex.test(product.name) || regex.test(product.description)
    );
    setFilteredProducts(filtered);
    setLoading(false);
  }, [searchQuery, products]);

  const throttledSearch = useMemo(() => throttle(searchProducts, 300), [searchProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    throttledSearch();
  };

  useEffect(() => {
    if (searchVisible) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  useEffect(() => {
    // Function to close search bar when clicking away
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Shopify
            </Link>
          </div>
          <div className="header-links">
            <div className="search-bar-container">
              <div className={`search-bar ${searchVisible ? 'active' : ''}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    name="q"
                    id="q"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                  />
                  {loading && <div className="loading-spinner"></div>}
                </form>
              </div>
              <i className={`fa fa-search search-icon ${searchVisible ? 'hidden' : ''}`} onClick={toggleSearch}></i>
            </div>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="main">
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/" exact render={() => (
            <HomeScreen searchQuery={searchQuery} filteredProducts={filteredProducts} />
          )}></Route>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
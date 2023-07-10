import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet,Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import "./App.scss";
import Basket from "./components/Navbar/BasketCompoment/Basket";
import Shop from "./components/Navbar/ShopComponent/Shop";
import Home from "./Pages/Home";
import NoProductSelected from "./components/NoProductSelectedComponent/NoProductSelected";
import Checkout from "./components/Checkout/Checkout";
import Product from './components/Product/Product';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/" element={<NoProductSelected />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <Shop className="icon" />
          </Link>
        </li>
        <li className="cart-icon">
          <Link to="/checkout">
            <Basket className="icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;

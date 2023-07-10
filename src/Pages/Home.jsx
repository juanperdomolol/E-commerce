import React, { useState } from 'react';
import { Link, useNavigate, Outlet, Routes, Route, useLocation, Navigate  } from 'react-router-dom';
import './Home.scss';
import Carousel from './../components/Carrusel/Carousel';
import Product from './../components/Product/Product';
import NoProductSelected from './../components/NoProductSelectedComponent/NoProductSelected';
import Checkout from './../components/Checkout/Checkout';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProductSelect = (product) => {
      navigate('/product/'+product.id)  
      setSelectedProduct(product);
      setShowCheckout(false);
  };

  return (
    <div className="home-container">
      <div className="left-column">
        <Carousel handleProductSelect={handleProductSelect} />
      </div>
      <div className="right-column">
        {/* <Routes location={location} > */}
            {/* <Route path="*" element={<NoProductSelected />} />
            <Route path="/product/:id" element={<Product product={selectedProduct} />} />
            <Route path="/checkout" element={<Checkout />} /> */}
        {/* </Routes> */}
        <Outlet />
        {/* {!showCheckout && selectedProduct && <Product product={selectedProduct} />}
        {!showCheckout && !selectedProduct && <NoProductSelected />} */}
        {/* {showCheckout ? null : (
          <>
            {selectedProduct && <Product product={selectedProduct} />}
            {!selectedProduct && <NoProductSelected />}
          </>
        )} */}
        {/* {showCheckout && <Checkout />} */}
      </div>
    </div>
  );
};

export default Home;

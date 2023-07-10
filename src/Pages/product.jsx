import React from 'react';
import { useParams } from 'react-router-dom';
import Product from './../components/Product/Product';
import {products} from './../constants/products.json'; 

const ProductDetails = () => {
  const { id } = useParams(); 

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <Product product={product} />;
};

export default ProductDetails;

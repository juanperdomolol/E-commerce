import React from "react";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import { incrementProductQuantity, decrementProductQuantity } from "../../redux/actions.js";

const Product = ({ product }) => {

  const dispatch = useDispatch();
  const {id: idparams} = useParams();
  const id = parseInt(idparams);

  const handleAddProduct = () => {
    dispatch(incrementProductQuantity(id));
  };

  const handleRemoveProduct = () => {
    dispatch(decrementProductQuantity(id));
  };

  const foundProduct = useSelector((state) => {
    const foundProduct = state.products.find((product) => product.id == id);
    return foundProduct;
  });

  if (!foundProduct) {
    return <div>No se encontró el producto no existe</div>;
  }

  const quantity = foundProduct.quantity;

  return (
    <div className="product-card">
      <h2 className="product-title">Product</h2>
      <div className="product-image-container">
        {quantity > 0 && (
          <div className="quantity-indicator">
            <span className="quantity-text">{quantity}</span>
          </div>
        )}

        <img className="product-image" src={`/assets/${foundProduct.image}`} alt={foundProduct.name} />
      </div>
      <div className="product-details">
        <div className="name-price">
          <h3 className="product-name">{foundProduct.name}</h3>
          <p className="product-price">${foundProduct.price}</p>
          <div className="quantity-buttons">
            <button className="add-button" onClick={handleAddProduct}>
              +
            </button>
            <button className="remove-button" onClick={handleRemoveProduct}>
              -
            </button>
          </div>
        </div>
        <div className="product-description">
          <p>{foundProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;

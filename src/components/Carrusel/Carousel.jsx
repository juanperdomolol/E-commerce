import React from 'react';
import './Carousel.scss';
import { useSelector } from 'react-redux';

const Carousel = ({ handleProductSelect }) => {
  const products = useSelector(state => state.products);
  console.log(products,'products')

  return (
    <div className="carousel">
      <div className="grid-container">
        {products.map((product) => (
          <div key={product.id} className={`grid-item ${product.isSelected ? 'selected' : ''}`} onClick={() => handleProductSelect(product)}>
            <div className="image-wrapper">
              <img className={`product-image ${product.isSelected ? 'selected' : ''}`} src={`/assets/${product.image}`} alt={product.name} />
              {product.quantity > 0 && (
                <div className="quantity-indicator">
                  <span>{product.quantity}</span>
                </div>
              )}
              {product.isSelected && <div className="selected-overlay"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

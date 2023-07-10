import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import './Checkout.scss';

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = useSelector((state) => state.products);
  const totalPrice = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="product-container">
        {products.map(
          (product) =>
            product.quantity > 0 && (
              <div key={product.id} className="product">
                <div className="product-circle">
                  <span className="product-quantity">{product.quantity}</span>
                </div>
                <img
                  className="product-image"
                  src={`/assets/${product.image}`}
                  alt={product.name}
                />
                <hr className="product-line" />
              </div>
            )
        )}
      </div>
      <div className="total-container">
        <p className="total-text">Total:</p>
        <p className="total-amount">${totalPrice}</p>
      </div>
      <button onClick={() => setIsModalOpen(true)}>Pagar con Wompi</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Payment Modal"
      >
        <form action="https://checkout.wompi.co/p/" method="GET">
          <input type="hidden" name="public-key" value="pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV" />
          <input type="hidden" name="currency" value="COP" />
          <input type="hidden" name="amount-in-cents" value={totalPrice * 100} />
          <input type="hidden" name="reference" value="Order123" />
          <button type="submit">Pagar con Wompi</button>
        </form>
      </Modal>
    </div>
  );
};

export default Checkout;

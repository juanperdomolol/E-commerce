import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Checkout.scss";


const Checkout = () => {
  const products = useSelector((state) => state.products);
  const totalPrice = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
  const formattedTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalPrice);

  // Configurar los datos de la transacción
  const currency = "COP";
  const amountInCents = totalPrice * 100;
  const reference = "AD002901221";
  const publicKey = "pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV";
  const redirectUrl = "https://transaction-redirect.wompi.co/check"; // Opcional
  const currentDate = new Date();
  const expirationTime = new Date(
    currentDate.getTime() + 1 * 60 * 60 * 1000
  ).toISOString();

  const taxInCents = {
    vat: 1900,
    consumption: 800,
  }; // Opcional
  const customerData = {
    email: "lola@gmail.com",
    fullName: "Lola Flores",
    phoneNumber: "3040777777",
    phoneNumberPrefix: "+57",
    legalId: "123456789",
    legalIdType: "CC",
  }; // Opcional
  const shippingAddress = {
    addressLine1: "Calle 123 # 4-5",
    city: "Bogota",
    phoneNumber: "3019444444",
    region: "Cundinamarca",
    country: "CO",
  }; // Opcional

  // Función para abrir el widget de Wompi
  const openWompiWidget = () => {
    const checkout = new WidgetCheckout({
      currency,
      amountInCents,
      reference,
      publicKey,
      redirectUrl,
      expirationTime,
      taxInCents,
      customerData,
      shippingAddress,
    });

    checkout.open((result) => {
      const transaction = result.transaction;
      console.log("Transaction ID:", transaction.id);
      console.log("Transaction object:", transaction);
    });
  };

  return (
    <div className="checkout">
      <h2 className="checkout-title">Shopping Cart</h2>
      <div className="product-list">
        {products.map(
          (product) =>
            product.quantity > 0 && (
              <div key={product.id} className="product-item">
                <div className="product-content">
                  <div className="product-circle">
                    <span className="product-quantity">{product.quantity}</span>
                  </div>
                  <img
                    className="product-image"
                    src={`/assets/${product.image}`}
                    alt={product.name}
                  />
                </div>
                <hr className="product-line" />
              </div>
            )
        )}
      </div>
      <div className="total-container">
        <p className="total-text">Total:</p>
        <p className="total-amount">{formattedTotal}</p>
      </div>
      <button className="waybox-button" onClick={openWompiWidget}>Pagar con Wompi</button>
    </div>
  );
};

export default Checkout;

export const incrementProductQuantity = (productId) => {
  return (dispatch, getState) => {
    const currentState = getState();
    const addedProduct = currentState.products.find(
      (product) => product.id === productId
    );
    const addedProductPrice = addedProduct.price;
    const newTotal = currentState.total + addedProductPrice;

    const updatedProducts = {
      ...currentState,
      products: currentState.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    };
    const updatedProductsString = JSON.stringify(updatedProducts);

    localStorage.setItem("products", updatedProductsString);
    localStorage.setItem("total", newTotal);

    dispatch({
      type: "INCREMENT_PRODUCT_QUANTITY",
      payload: {
        productId,
        updatedProduct: {
          ...addedProduct,
          quantity: addedProduct.quantity + 1
        },
      },
    });
  };
};

export const decrementProductQuantity = (productId) => {
  return (dispatch, getState) => {
    const currentState = getState();
    const removedProduct = currentState.products.find(
      (product) => product.id === productId
    );
    const updatedProducts = currentState.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    const updatedTotal = currentState.total - removedProduct.price;

    const updatedProductsObj = {
      ...currentState,
      products: updatedProducts,
    };
    const updatedProductsString = JSON.stringify(updatedProductsObj);

    localStorage.setItem("products", updatedProductsString);
    localStorage.setItem("total", updatedTotal);

    dispatch({
      type: "DECREMENT_PRODUCT_QUANTITY",
      payload: {
        productId,
        updatedProduct: {
          ...removedProduct,
          quantity: removedProduct.quantity - 1
        },
      },
    });
  };
};

export const deleteAllProducts = () => {
  return (dispatch) => {
    localStorage.removeItem("products");
    localStorage.removeItem("total");

    dispatch({
      type: "DELETE_ALL_PRODUCTS",
    });
  };
};

import { products } from "../constants/products.json";

const storedProducts = localStorage.getItem("products");
const storedTotal = localStorage.getItem("total");

const initialState = {
  products: storedProducts ? Object.values(JSON.parse(storedProducts)) : products,
  quantity: 0,
  total: storedTotal ? parseFloat(storedTotal) : 0,
};

const quantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_PRODUCT_QUANTITY":
      const addedProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.productId
      );
      const addedProduct = state.products[addedProductIndex];
      const addedProductPrice = addedProduct.price;
      const newTotal = state.total + addedProductPrice;

      // Actualizar el estado en el almacenamiento local
      const updatedProductsIncrement = [
        ...state.products.slice(0, addedProductIndex),
        {
          ...addedProduct,
          quantity: addedProduct.quantity + 1,
        },
        ...state.products.slice(addedProductIndex + 1),
      ];
      localStorage.setItem(
        "products",
        JSON.stringify(Object.assign({}, updatedProductsIncrement))
      );
      localStorage.setItem("total", newTotal);

      return {
        ...state,
        products: updatedProductsIncrement,
        total: newTotal,
      };

    case "DECREMENT_PRODUCT_QUANTITY":
      const removedProductId = action.payload.productId;
      const removedProductIndex = state.products.findIndex(
        (product) => product.id === removedProductId
      );
      const removedProduct = state.products[removedProductIndex];
      const updatedProductsDecrement = [
        ...state.products.slice(0, removedProductIndex),
        {
          ...removedProduct,
          quantity: removedProduct.quantity - 1,
        },
        ...state.products.slice(removedProductIndex + 1),
      ];
      const updatedTotal = state.total - removedProduct.price;

      // Actualizar el estado en el almacenamiento local
      localStorage.setItem(
        "products",
        JSON.stringify(Object.assign({}, updatedProductsDecrement))
      );
      localStorage.setItem("total", updatedTotal);

      return {
        ...state,
        products: updatedProductsDecrement,
        total: updatedTotal,
      };

    case "DELETE_ALL_PRODUCTS":
      // Limpiar el almacenamiento local
      localStorage.removeItem("products");
      localStorage.removeItem("total");

      const clearedProducts = state.products.map((product) => ({
        ...product,
        quantity: 0,
      }));

      return {
        ...state,
        products: clearedProducts,
        total: 0,
      };

    default:
      return state;
  }
};

export default quantityReducer;

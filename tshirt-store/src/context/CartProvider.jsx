import React, { useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const increaseQuantity = (id) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  const decreaseQuantity = (id) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const contextValue = {
    cart: state,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

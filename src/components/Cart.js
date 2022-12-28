import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import "./Cart.css";
const Cart = () => {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const showCart = () => { 
    dispatch(cartActions.setShowCart())
  }
  // const quantity = 5;
  return (
    <div className={quantity ? "cartIcon active": "cartIcon"}>
      <h3 onClick={showCart}>Cart: {quantity} {quantity ? 'Items' : "Item"}</h3>
    </div>
  );
};

export default Cart;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // To check if item is already in cart
      const exitingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (exitingItem) {
        exitingItem.quantity++;
        exitingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          name: newItem.name,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
        state.totalQuantity ++;
      }
    },
    removeFromCart: (state, action) => {
      let currentId = action.payload;
      const exitingItem = state.itemsList.find(
        (item) => item.id === currentId
      );
      console.log(exitingItem.price)
      if (exitingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter(item => item.id !== currentId);
        state.totalQuantity--;
      } else { 
        exitingItem.quantity--;
        exitingItem.totalPrice -= exitingItem.price;
      }
      console.log(state.totalQuantity)
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

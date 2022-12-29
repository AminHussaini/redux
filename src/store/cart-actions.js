import { cartActions } from "./cart-slice";
import { showNotifications } from "./ui-slice";

// Thunk Function Put
export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotifications({
        open: true,
        message: "In Progress",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      // send state as sending request
      dispatch(
        showNotifications({
          open: true,
          message: "In Progress",
          type: "warning",
        })
      );
      // const res = await fetch(
      //   `https://redux-45f6a-default-rtdb.firebaseio.com/cartItems.json`,
      //   {
      const res = await fetch(
        `https://shopping-bcd0a-default-rtdb.firebaseio.com/cartItems.json`,
        {
          method: "put",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      console.log({ data });
      // Send the as request is successful
      dispatch(
        showNotifications({
          open: true,
          message: "Sent Request To Database Successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        showNotifications({
          open: true,
          message: "Sending Request Fail",
          type: "error",
        })
      );
    }
  };
};

// Thunk Function Get
export const getCartData = () => {
  return async (dispatch) => {
    
    const fetchData = async () => {
      const res = await fetch(
        `https://shopping-bcd0a-default-rtdb.firebaseio.com/cartItems.json`
      );
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      console.log({cartData});
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        showNotifications({
          open: true,
          message: "Sending Request Fail",
          type: "error",
        })
      );
    }
  };
};

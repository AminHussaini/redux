import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";
import { showNotifications } from "./store/ui-slice";

let firstRender = true;
function App() {
  const dispatch = useDispatch();
  const noti = useSelector((state) => state.ui.notification);
  // console.log(
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    const sendRequest = async () => {
      // send state as sending request
      dispatch(
        showNotifications({
          open: true,
          message: "In Progress",
          type: "warning",
        })
      );
      // const res = await fetch(`https://shopping-bcd0a-default-rtdb.firebaseio.com/cartItems.json`, {
      const res = await fetch(
        `https://redux-45f6a-default-rtdb.firebaseio.com/cartItems.json`,
        {
          method: "put",
          body: JSON.stringify(cart),
        }
      );
      console.log("send cart");
      const data = await res.json();
      // Send the as request is successful
      dispatch(
        showNotifications({
          open: true,
          message: "Sent Request To Database Successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      // send state to error handler
      dispatch(
        showNotifications({
          open: true,
          message: "Sending Request Fail",
          type: "error",
        })
      );
    });
  }, [cart,dispatch]);

  console.log(isLoggedIn);
  return (
    <div className="App">
      {noti && <Notification type={noti.type} message={noti.message} />}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;

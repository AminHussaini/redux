import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";

function App() {
  // console.log(
  const cart = useSelector(state=> state.cart)
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const sendRequest = async () => { 
      const res = await fetch(`https://shopping-bcd0a-default-rtdb.firebaseio.com/cartItems.json`, {
        method: "put",
        body: JSON.stringify(cart),
      })
      console.log("send cart")
      const data = await res.json();
    } 
    sendRequest();
    
  }, [cart])
  
  console.log(isLoggedIn);
  return <div className="App">
    <Notification type="success" message="This is dummy message"/>
    {isLoggedIn ? <Layout /> : <Auth />}
  </div>;
}

export default App;

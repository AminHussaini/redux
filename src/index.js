import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById("root");
const root = createRoot(container);

// office Fire base
// https://shopping-bcd0a-default-rtdb.firebaseio.com

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import { Provider } from "react-redux";
// import store from "./store";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import { createRoot } from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

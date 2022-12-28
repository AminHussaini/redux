import { createStore } from "redux";

// We need to create a reducer function because we need to set the state and action.
const reducerFn = (state = { counter: 10 }, action) => {
  
  // rules
  // synchronous Function
  // we should not mutate the original state

  // Increment 
  if (action.type === "incr") { 
    return {counter: state.counter + 1};
  }
  // Decrement 
  if (action.type === "decre") {
    return {counter: state.counter - 1};
  }
  // Add Number
  if (action.type === "add") {
    return {counter: state.counter + action.addValue };
  }
  return state;
};

const store = createStore(reducerFn);

export default store;

import { useSelector, useDispatch } from "react-redux";

import { actions } from "./store/index";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch((state) => state.counter);
  const increment = () => dispatch(actions.increment);
  const decrement = () => dispatch(actions.decrement);
  const add = () => dispatch(actions.addBy(10));
  return (
    <div className="App">
      <h1>Counter APP {counter}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => add()}>Add 10 Number</button>
    </div>
  );
}

export default App;

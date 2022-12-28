import { useSelector,useDispatch } from "react-redux";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch((state) => state.counter);
  const increment = () => dispatch({type: "incr"});
  const decrement = () => dispatch({type: "decre"});
  const add = () => dispatch({type: "add",addValue:10});
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

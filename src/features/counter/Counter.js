import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement,reset,addByAmount } from "./counterSlice";


const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0)

  const addValue = Number(incrementAmount) || 0;
  return (
    <div>
      <b>
        Counter {count }
        <br />
      </b>
      <br />
      <input type="number"
        value={addValue}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      <br />
      <br />

      <button onClick={()=> dispatch(increment())}>Plus</button>
      <button onClick={() => dispatch(decrement())}>Minus</button>
      <button onClick={() => dispatch( reset(), setIncrementAmount(0))}>Reset</button>
      <button onClick={() => dispatch(addByAmount(addValue))}>Add 10</button>
    </div>
  );
};

export default Counter;

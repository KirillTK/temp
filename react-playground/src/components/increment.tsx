import { useCallback, useState } from 'react'



export const IncrementButton = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback((increment: number) => () => {
    setCount((prev) => prev + increment);
  }, [setCount]);

  return <div style={{ display: 'flex'}}>
    <p>{count}</p>
    <button onClick={handleIncrement(1)}>+</button>
    <button onClick={(handleIncrement(-1))}>-</button>
  </div>
}
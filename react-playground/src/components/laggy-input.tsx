import { ChangeEventHandler, useDeferredValue, useId, useState, useTransition } from 'react';


export const LaggyInput = () => {
  const id = useId();
  const [value, setValue] = useState('');
  // const defferedValue = useDeferredValue(value);
  const [_, setTransition] = useTransition();

  
const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  // имитируем тяжёлую логику
  const start = performance.now();

  setValue(e.target.value);

  setTransition(() => {
    while (performance.now() - start < 100) {} // блокирующая операция
  })
  
};

return <div>
  <label htmlFor={id}>Laggy Input</label>
  <input id={id} value={value} onChange={handleChange} />
</div>;
}
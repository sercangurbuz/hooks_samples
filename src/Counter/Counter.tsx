import React from 'react';
import useCounter from './useCounter';

export interface ICounterProps {
  onChange?(current: number): void;
}

const Counter: React.FunctionComponent<ICounterProps> = ({ onChange }) => {
  const { current, dispatch, step, total } = useCounter({ onChange });

  const upCounter = () => {
    dispatch({ type: 'UP', payload: total.current });
  };

  const setStepEvent = () => {
    const result = prompt('Step', String(step));
    result && dispatch({ type: 'STEP', payload: parseInt(result) });
  };

  const resetEvent = () => {
    dispatch({ type: 'RESET' });
    total.current = 0;
  };

  console.log('Counter rendering');

  return (
    <div
      style={{
        fontSize: '2em',
        border: '1px solid #666',
        padding: 5,
        width: 150,
        textAlign: 'center'
      }}
    >
      <div>{current}</div>
      <button onClick={upCounter}>UP COUNTER</button>
      <button onClick={setStepEvent}>STEP</button>
      <button onClick={resetEvent}>RESET</button>
    </div>
  );
};

export default React.memo(Counter);

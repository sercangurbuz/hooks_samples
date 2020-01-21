import React, { createContext, useState, useCallback } from 'react';
import './App.css';
import Counter from './Counter/Counter';
import { State } from './Counter/useCounter';

const initialState = {
  step: 1,
  current: 0
};

export const CounterContext = createContext<Partial<State>>(initialState);

const setInitialCounter = () => {
  const count = prompt('Counter count', '1');
  return (count && parseInt(count)) || 0;
};

const App: React.FC = () => {
  const [counterList, setCounterList] = useState<number>(setInitialCounter);

  const setCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCounterList(parseInt(e.target.value));
  };

  const onChange = useCallback((current: number) => {
    console.log('counter has chnaged in App ', current);
  }, []);

  const renderCounters = () => {
    const counters = [];
    for (let index = 0; index < counterList; index++) {
      counters.push(<Counter key={index} onChange={onChange} />);
    }
    return counters;
  };

  return (
    <CounterContext.Provider value={initialState}>
      <div>
        <label htmlFor="counterInput">Counter count</label>
        <input
          id="counterInput"
          onChange={setCount}
          value={counterList}
        ></input>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        {renderCounters()}
      </div>
    </CounterContext.Provider>
  );
};

export default App;

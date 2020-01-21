import React, { useContext, useReducer, useEffect } from 'react';
import { CounterContext } from '../App';
import { ICounterProps } from './Counter';

export type State = {
  current: number;
  step: number;
};

interface UseCounterOptions {
  initialState?: Partial<State>;
  onChange: ICounterProps['onChange'];
}

interface CounterState {
  current: number;
  step: number;
}

export const initialState: State = {
  current: 0,
  step: 1
};

const counterReducer = (
  state: CounterState,
  action: { type: 'UP' | 'STEP' | 'RESET'; payload?: number }
): CounterState => {
  switch (action.type) {
    case 'UP':
      if (action.payload! > 20) {
        alert('upss cant be greater than 20');
        return state;
      }
      return { ...state, current: state.current + state.step };
    case 'STEP':
      return { ...state, step: action.payload! };
    case 'RESET':
      return initialState;
    default:
      throw new Error('unsupported type');
  }
};

export default ({ initialState, onChange }: UseCounterOptions) => {
  const initialContextState = useContext(CounterContext);

  const [{ step, current }, dispatch] = useReducer(counterReducer, {
    ...initialState,
    ...initialContextState
  } as CounterState);

  let total = React.useRef(0);

  useEffect(() => {
    total.current += current;
    onChange && onChange(current);

    console.log('Counter running effect');
    return () => console.log('counter removed');
  }, [current, onChange]);

  return { dispatch, step, current, total };
};

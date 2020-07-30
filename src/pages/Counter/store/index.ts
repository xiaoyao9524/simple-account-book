
// store

export interface CounterProps {
  count: number
}

const defaultState: CounterProps = {
  count: 0
}

export default (state = defaultState, action: any) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'INCREMENT':
      newState.count++;
      break;
    case 'DECREMENT':
      newState.count--;
      break;
  }
  return newState;
}

export interface CounterState {
  count: number;
}

interface IncreemntAction {
  type: 'increment';
}

interface DecreemntAction {
  type: 'decreemnt';
}

type actionType = IncreemntAction | DecreemntAction;

function reducer (state: CounterState, action: actionType) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decreemnt':
      return {count: state.count - 1};
    default:
      throw new Error();
  }

}

export default reducer;
import { createStore } from "redux";

const incrementCount = ({incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
})

const decrementCount = ({decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
})

const setCount = ({setBy = null} = {}) => ({
  type: "SET",
  setBy
})

const resetCount = () => ({
  type: "RESET",
})

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      return { count: state.count - action.decrementBy };
    case "SET":
      return {count: action.setBy ? action.setBy : state.count}
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
});
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

store.dispatch(incrementCount({incrementBy: 3}));

store.dispatch(decrementCount({decrementBy: 4}));

store.dispatch(setCount());
store.dispatch(setCount({setBy: 66}));

store.dispatch(resetCount());
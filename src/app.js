import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisableExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const waterBill = store.dispatch(
  addExpense({ description: "Water bill", amount: 127, createdAt: 6564 })
);
const gasBill = store.dispatch(
  addExpense({ description: "Gas bill", amount: 656, createdAt: 7722 })
);
const rent = store.dispatch(
  addExpense({ description: "Rent", amount: 999, createdAt: 989 })
);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

store.dispatch(setTextFilter("bill"));

store.dispatch(setTextFilter("water"));

setTimeout(() => {
  store.dispatch(setTextFilter("gas"));
}, 3000);

console.log(
  getVisableExpenses(store.getState().expenses, store.getState().filters)
);

ReactDOM.render(jsx, document.getElementById("app"));

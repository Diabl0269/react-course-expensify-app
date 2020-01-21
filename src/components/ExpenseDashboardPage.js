import React from "react";
import ExpesneList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpesneList />
  </div>
);

export default ExpenseDashboardPage;

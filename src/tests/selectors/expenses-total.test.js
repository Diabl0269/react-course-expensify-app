import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 for empty array", () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test("should return soul expense amount", () => {
  const expense = expenses[0];
  const amount = expense.amount;
  const result = selectExpensesTotal([expense]);
  expect(result).toBe(amount);
});

test("should return total sum of expenses", () => {
  const result = selectExpensesTotal(expenses);
  const resultCheck = expenses
    .map(expense => expense.amount)
    .reduce((sum, currentAmount) => (sum += currentAmount));
  expect(result).toBe(resultCheck);
});

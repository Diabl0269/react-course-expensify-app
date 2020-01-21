import { removeExpense, addExpense, editExpense } from "../../actions/expenses";
import moment from "moment";

const time = moment();
const expense = {
  description: "test item",
  note: "test note",
  amount: 100,
  createdAt: time
};

//Test edit expense
test("should setup edit expense action object", () => {
  const action = editExpense("123abc", expense);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { ...expense }
  });
});

//Test add expense
test("should setup add expense action object with provided values", () => {
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expense,
      id: expect.any(String)
    }
  });
});

test("should setup add expense action object with default values", () => {
  const action = addExpense({});
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});

//Test remove expense
test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

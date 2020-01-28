import configureMockStore from "redux-mock-store";
import {
  startAddExpense,
  removeExpense,
  addExpense,
  editExpense
} from "../../actions/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...expenses[0] }
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test("should add expense with defaults to database and store", () => {
  const store = createMockStore({});
  const expenseDefault = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefault);
      done();
    });
});

// test("should setup add expense action object with default values", () => {
//   const action = addExpense({});
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   });
// });

//Test remove expense
test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

import configureMockStore from "redux-mock-store";
import {
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  addExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
  startEditExpense
} from "../../actions/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref("expenses")
    .set(expensesData)
    .then(() => done());
});

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

test("should edit expense from firebase", done => {
  const store = createMockStore(expenses);
  const id = expenses[1].id;
  const updates = {
    description: "updated desc",
    note: "updated note",
    amount: 9999,
    createdAt: 0
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(updates);
      done();
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

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
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
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", done => {
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
          ...expenseDefault
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefault);
      done();
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

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should remove expenses from firebase", done => {
  const id = expenses[0].id;
  const store = createMockStore(expenses);
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

//GET
test("should fetch the expenses from firebase", () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

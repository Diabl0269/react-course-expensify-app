export default (expenses) => {
  let result = 0;
  if (expenses) {
    result = expenses
      .map(expense => expense.amount)
      .reduce((sum, currentAmount) => (sum += currentAmount), 0);
  }
  return result;
};

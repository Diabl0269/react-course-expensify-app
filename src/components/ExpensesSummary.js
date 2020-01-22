import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import expensesTotal from '../selectors/expenses-total';
import numeral from "numeral";


export class ExpensesSummary extends React.Component {
  render() {
  return <div>
      Number of Expenses: {this.props.expenses.length} 
      <br />
      Total expenses: {numeral(expensesTotal(this.props.expenses) / 100).format("$0,0.00") }
      </div>;
  };
};

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";
import { Link } from 'react-router-dom'

export class ExpensesSummary extends React.Component {
  render() {
    const formattedExpensesTotal = numeral(
      this.props.expensesTotal / 100
    ).format("$0,0.00");
    return (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            Number of Expenses: <span>{this.props.expensesCount}</span>
            <br />
            Total expenses: <span>{formattedExpensesTotal}</span>
          </h1>
          <div className='page-header__actions'>
            <Link className='button' to='/create'>Add Expense</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

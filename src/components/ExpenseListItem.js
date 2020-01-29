import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt, note }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Description: {description}</h3>
    </Link>
    Amount: {numeral(amount / 100).format("$0,0.00")}, Created at:{" "}
    {moment(createdAt).format("MMM Do, YYYY")}, Note:
    {note && ` ${note}`}
  </div>
);

export default ExpenseListItem;

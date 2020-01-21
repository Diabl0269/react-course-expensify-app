import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({
  id,
  description,
  amount,
  createdAt,
  note
}) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Description: {description}</h3>
    </Link>
    Amount: {amount}, Created at: {createdAt} {note && `Note: ${note}`}
  </div>
);

export default ExpenseListItem;

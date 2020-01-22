import React from "react";
import { shallow } from "enzyme";
import {ExpensesSummary} from "../../components/ExpensesSummary";
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary with no expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpensesSummary with expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});
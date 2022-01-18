import { useState } from "react";

import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpensesChart from "./ExpensesChart.js"
import "./Expenses.css";

const Expenses = (props) => {
	const [enteredFilter, setEnteredFilter] = useState("2020");
	const saveFilterDataHandler = (filterData) => {
		setEnteredFilter(filterData);
	};

	const filteredExpenses = props.items.filter((expense) => {
		return expense.date.getFullYear().toString() === enteredFilter;
	});

	return (
		<div>
			<Card class="expenses">
				<ExpensesFilter
					selected={enteredFilter}
					onFilterChange={saveFilterDataHandler}
				/>
				<ExpensesChart expenses={filteredExpenses}/>
				<ExpensesList items={filteredExpenses} />
			</Card>
		</div>
	);
};

export default Expenses;

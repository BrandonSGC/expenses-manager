import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./";

export const ExpenseList = () => {
  const {
    state: { expenses, currentCategory },
  } = useBudget();

  const filteredExpenses = currentCategory
    ? expenses.filter((expense) => expense.category === currentCategory)
    : expenses;

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );
  return (
    <div className="p-10 mt-10 bg-white rounded-lg shadow-lg">
      {isEmpty ? (
        <p className="text-2xl font-bold text-gray-600">No expenses yet...</p>
      ) : (
        <>
          <p className="mb-5 text-2xl font-bold text-gray-600">Expenses list</p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

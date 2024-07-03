import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseDetail } from "./";

export const ExpenseList = () => {
  const {
    state: { expenses },
  } = useBudget();

  const isEmpty = useMemo(() => expenses.length === 0, [expenses]);
  return (
    <div className="mt-10 ">
      {isEmpty ? (
        <p className="text-2xl font-bold text-gray-600">No expenses yet...</p>
      ) : (
        <>
          <p className="my-5 text-2xl font-bold text-gray-600">Expenses list</p>
          {expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense}/>
          ))}
        </>
      )}
    </div>
  );
};

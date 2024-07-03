import { useEffect, useMemo } from "react";
import {
  BudgetForm,
  BudgetTracker,
  ExpenseList,
  ExpenseModal,
} from "./components";
import { useBudget } from "./hooks/useBudget";

function App() {
  const { state } = useBudget();
  const { budget, expenses } = state;
  const isValidBudget = useMemo(() => budget > 0, [budget]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [state]);

  return (
    <>
      <header className="py-8 bg-blue-600 max-h-72">
        <h1 className="text-4xl font-black text-center text-white uppercase">
          Expenses Manager
        </h1>
      </header>

      <div className="max-w-3xl p-10 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl py-10 mx-auto">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;

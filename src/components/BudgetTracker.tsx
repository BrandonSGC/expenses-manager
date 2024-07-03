import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./";

export const BudgetTracker = () => {
  const { state, dispatch, available, spent } = useBudget();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Expenses graphic" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <button
          onClick={() => dispatch({ type: "resetApp" })}
          className="w-full p-2 font-bold text-white uppercase bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={available} />
        <AmountDisplay label="Spent" amount={spent} />
      </div>
    </div>
  );
};

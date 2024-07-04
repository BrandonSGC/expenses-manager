import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./";
import "react-circular-progressbar/dist/styles.css";

export const BudgetTracker = () => {
  const { state, dispatch, available, spent } = useBudget();
  const percentage = +((spent / state.budget) * 100);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage >= 90 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textSize: 10,
            textColor: percentage >= 90 ? "#DC2626" : "#3B82F6",
          })}
          text={`${percentage}% Spent`}
        />
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

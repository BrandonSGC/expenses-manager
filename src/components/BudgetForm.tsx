import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState<number>(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => isNaN(budget) || budget < 1, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "addBudget", payload: { budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl font-bold text-center text-blue-600"
        >
          Define budget:
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="Define your budget"
          className="w-full p-2 bg-white border border-gray-200"
          onChange={handleChange}
          value={budget}
        />
      </div>

      <input
        type="submit"
        value="Define budget"
        className="w-full p-2 font-black text-center text-white uppercase bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-40"
        disabled={isValid}
      />
    </form>
  );
};

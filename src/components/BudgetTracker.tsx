import { AmountDisplay } from "./";

export const BudgetTracker = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Expenses graphic" />
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <button className="w-full p-2 font-bold text-white uppercase bg-pink-600 rounded-lg hover:bg-pink-700">
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={300} />
        <AmountDisplay label="Available" amount={100} />
        <AmountDisplay label="Spent" amount={200} />
      </div>
    </div>
  );
};

import { ChangeEvent, useState } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { DraftExpense, Value } from "../types";
import { categories } from "../data";
import { ErrorMessage } from "./";

const initialExpense: DraftExpense = {
  amount: 0,
  name: "",
  category: "",
  date: new Date(),
};

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>(initialExpense);
  const [error, setError] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (Object.values(expense).includes('' || 0)) {
      setError('All fields are required');
      return;
    }
    
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="py-2 text-2xl font-black text-center uppercase border-b-4 border-blue-500">
        New Expense
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="name">
          Expense name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Add expense name"
          className="p-2 bg-slate-100"
          value={expense.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Quantity
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Add expense amount"
          className="p-2 bg-slate-100"
          min={0}
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="p-2 cursor-pointer bg-slate-100"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          ExpenseDate
        </label>
        <DatePicker
          className="p-2 border-0 bg-slate-100"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="w-full p-2 font-bold text-white uppercase bg-blue-600 rounded-lg cursor-pointer"
        value="Register expense"
      />
    </form>
  );
};
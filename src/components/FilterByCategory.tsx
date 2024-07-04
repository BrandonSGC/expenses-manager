import { categories } from "../data";
import { useBudget } from "../hooks/useBudget";

export const FilterByCategory = () => {
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "addFilterCategory", payload: { id: e.target.value } });
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-lg">
      <form action="">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <label htmlFor="category">Expenses Filter</label>
          <select
            className="flex-1 p-3 rounded bg-slate-100"
            id="category"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="">-- All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

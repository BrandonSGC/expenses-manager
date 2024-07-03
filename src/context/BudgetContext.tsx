import { createContext, ReactNode, useMemo, useReducer } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  available: number;
  spent: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const spent = useMemo(
    () =>
      state.expenses.reduce(
        (totalExpenses, expense) => totalExpenses + expense.amount,
        0
      ),
    [state.expenses]
  );
  const available = useMemo(() => state.budget - spent, [state.expenses]);

  return (
    <BudgetContext.Provider value={{ state, dispatch, available, spent }}>
      {children}
    </BudgetContext.Provider>
  );
};

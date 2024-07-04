import { createContext, ReactNode, useMemo, useReducer } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducer";
import { Expense } from "../types";

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
        (totalExpenses: number, expense: Expense) =>
          totalExpenses + expense.amount,
        0
      ),
    [state]
  );
  const available = useMemo(() => state.budget - spent, [state]);

  return (
    <BudgetContext.Provider value={{ state, dispatch, available, spent }}>
      {children}
    </BudgetContext.Provider>
  );
};

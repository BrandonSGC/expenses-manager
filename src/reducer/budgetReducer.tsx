import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "addBudget"; payload: { budget: number } }
  | { type: "showModal" }
  | { type: "closeModal" }
  | { type: "addExpense"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "addBudget": {
      return {
        ...state,
        budget: action.payload.budget,
      };
    }

    case "showModal": {
      return {
        ...state,
        modal: true,
      };
    }

    case "closeModal": {
      return {
        ...state,
        modal: false,
      };
    }

    case "addExpense": {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    }

    default: {
      return state;
    }
  }
};

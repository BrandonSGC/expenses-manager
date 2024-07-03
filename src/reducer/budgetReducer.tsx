import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "addBudget"; payload: { budget: number } }
  | { type: "showModal" }
  | { type: "closeModal" }
  | { type: "addExpense"; payload: { expense: DraftExpense } }
  | { type: "removeExpense"; payload: { id: Expense["id"] } }
  | { type: "getExpenseById"; payload: { id: Expense["id"] } }
  | { type: "updateExpense"; payload: { expense: Expense } }
  | { type: "resetApp" };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: string;
};

const initialBudget = (): number => {
  const budget = localStorage.getItem("budget");
  return budget ? +budget : 0;
};

const initialExpenses = (): Expense[] => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
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
        editingId: "",
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

    case "removeExpense": {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    }

    case "getExpenseById": {
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
    }

    case "updateExpense": {
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingId: "",
      };
    }

    case "resetApp": {
      return {
        budget: 0,
        modal: false,
        expenses: [],
        editingId: "",
      };
    }

    default: {
      return state;
    }
  }
};

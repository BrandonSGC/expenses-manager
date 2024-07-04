import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "addBudget"; payload: { budget: number } }
  | { type: "showModal" }
  | { type: "closeModal" }
  | { type: "addExpense"; payload: { expense: DraftExpense } }
  | { type: "removeExpense"; payload: { id: Expense["id"] } }
  | { type: "getExpenseById"; payload: { id: Expense["id"] } }
  | { type: "updateExpense"; payload: { expense: Expense } }
  | { type: "addFilterCategory"; payload: { id: Expense["id"] } }
  | { type: "resetApp" };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
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
    case "addBudget":
      return {
        ...state,
        budget: action.payload.budget,
      };

    case "showModal":
      return {
        ...state,
        modal: true,
      };

    case "closeModal":
      return {
        ...state,
        modal: false,
        editingId: "",
      };

    case "addExpense":
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };

    case "removeExpense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };

    case "getExpenseById":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };

    case "updateExpense":
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

    case "resetApp":
      return {
        ...state,
        budget: 0,
        expenses: [],
      };

    case "addFilterCategory":
      return {
        ...state,
        currentCategory: action.payload.id,
      };

    default:
      return state;
  }
};

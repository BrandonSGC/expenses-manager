export type BudgetActions =
  | { type: "addBudget"; payload: { budget: number } }
  | { type: "showModal" }
  | { type: "closeModal" };

export type BudgetState = {
  budget: number;
  modal: boolean;
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
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

    default: {
      return state;
    }
  }
};

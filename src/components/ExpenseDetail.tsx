import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailsProps = {
  expense: Expense;
};
export const ExpenseDetail = ({ expense }: ExpenseDetailsProps) => {
  const { dispatch } = useBudget();
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: "getExpenseById", payload: { id: expense.id } });
        }}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: "removeExpense", payload: { id: expense.id } });
        }}
        destructive
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex items-center w-full gap-5 py-5 bg-white border-b border-gray-200 shadow-lg md:p-5">
          <div className="">
            <img
              src={`icono_${categoryInfo.icon}.svg`}
              alt="Expense icon"
              loading="lazy"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.name}</p>
            <p className="text-sm text-slate-600">
              {formatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

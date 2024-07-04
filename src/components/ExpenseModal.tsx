import { Fragment } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useBudget } from "../hooks/useBudget";
import { ExpenseForm } from "./";

export const ExpenseModal = () => {
  const { state, dispatch, available } = useBudget();

  return (
    <>
      <div className="fixed flex items-center justify-center right-5 bottom-5">
        <button
          type="button"
          onClick={() => dispatch({ type: "showModal" })}
          disabled={available === 0}
        >
          <PlusCircleIcon
            className={`rounded-full size-16 disabled:bg-opacity-40 ${
              available === 0 ? "text-blue-300" : "text-blue-600"
            }`}
          />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch({ type: "closeModal" })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <ExpenseForm />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

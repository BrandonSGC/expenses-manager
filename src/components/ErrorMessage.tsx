import { PropsWithChildren } from "react";

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-2 text-sm font-bold text-center text-white bg-red-600">
      {children}
    </div>
  );
};

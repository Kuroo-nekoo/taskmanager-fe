import * as React from "react";
import { useQueryClient } from "react-query";
import useAddCategory from "../../Category/hooks/useAddCategory";

const Sidebar = () => {
  const addCategoryValueInputRef = React.useRef<HTMLInputElement | null>(null);
  const addCategoryColorInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const addCategoryMutation = useAddCategory(queryClient);

  return (
    <div className="h-screen col-span-2 border-r border-black border-solid">
      <input
        type="text"
        ref={addCategoryValueInputRef}
        placeholder="enter category value here"
      ></input>
      <input
        type="text"
        ref={addCategoryColorInputRef}
        placeholder="enter category value here"
      ></input>
      <button
        onClick={() => {
          if (
            addCategoryValueInputRef.current &&
            addCategoryColorInputRef.current
          ) {
            addCategoryMutation.mutate({
              value: addCategoryValueInputRef.current.value,
              color: addCategoryColorInputRef.current.value,
            });
          }
        }}
      >
        add
      </button>
    </div>
  );
};

export default Sidebar;

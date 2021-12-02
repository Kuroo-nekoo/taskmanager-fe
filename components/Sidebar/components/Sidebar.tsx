import * as React from "react";
import { useQueryClient } from "react-query";
import useAddCategory from "../../Category/hooks/useAddCategory";

const Sidebar = () => {
  const addCategoryInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const addCategoryMutation = useAddCategory(queryClient);

  return (
    <div className="h-screen col-span-2 border-r border-black border-solid">
      <input
        type="text"
        ref={addCategoryInputRef}
        placeholder="enter category value here"
      ></input>
      <button
        onClick={() => {
          if (addCategoryInputRef.current) {
            addCategoryMutation.mutate(addCategoryInputRef.current.value);
          }
        }}
      >
        add
      </button>
    </div>
  );
};

export default Sidebar;

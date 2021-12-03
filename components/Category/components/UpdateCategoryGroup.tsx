import { useQueryClient } from "react-query";
import * as React from "react";
import { ICategory } from "../../../intefaces/category";
import useUpdateCategory from "../hooks/useUpdateCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";

const UpdateCategoryGroup = ({ category }: { category: ICategory }) => {
  const [isUpdateCategory, setIsUpdateCategory] =
    React.useState<boolean>(false);

  const updateCategoryInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const updateCategoryMutation = useUpdateCategory(queryClient);
  const deleteCategoryMutation = useDeleteCategory(queryClient);
  const [newCategoryValue, setNewCategoryValue] = React.useState(
    category.value
  );

  return (
    <div
      className="inline-block border-2 border-solid px-2 py"
      style={{
        background: isUpdateCategory ? "" : category.color,
        borderColor: isUpdateCategory ? category.color : "",
      }}
    >
      {isUpdateCategory ? (
        <>
          <input
            autoFocus
            type="text"
            placeholder="edit category"
            ref={updateCategoryInputRef}
            value={newCategoryValue}
            onChange={(e) => setNewCategoryValue(e.target.value)}
          ></input>
          <button
            onClick={async () => {
              updateCategoryMutation.mutate({
                categoryId: category.id,
                newCategory: newCategoryValue,
              });
              setIsUpdateCategory(!isUpdateCategory);
            }}
          >
            save
          </button>
        </>
      ) : (
        <div className="inline-block">{category.value}</div>
      )}
      <button
        className="ml-3 hover:bg-black hover:text-white"
        onClick={() => setIsUpdateCategory(!isUpdateCategory)}
      >
        {isUpdateCategory ? "cancel" : "edit"}
      </button>
      <button
        className="ml-3 hover:bg-black hover:text-white"
        onClick={() => deleteCategoryMutation.mutate(category.id)}
      >
        delete
      </button>
    </div>
  );
};

export default UpdateCategoryGroup;

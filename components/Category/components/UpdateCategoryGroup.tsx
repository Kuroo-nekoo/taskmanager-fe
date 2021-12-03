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

  return (
    <div>
      {isUpdateCategory ? (
        <>
          <input
            autoFocus
            type="text"
            placeholder="edit category"
            ref={updateCategoryInputRef}
          ></input>
          <button
            onClick={async () => {
              if (updateCategoryInputRef.current) {
                updateCategoryMutation.mutate({
                  categoryId: category.id,
                  newCategory: updateCategoryInputRef.current.value,
                });
              }
              setIsUpdateCategory(!isUpdateCategory);
            }}
          >
            save
          </button>
        </>
      ) : (
        category.value
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

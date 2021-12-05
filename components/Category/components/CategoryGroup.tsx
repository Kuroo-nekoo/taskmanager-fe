import { useQueryClient } from "react-query";
import * as React from "react";
import { ICategory } from "../../../intefaces/category";
import useUpdateCategory from "../hooks/useUpdateCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { SketchPicker } from "react-color";

const CategoryGroup = ({ category }: { category: ICategory }) => {
  const [isUpdateCategory, setIsUpdateCategory] =
    React.useState<boolean>(false);
  const [updateCategoryColor, setUpdateCategoryColor] = React.useState("#fff");

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
        borderColor: category.color,
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
                newCategoryColor: updateCategoryColor,
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
        className="ml-3"
        onClick={() => setIsUpdateCategory(!isUpdateCategory)}
      >
        {isUpdateCategory ? "cancel" : "edit"}
      </button>
      <button
        className="ml-3"
        onClick={() => deleteCategoryMutation.mutate(category.id)}
      >
        delete
      </button>
      {isUpdateCategory && (
        <div className="absolute">
          <SketchPicker
            color={updateCategoryColor}
            onChange={(e) => {
              setUpdateCategoryColor(e.hex);
            }}
          ></SketchPicker>
        </div>
      )}
    </div>
  );
};

export default CategoryGroup;

import { useQueryClient } from "react-query";
import * as React from "react";
import { ICategory } from "../../../intefaces/category";
import useUpdateCategory from "../hooks/useUpdateCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";
import { SketchPicker } from "react-color";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const CategoryGroup = ({ category }: { category: ICategory }) => {
  const [isUpdateCategory, setIsUpdateCategory] =
    React.useState<boolean>(false);
  const [updateCategoryColor, setUpdateCategoryColor] = React.useState(
    category.color
  );

  const updateCategoryInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const updateCategoryMutation = useUpdateCategory(queryClient);
  const deleteCategoryMutation = useDeleteCategory(queryClient);
  const [newCategoryValue, setNewCategoryValue] = React.useState(
    category.value
  );

  return (
    <>
      <div
        className="inline-block border-2 border-solid px-2 py mr-3"
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
            <button onClick={() => setIsUpdateCategory(!isUpdateCategory)}>
              <IoMdClose
                style={{ display: "inline", color: "#fd7171" }}
              ></IoMdClose>
            </button>
            <button
              className="ml-3"
              onClick={async () => {
                updateCategoryMutation.mutate({
                  id: category.id,
                  value: newCategoryValue,
                  color: updateCategoryColor,
                });
                setIsUpdateCategory(!isUpdateCategory);
              }}
            >
              <IoMdCheckmark
                style={{ display: "inline", color: "#77d257" }}
              ></IoMdCheckmark>
            </button>
          </>
        ) : (
          <>
            <div className="inline-block">{category.value}</div>
            <button
              className="ml-3 "
              onClick={() => {
                setIsUpdateCategory(!isUpdateCategory);
              }}
            >
              <FiEdit2 style={{ display: "inline" }}></FiEdit2>
            </button>
            <button
              className="ml-3"
              onClick={() => deleteCategoryMutation.mutate(category.id)}
            >
              <RiDeleteBinLine style={{ display: "inline" }}></RiDeleteBinLine>
            </button>
          </>
        )}
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
      {category.tasks.length !== 0 && (
        <>
          {category.tasks.length}{" "}
          {category.tasks.length === 1 ? "task" : "tasks"}
        </>
      )}
    </>
  );
};

export default CategoryGroup;

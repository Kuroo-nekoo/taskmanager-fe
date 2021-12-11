import * as React from "react";
import { SketchPicker } from "react-color";
import { useQueryClient } from "react-query";
import { IList } from "../../../intefaces/list";
import useAddCategory from "../../Category/hooks/useAddCategory";

const AddCategoryGroup = ({ list }: { list: IList }) => {
  const queryClient = useQueryClient();
  const addCategoryValueInputRef = React.useRef<HTMLInputElement | null>(null);
  const [categoryColor, setCategoryColor] = React.useState("#fff");
  const addCategoryMutation = useAddCategory(queryClient);
  const [isAddCategory, setIsAddCategory] = React.useState(false);

  return (
    <div className="ml-3 inline">
      <button
        onClick={() => {
          setIsAddCategory(!isAddCategory);
        }}
      >
        add category
      </button>
      {isAddCategory && (
        <>
          <input
            type="text"
            ref={addCategoryValueInputRef}
            placeholder="value"
          ></input>
          <div className="absolute">
            <SketchPicker
              color={categoryColor}
              onChange={(e) => setCategoryColor(e.hex)}
            ></SketchPicker>
          </div>
          <button
            onClick={() => {
              if (addCategoryValueInputRef.current) {
                console.log(categoryColor);
                addCategoryMutation.mutate({
                  value: addCategoryValueInputRef.current.value,
                  color: categoryColor,
                  listId: list.id,
                });
              }
            }}
          >
            add
          </button>
        </>
      )}
    </div>
  );
};

export default AddCategoryGroup;

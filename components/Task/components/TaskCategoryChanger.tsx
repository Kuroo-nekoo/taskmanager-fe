import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import useUpdateTaskCategory from "../hooks/useUpdateTaskCategory";
import * as React from "react";

const TaskCategoryChanger = ({
  taskId,
  setIsChangeTaskCategory,
}: {
  taskId: number;
  setIsChangeTaskCategory: Function;
}) => {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<ICategory[]>("categories");
  const updateTaskCategoryMutation = useUpdateTaskCategory(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  console.log(categories);

  React.useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsChangeTaskCategory(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsChangeTaskCategory]);

  return (
    <div
      className="z-50 bg-white border-black border border-solid w-max transform translate-y-4 p-4"
      ref={wrapperRef}
    >
      {categories &&
        categories.map((category) => {
          return (
            <div
              className="flex items-center hover:bg-gray-500"
              key={category.id}
              onClick={() => {
                updateTaskCategoryMutation.mutate({
                  id: taskId,
                  categoryId: category.id,
                });
              }}
            >
              <div
                className="w-2 h-2"
                style={{ background: category.color }}
              ></div>
              <div>{category.value}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TaskCategoryChanger;

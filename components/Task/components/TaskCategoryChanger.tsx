import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import useUpdateTaskCategory from "../hooks/useUpdateTaskCategory";
import * as React from "react";
import { IList } from "../../../intefaces/list";

const TaskCategoryChanger = ({
  taskId,
  setIsChangeTaskCategory,
}: {
  taskId: string;
  setIsChangeTaskCategory: Function;
}) => {
  const queryClient = useQueryClient();
  const updateTaskCategoryMutation = useUpdateTaskCategory(queryClient);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const list = queryClient.getQueryData<IList>("list");

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
      {list &&
        list.categories.map((category) => {
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

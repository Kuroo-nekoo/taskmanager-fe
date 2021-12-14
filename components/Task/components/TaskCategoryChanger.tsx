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
      className="z-50 bg-white border-black border border-solid w-max transform translate-x-3 -translate-y-3 p-3 absolute"
      ref={wrapperRef}
    >
      {list &&
        list.categories.map((category) => {
          return (
            <div
              className="flex items-center hover:bg-gray-300 min-h-max rounded-md"
              key={category.id}
              onClick={() => {
                updateTaskCategoryMutation.mutate({
                  id: taskId,
                  categoryId: category.id,
                });
              }}
            >
              <div
                className="w-2 h-2 m-3"
                style={{ background: category.color }}
              ></div>
              <div className="p-1 pr-12">{category.value}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TaskCategoryChanger;

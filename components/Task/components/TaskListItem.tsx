import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import { ITask } from "../../../intefaces/task";
import useDeleteTask from "../hooks/useDeleteTask";
import * as React from "react";

const TaskListItem = ({ task }: { task: ITask }) => {
  const queryClient = useQueryClient();
  const [isChangeTaskCategory, setIsChangeTaskCategory] = React.useState(false);

  const deleteTaskMutation = useDeleteTask(queryClient);
  const categories = queryClient.getQueryData<ICategory[]>("categories");
  const category = categories?.find(
    (category) => category.id === task.categoryId
  );

  return (
    <div className="border border-black border-solid h-11 my-0.5 px-3 flex items-center">
      <div
        className="w-2 h-2 mr-3"
        style={{ background: category && category.color }}
        onClick={() => {}}
      ></div>
      <div>{task.value}</div>
      <button
        className="ml-auto hover:bg-black hover:text-white"
        onClick={() => deleteTaskMutation.mutate(task.id)}
      >
        delete
      </button>
    </div>
  );
};

export default TaskListItem;

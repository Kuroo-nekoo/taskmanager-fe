import { useQueryClient } from "react-query";
import { ITask } from "../../../intefaces/task";
import useDeleteTask from "../hooks/useDeleteTask";

const TaskListItem = ({ task }: { task: ITask }) => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useDeleteTask(queryClient);

  return (
    <div className="border-2 border-black border-solid h-11 my-0.5 px-3 flex items-center">
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

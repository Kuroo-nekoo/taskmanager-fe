import { useQueryClient } from "react-query";
import { ICategory } from "../../../intefaces/category";
import { ITask } from "../../../intefaces/task";
import useDeleteTask from "../hooks/useDeleteTask";
import * as React from "react";
import TaskCategoryChanger from "./TaskCategoryChanger";
import useUpdateTaskValue from "../hooks/useUpdateTaskValue";
import EditTaskValueGroup from "./EditTaskValueGroup";

const TaskListItem = ({ task }: { task: ITask }) => {
  const queryClient = useQueryClient();
  const [isChangeTaskCategory, setIsChangeTaskCategory] = React.useState(false);
  const [isEditTaskValue, setIsEditTaskValue] = React.useState(false);

  const deleteTaskMutation = useDeleteTask(queryClient);
  const categories = queryClient.getQueryData<ICategory[]>("categories");
  const category = categories?.find(
    (category) => category.id === task.categoryId
  );

  return (
    <div className="border border-gray-400 border-solid h-11 my-0.5 px-3 flex items-center">
      {isEditTaskValue ? (
        <EditTaskValueGroup
          task={task}
          setIsEditTaskValue={setIsEditTaskValue}
        ></EditTaskValueGroup>
      ) : (
        <>
          <div
            className="w-2 h-2 mr-3"
            style={{ background: category && category.color }}
            onClick={() => {
              setIsChangeTaskCategory(!isChangeTaskCategory);
            }}
          >
            {isChangeTaskCategory && (
              <TaskCategoryChanger
                taskId={task.id}
                setIsChangeTaskCategory={setIsChangeTaskCategory}
              ></TaskCategoryChanger>
            )}
          </div>
          <div>{task.value}</div>
          {isEditTaskValue ? (
            <div className="ml-auto">
              <button>save</button>
              <button
                className="ml-2"
                onClick={() => setIsEditTaskValue(false)}
              >
                cancel
              </button>
            </div>
          ) : (
            <div className="ml-auto">
              <button onClick={() => setIsEditTaskValue(true)}>edit</button>
              <button
                className="ml-2"
                onClick={() => deleteTaskMutation.mutate(task.id)}
              >
                delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskListItem;

import { useQueryClient } from "react-query";
import { ITask } from "../../../intefaces/task";
import useDeleteTask from "../hooks/useDeleteTask";
import * as React from "react";
import TaskCategoryChanger from "./TaskCategoryChanger";
import EditTaskValueGroup from "./EditTaskValueGroup";
import { IList } from "../../../intefaces/list";

const TaskListItem = ({
  task,
  searchTasksValue,
}: {
  task: ITask;
  searchTasksValue: string;
}) => {
  const queryClient = useQueryClient();
  const [isEditTaskValue, setIsEditTaskValue] = React.useState(false);
  const [isChangeTaskCategory, setIsChangeTaskCategory] = React.useState(false);

  const deleteTaskMutation = useDeleteTask(queryClient);
  const list = queryClient.getQueryData<IList>("list");
  const category = list?.categories.find(
    (category) => category.id === task.categoryId
  );

  return (
    <>
      <div className="border border-gray-300 border-solid my-0.5 flex items-center hover:bg-gray-100 h-8">
        {isEditTaskValue ? (
          <EditTaskValueGroup
            task={task}
            setIsEditTaskValue={setIsEditTaskValue}
          ></EditTaskValueGroup>
        ) : (
          <>
            <div
              className="w-2 h-2 m-3"
              style={{ background: category && category.color }}
              onClick={() => {
                setIsChangeTaskCategory(true);
              }}
            ></div>
            <div>
              {(searchTasksValue.length === 0 ||
                task.value.includes(searchTasksValue)) &&
                task.value}
            </div>
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
              <div className="ml-auto mr-3">
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
      {isChangeTaskCategory && (
        <TaskCategoryChanger
          taskId={task.id}
          setIsChangeTaskCategory={setIsChangeTaskCategory}
        ></TaskCategoryChanger>
      )}
    </>
  );
};

export default TaskListItem;

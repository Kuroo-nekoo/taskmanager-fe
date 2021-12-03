import * as React from "react";
import { useQueryClient } from "react-query";
import useAddTask from "../hooks/useAddTask";

const AddTaskGroup = ({ categoryId }: { categoryId: number }) => {
  const addTaskInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isAddTask, setIsAddTask] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const addTaskMutation = useAddTask(queryClient);

  return (
    <>
      {isAddTask ? (
        <div className="w-full border-2 border-black border-solid h-11 my-0.5 px-3 flex items-center">
          <input
            type="text"
            placeholder="enter task value here"
            ref={addTaskInputRef}
          ></input>
          <button
            onClick={() => {
              if (addTaskInputRef.current) {
                addTaskMutation.mutate({
                  value: addTaskInputRef.current.value,
                  categoryId,
                });
              }
            }}
          >
            add
          </button>
          <button className="ml-auto" onClick={() => setIsAddTask(!isAddTask)}>
            cancel
          </button>
        </div>
      ) : (
        <button
          className="hover:bg-black hover:text-white"
          onClick={() => setIsAddTask(!isAddTask)}
        >
          new task +
        </button>
      )}
    </>
  );
};

export default AddTaskGroup;

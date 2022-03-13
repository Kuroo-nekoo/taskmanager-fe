import { useQueryClient } from "react-query";
import useUpdateTaskValue from "../hooks/useUpdateTaskValue";
import * as React from "react";
import { ITask } from "../../../intefaces/task";

const EditTaskValueGroup = ({
  task,
  setIsEditTaskValue,
}: {
  task: ITask;
  setIsEditTaskValue: Function;
}) => {
  const queryClient = useQueryClient();
  const updateTaskValueMutation = useUpdateTaskValue(queryClient);
  const [updateTaskValue, setUpdateTaskValue] = React.useState(task.value);

  return (
    <>
      <input
        type="text"
        value={updateTaskValue}
        onChange={(e) => {
          setUpdateTaskValue(e.target.value);
        }}
        autoFocus
        onFocus={(e) => {
          e.target.select();
        }}
      ></input>
      <div className="ml-auto">
        <button
          onClick={() => {
            updateTaskValueMutation.mutate({
              id: task.id,
              value: updateTaskValue,
            });
            setIsEditTaskValue(false);
          }}
        >
          save
        </button>
        <button
          className="ml-2"
          onClick={() => {
            setIsEditTaskValue(false);
          }}
        >
          cancel
        </button>
      </div>
    </>
  );
};

export default EditTaskValueGroup;

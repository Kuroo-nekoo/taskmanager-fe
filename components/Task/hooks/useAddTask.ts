import axios from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { ITask } from "../../../intefaces/task";

interface IAddTaskParams {
  value: string;
  categoryId: number;
}

export default function useAddTask(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";
  return useMutation<ITask[], Error, IAddTaskParams>(
    async (newTaskValue) => {
      try {
        const res = await axios.post(taskUrl, newTaskValue);
        return res;
      } catch (err) {
        console.error(err);
      }
    },

    {
      // onMutate: async (newTodo) => { //   await queryClient.cancelQueries("tasks");
      //   const prevTask = queryClient.getQueryData<ITask[]>("tasks");
      //   if (prevTask) {
      //     queryClient.setQueryData("tasks", [
      //       ...prevTask,
      //       { id: nanoid(), value: newTodo },
      //     ]);
      //   }
      //   return { prevTask };
      // },

      // onError: (err, variables, context: { prevTask: ITask[] }) => {
      //   if (context?.prevTask) {
      //     queryClient.setQueryData<ITask[]>("tasks", context.prevTask);
      //   }
      // },

      onSettled: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
}

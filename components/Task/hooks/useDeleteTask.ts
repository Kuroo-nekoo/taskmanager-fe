import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useDeleteTask(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask[], Error, number>(
    async (taskId) => {
      try {
        const res = await axios.delete(`${taskUrl}/${taskId}`);
      } catch (err) {
        console.error(err);
      }
    },
    {
      // onMutate: async (id: number) => {
      //   await queryClient.cancelQueries("tasks");
      //   const prevTask = queryClient.getQueryData<ITask[]>("tasks");
      //   if (prevTask) {
      //     queryClient.setQueryData(
      //       "tasks",
      //       prevTask.filter((t) => t.id !== id)
      //     );
      //   }
      // },
      // onError: (err, variables, context: { prevTask: ITask[] }) => {
      //   if (context?.prevTask) {
      //     queryClient.setQueryData("tasks", context.prevTask);
      //   }
      // },
      onSettled: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
}

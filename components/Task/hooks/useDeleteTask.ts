import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useDeleteTask(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask, Error, string>(
    async (taskId) => {
      try {
        const res = await axios.delete(`${taskUrl}/${taskId}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
}

import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

interface IUpdateTaskCategoryParams {
  id: number;
  value: string;
}

export default function useUpdateTaskValue(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask, Error, IUpdateTaskCategoryParams>(
    async ({ id, value }) => {
      try {
        const res = await axios.patch(`${taskUrl}/${id}`, { value });
        return res;
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

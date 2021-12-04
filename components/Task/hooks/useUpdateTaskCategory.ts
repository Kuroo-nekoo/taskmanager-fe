import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

interface IUpdateTaskCategoryParams {
  id: number;
  categoryId: number;
}

export default function useUpdateTaskCategory(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask, Error, IUpdateTaskCategoryParams>(
    async ({ id, categoryId }) => {
      try {
        const res = await axios.patch(`${taskUrl}/${id}`, { categoryId });
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

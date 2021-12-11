import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useUpdateTaskCategory(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask, Error, Pick<ITask, "id" | "categoryId">>(
    async ({ id, categoryId }) => {
      try {
        const res = await axios.patch(`${taskUrl}/${id}`, { categoryId });
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("list");
      },
    }
  );
}

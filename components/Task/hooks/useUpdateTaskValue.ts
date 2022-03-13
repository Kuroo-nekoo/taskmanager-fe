import { ICategory } from "./../../../intefaces/category";
import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useUpdateTaskValue(queryClient: QueryClient) {
  const taskUrl = "http://localhost:4000/tasks";

  return useMutation<ITask, Error, Pick<ICategory, "id" | "value">>(
    async ({ id, value }) => {
      try {
        const res = await axios.patch(`${taskUrl}/${id}`, { value });
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

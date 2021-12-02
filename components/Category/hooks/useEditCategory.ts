import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ICategory } from "../../../intefaces/category";
import { ITask } from "../../../intefaces/task";

export default function useEditCategory(queryClient: QueryClient) {
  const categoryUrl = "http://localhost:4000/categories";

  return useMutation<ICategory, Error, number>(
    async (categoryId: number) => {
      try {
        const res = await axios.put<ICategory>(`${categoryUrl}/${categoryId}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },

    {
      onMutate: async () => {
        await queryClient.cancelQueries("tasks");
        const prevCategory = queryClient.getQueryData<ITask[]>("categories");
        if (prevCategory) {
          queryClient.setQueryData("tasks", [...prevCategory]);
        }
        return { prevCategory };
      },

      onError: (err, variables, context: { prevTask: ITask[] }) => {
        if (context?.prevTask) {
          queryClient.setQueryData<ITask[]>("tasks", context.prevTask);
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );
}

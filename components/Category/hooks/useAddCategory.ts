import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ITask } from "../../../intefaces/task";

export default function useAddCategory(queryClient: QueryClient) {
  const categoryUrl = "http://localhost:4000/categories";

  return useMutation<ITask, Error, string>(
    async (newCategory: string) => {
      try {
        const res = await axios.post(categoryUrl, { value: newCategory });
        return res;
      } catch (err) {
        console.error(err);
      }
    },
    {
      // onMutate: async (newCategory: string) => {
      //   await queryClient.cancelQueries("categories");
      //   const prevCategory =
      //     queryClient.getQueryData<ICategory[]>("categories");
      //   if (prevCategory) {
      //     queryClient.setQueryData("categories", [
      //       ...prevCategory,
      //       { id: nanoid(), value: newCategory },
      //     ]);
      //   }
      // },

      // onError: (err, variables, context: { prevCategory: ICategory[] }) => {
      //   queryClient.setQueryData("categories", context.prevCategory);
      // },

      onSettled: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
}

import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ICategory } from "../../../intefaces/category";

export default function useUpdateCategory(queryClient: QueryClient) {
  const categoryUrl = "http://localhost:4000/categories";

  return useMutation<
    ICategory,
    Error,
    { categoryId: number; newCategory: string }
  >(
    async ({ categoryId, newCategory }) => {
      try {
        const res = await axios.patch<ICategory>(
          `${categoryUrl}/${categoryId}`,
          {
            value: newCategory,
          }
        );
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },

    {
      // onMutate: async ({ categoryId, newCategory }) => {
      //   await queryClient.cancelQueries("categories");
      //   const prevCategory = queryClient.getQueryData<ITask[]>("categories");
      //   if (prevCategory) {
      //     queryClient.setQueriesData(
      //       "category",
      //       prevCategory.map((category) => {
      //         if (category.id === categoryId) {
      //           category.value = newCategory;
      //         }
      //       })
      //     );
      //   }

      //   return { prevCategory };
      // },

      // onError: (err, variables, context: { prevCategory: ICategory[] }) => {
      //   if (context?.prevCategory) {
      //     queryClient.setQueryData<ICategory[]>(
      //       "categories",
      //       context.prevCategory
      //     );
      //   }
      // },

      onSettled: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
}

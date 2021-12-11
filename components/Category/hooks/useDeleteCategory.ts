import { ICategory } from "./../../../intefaces/category";
import { QueryClient, useMutation } from "react-query";
import axios from "axios";

export default function useDeleteCategory(queryClient: QueryClient) {
  const categoryUrl = "http://localhost:4000/categories";

  return useMutation<ICategory, Error, string>(
    async (categoryId) => {
      try {
        const res = await axios.delete(`${categoryUrl}/${categoryId}`);
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

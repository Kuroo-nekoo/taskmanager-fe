import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { IList } from "../../../intefaces/list";

export default function useDeleteList(queryClient: QueryClient) {
  const listUrl = "http://localhost:4000/lists";

  return useMutation<IList, Error, string>(
    async (id) => {
      try {
        const res = await axios.delete(`${listUrl}/${id}`);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("spaces");
      },
    }
  );
}

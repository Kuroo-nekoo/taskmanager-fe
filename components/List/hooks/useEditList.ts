import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { IList } from "../../../intefaces/list";

export default function useEditList(queryClient: QueryClient) {
  const listUrl = "http://localhost:4000/lists";

  return useMutation<IList, Error, Partial<IList>>(
    async ({ value, id }) => {
      try {
        const res = await axios.patch(`${listUrl}/${id}`, { value });
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("list");
        queryClient.invalidateQueries("spaces");
      },
    }
  );
}

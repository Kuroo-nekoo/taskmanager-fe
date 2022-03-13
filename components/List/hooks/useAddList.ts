import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { IList } from "../../../intefaces/list";

export default function useAddList(queryClient: QueryClient) {
  const listUrl = "http://localhost:4000/lists";

  return useMutation<IList, Error, Partial<IList>>(
    async (newListValue) => {
      try {
        const res = await axios.post(listUrl, newListValue);
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

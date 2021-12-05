import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ISpace } from "../../../intefaces/space";

interface IAddSpaceParams {
  value: string;
}

export default function useAddSpace(queryClient: QueryClient) {
  const spaceUrl = "http://localhost:4000/spaces";

  return useMutation<ISpace, Error, number>(
    async (id) => {
      try {
        const res = await axios.delete(`${spaceUrl}/${id}`);
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

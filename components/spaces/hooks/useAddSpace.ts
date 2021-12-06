import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { ISpace } from "../../../intefaces/space";

export default function useAddSpace(queryClient: QueryClient) {
  const spaceUrl = "http://localhost:4000/spaces";

  return useMutation<ISpace, Error, Pick<ISpace, "value">>(
    async (newSpaceValue) => {
      try {
        const res = await axios.post(spaceUrl, newSpaceValue);
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

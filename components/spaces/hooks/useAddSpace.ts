import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { NumberSchema } from "yup";
import { ISpace } from "../../../intefaces/space";

interface IAddSpaceParams {
  value: string;
}

export default function useAddSpace(queryClient: QueryClient) {
  const spaceUrl = "http://localhost:4000/spaces";

  return useMutation<ISpace, Error, IAddSpaceParams>(
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

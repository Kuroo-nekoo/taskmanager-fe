import { ISpace } from "./../../../intefaces/space";
import { ICategory } from "./../../../intefaces/category";
import axios from "axios";
import { QueryClient, useMutation } from "react-query";

export default function useUpdateSpace(queryClient: QueryClient) {
  const spaceUrl = "http://localhost:4000/spaces";

  return useMutation<ISpace, Error, Partial<ISpace>>(async () => {
    try {
      const res = await axios.patch(spaceUrl);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });
}

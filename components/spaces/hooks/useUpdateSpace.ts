import { ISpace } from "./../../../intefaces/space";
import axios from "axios";
import { QueryClient, useMutation } from "react-query";

export default function useUpdateSpace(queryClient: QueryClient) {
  const spaceUrl = "http://localhost:4000/spaces";

  return useMutation<
    ISpace,
    Error,
    Partial<ISpace> & {
      listId?: string;
      isMoveList?: boolean;
      isCopyList?: boolean;
    }
  >(
    async ({ value, id, listId, isMoveList, isCopyList }) => {
      try {
        const res = await axios.patch(`${spaceUrl}/${id}`, {
          value,
          listId,
          isMoveList,
          isCopyList,
        });
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

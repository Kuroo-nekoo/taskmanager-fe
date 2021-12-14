import axios from "axios";
import { useQuery } from "react-query";
import { IList } from "../../../intefaces/list";

export default function useList() {
  const listUrl = "http://localhost:4000/lists";

  return useQuery<IList[], Error>("lists", async () => {
    try {
      const res = await axios.get(listUrl);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  });
}

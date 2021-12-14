import axios from "axios";
import { useQuery } from "react-query";

export default function useList(listId: string) {
  return useQuery("list", getList(listId));
}

export const getList = (listId: string) => {
  return async () => {
    const listUrl = "http://localhost:4000/lists";

    try {
      const res = await axios.get(`${listUrl}/${listId}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
};
